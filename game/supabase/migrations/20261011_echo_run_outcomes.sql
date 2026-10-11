-- Game-only migration. Existing ending totals remain unchanged.
-- Per-run receipts are random idempotency keys, never user or device identities.
begin;
create schema if not exists echo_game_private;
revoke all on schema echo_game_private from public,anon,authenticated;
create table if not exists echo_game_private.runs (
 run_id uuid primary key, ending_key text not null check (ending_key in ('true','truth','silence','surv','inf','sac','loop','file')),
 metrics jsonb not null, created_at timestamptz not null default now()
);
create table if not exists echo_game_private.buckets (
 bucket_key text primary key, bucket_minute timestamptz not null, minute_count integer not null default 0,
 bucket_day date not null, day_count integer not null default 0
);
alter table echo_game_private.runs enable row level security;
alter table echo_game_private.buckets enable row level security;
revoke all on all tables in schema echo_game_private from public,anon,authenticated;
create or replace function public.echo_submit_run(p_run_id uuid,p_ending_key text,p_metrics jsonb)
returns jsonb language plpgsql security definer set search_path='' as $$
declare h jsonb; ip text; b text; stamp timestamptz:=pg_catalog.date_trunc('minute',pg_catalog.now()); oldrow echo_game_private.runs; counters echo_game_private.buckets; k text; v jsonb;
begin
 if p_run_id is null or p_ending_key is null or p_ending_key not in ('true','truth','silence','surv','inf','sac','loop','file') or p_metrics is null or pg_catalog.jsonb_typeof(p_metrics)<>'object' or pg_catalog.octet_length(p_metrics::text)>600 then raise exception 'invalid run' using errcode='22023';end if;
 for k,v in select * from pg_catalog.jsonb_each(p_metrics) loop
  if k not in ('hala_aided','yasser_aided','supplies_shared','infected','all_deductions','patient07','no_review_errors','echo_preserved','self_found') or pg_catalog.jsonb_typeof(v)<>'boolean' then raise exception 'invalid metric' using errcode='22023';end if;
 end loop;
 -- Serialize one receipt, including concurrent retries from a flaky connection.
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_run_id::text,814));
 select * into oldrow from echo_game_private.runs where run_id=p_run_id;
 if found then
  if oldrow.ending_key<>p_ending_key or oldrow.metrics<>p_metrics then raise exception 'receipt already used' using errcode='22023';end if;
  return pg_catalog.jsonb_build_object('accepted',true,'duplicate',true);
 end if;
 h:=coalesce(nullif(pg_catalog.current_setting('request.headers',true),'')::jsonb,'{}'::jsonb);
 ip:=coalesce(nullif(h->>'x-real-ip',''),nullif(pg_catalog.split_part(h->>'x-forwarded-for',',',1),''),'unknown');
 b:=pg_catalog.md5(ip||'|'||current_date::text||'|echo-run-bucket-v1');
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(b,815));
 insert into echo_game_private.buckets(bucket_key,bucket_minute,bucket_day) values(b,stamp,current_date) on conflict do nothing;
 select * into counters from echo_game_private.buckets where bucket_key=b for update;
 if (counters.bucket_minute=stamp and counters.minute_count>=3) or (counters.bucket_day=current_date and counters.day_count>=20) then raise exception 'submission limit; retry later' using errcode='P0001';end if;
 update echo_game_private.buckets set minute_count=case when bucket_minute=stamp then minute_count+1 else 1 end,bucket_minute=stamp,day_count=case when bucket_day=current_date then day_count+1 else 1 end,bucket_day=current_date where bucket_key=b;
 insert into echo_game_private.runs(run_id,ending_key,metrics) values(p_run_id,p_ending_key,p_metrics);
 return pg_catalog.jsonb_build_object('accepted',true,'duplicate',false);
end;$$;
create or replace function public.echo_get_run_stats()
returns table(metric text,positive bigint,eligible bigint) language sql stable security definer set search_path='' as $$
 select 'ending:'||allowed.key,count(r.run_id) filter(where r.ending_key=allowed.key),count(r.run_id)
 from unnest(array['true','truth','silence','surv','inf','sac','loop','file']) allowed(key)
 left join echo_game_private.runs r on true group by allowed.key
 union all
 select allowed.key,count(r.run_id) filter(where r.metrics->>allowed.key='true'),count(r.run_id) filter(where r.metrics ? allowed.key)
 from unnest(array['hala_aided','yasser_aided','supplies_shared','infected','all_deductions','patient07','no_review_errors','echo_preserved','self_found']) allowed(key)
 left join echo_game_private.runs r on true group by allowed.key;
$$;
revoke all on function public.echo_submit_run(uuid,text,jsonb) from public,anon,authenticated;
revoke all on function public.echo_get_run_stats() from public,anon,authenticated;
grant execute on function public.echo_submit_run(uuid,text,jsonb) to anon;
grant execute on function public.echo_get_run_stats() to anon;
comment on function public.echo_submit_run(uuid,text,jsonb) is 'Opt-in completed game runs only. Validates fixed Boolean metrics, idempotent UUID receipts, best-effort gateway-address limits of 3/min and 20/day. No unique-player or anti-cheat guarantee.';
notify pgrst,'reload schema';
commit;
