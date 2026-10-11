-- Anonymous ending totals only. No account IDs, save files, or per-player rows.
create table if not exists public.echo_ending_stats (
  ending_key text primary key
    check (ending_key = any (array['true','truth','silence','surv','inf','sac','loop','file']::text[])),
  vote_count bigint not null default 0 check (vote_count >= 0),
  updated_at timestamptz not null default now()
);

alter table public.echo_ending_stats enable row level security;
revoke all on table public.echo_ending_stats from public, anon, authenticated;

create or replace function public.echo_get_ending_stats()
returns table (ending_key text, vote_count bigint, total_votes bigint)
language sql
stable
security definer
set search_path = ''
as $$
  select allowed.ending_key,
         coalesce(stats.vote_count, 0)::bigint,
         totals.total_votes
  from unnest(array['true','truth','silence','surv','inf','sac','loop','file']::text[]) as allowed(ending_key)
  left join public.echo_ending_stats as stats on stats.ending_key = allowed.ending_key
  cross join (
    select coalesce(sum(s.vote_count), 0)::bigint as total_votes
    from public.echo_ending_stats as s
  ) as totals
  order by allowed.ending_key;
$$;

create or replace function public.echo_record_ending_vote(p_ending_key text)
returns table (ending_key text, vote_count bigint, total_votes bigint)
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_count bigint;
  all_count bigint;
begin
  if p_ending_key is null
     or not (p_ending_key = any (array['true','truth','silence','surv','inf','sac','loop','file']::text[])) then
    raise exception 'invalid ending key' using errcode = '22023';
  end if;

  insert into public.echo_ending_stats as current_stats (ending_key, vote_count, updated_at)
  values (p_ending_key, 1, pg_catalog.now())
  on conflict (ending_key) do update
    set vote_count = current_stats.vote_count + 1,
        updated_at = pg_catalog.now()
  returning current_stats.vote_count into new_count;

  select coalesce(sum(stats.vote_count), 0)::bigint
    into all_count
    from public.echo_ending_stats as stats;

  return query select p_ending_key, new_count, all_count;
end;
$$;

revoke all on function public.echo_get_ending_stats() from public, anon, authenticated;
revoke all on function public.echo_record_ending_vote(text) from public, anon, authenticated;
grant execute on function public.echo_get_ending_stats() to anon;
grant execute on function public.echo_record_ending_vote(text) to anon;
