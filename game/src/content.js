import { CANON } from './canon.js';
export const bi=(ar,en)=>({ar,en});
export const text=(v,lang)=>typeof v==='string'?v:(Array.isArray(v)?v[lang==='ar'?0:1]:v?.[lang])||'';
export const CREDIT='Created and Designed by Shahd Mohamed';
export const COPYRIGHT='Copyright © 2026 Shahd Mohamed. All rights reserved.';
export const CITIZENS=CANON.D;
export const DECISIONS=CANON.S;
export const RECORDS=CANON.XD;
export const CAST=[
 ['hassan','حسن عبد الباقي','Hassan Abdel-Baky','Broad shoulders, receding hair, thick moustache; impatient hand gestures.'],
 ['omkarim','أم كريم السيد','Om Karim El-Sayed','Plum headscarf, rounded cheekbones, shopping bag; expressive open palm.'],
 ['mona','منى فؤاد','Mona Fouad','Curly hair, green cardigan, gold earring; checks documents twice.'],
 ['ashraf','أشرف نبيل','Ashraf Nabil','Long angular face, amber jacket, square spectacles; nervous glasses adjustment.'],
 ['sameh','سامح رمزي','Sameh Ramzy','Grey temple streak, heavy brows, long grey coat; motion held between breaths.'],
 ['nadia','نادية سلامة','Nadia Salama','Short asymmetric hair, lilac scarf, triangular silhouette; glances toward window.'],
 ['mahmoud','محمود عيد / مريض 07','Mahmoud Eid / Patient 07','Lean jaw, torn olive work shirt, hospital wristband; increasing tremor.'],
 ['hala','د. هالة','Dr. Hala','Dark tied hair, white coat over teal scrubs, stethoscope; quick decisive gestures.'],
 ['yasser','الرائد ياسر','Major Yasser','Flat cap, square jaw, brass epaulettes; rigid folded-arm posture.'],
 ['samir','سمير','Samir','Bald crown, silver beard, brown waistcoat; protects a brass archive key.'],
 ['researcher','د. سليم مراد','Dr. Salim Mourad','Silver side part, narrow spectacles, ink-stained left glove; repeated two-finger gesture.'],
 ['player','موظف الشباك 4','Window 4 clerk','Rolled sleeves, charcoal vest, broken seal-shaped scar on left wrist.'],
 ['coworker','زميلة السجل','Registry coworker','Braided hair, rust uniform; injured arm changes silhouette.'],
 ['manager','مدير السجل','Registry manager','Wide burgundy suit, thinning hair, tie pin; clutches transfer folder.'],
 ['echo','الصدى','The Echo','Hollow split silhouette and negative-space face; no arbitrary horns.'],
 ['citizen','مواطن المنتظرين','Waiting citizen','Blue work cap, soft jacket, sloped shoulders; shifts weight.']
];
export const CITIZEN_ACTORS=['hassan','omkarim','mona','ashraf','sameh','nadia','mahmoud'];
export const HOTSPOTS=[
 {id:'archive',rect:[14,86,58,99],label:bi('الأرشيف','Archive')},
 {id:'camera',rect:[277,20,26,20],label:bi('الكاميرا','CCTV')},
 {id:'window',rect:[326,37,93,101],label:bi('الشباك','Window')},
 {id:'door',rect:[426,58,44,132],label:bi('الباب','Door')},
 {id:'lights',rect:[139,16,111,13],label:bi('الإضاءة','Lights')},
 {id:'printer',rect:[362,157,58,41],label:bi('الطابعة','Printer')},
 {id:'scanner',rect:[82,181,58,28],label:bi('الماسح','Scanner')},
 {id:'computer',rect:[145,158,59,54],label:bi('الكمبيوتر','Computer')},
 {id:'phone',rect:[298,179,46,29],label:bi('التليفون','Telephone')},
 {id:'drawer',rect:[100,235,66,29],label:bi('الدرج','Drawer')},
 {id:'lamp',rect:[248,151,40,45],label:bi('مصباح الأثر','Imprint lamp')}
];
export const REQUIREMENTS={5:'drawer',6:'camera',7:'window',8:'hala',9:'phone',10:'door',11:'lights',12:'s07',13:'print:echo',14:'self'};
export const HINTS={
 1:bi('قارن البطاقة بالسجل. اضغط على البيانات المختلفة، أو استخدم الماسح.','Compare the ID and the registry. Tap conflicting fields, or use the scanner.'),
 2:bi('السجلات المكررة محتاجة فحص. جرّب ورقة الأثر تحت مصباح المكتب.','Duplicate records need inspection. Try sliding the imprint paper beneath the desk lamp.'),
 3:bi('حالة الوفاة متناقضة مع وجود صاحب البطاقة. ابحث باسمه أو رقمه.','A death record contradicts its living owner. Search by name or ID.'),
 4:bi('افحص ملف محمود: مريض 07.','Inspect Mahmoud’s record: Patient 07.'),
 5:bi('افتح الدرج. حط أمر النقل تحت المصباح، ثم قارنه بملفك لاحقًا.','Open the drawer. Place the transfer order under the lamp; compare it with your file later.'),
 6:bi('راجع تسجيل الكاميرا قبل تسليم الأرشيف.','Review CCTV before deciding about the archive.'),
 7:bi('افحص الشباك؛ وصول الإسعاف هيترك أثرًا في المدينة.','Inspect the window; calling the ambulance changes the street.'),
 8:bi('ابحث عن هالة أو 4410 في الكمبيوتر.','Search for Hala or 4410 on the computer.'),
 9:bi('رد على سمير بالتليفون؛ المكالمة متاحة من غير انتظار عشوائي.','Answer Samir’s call; it remains available without a random wait.'),
 10:bi('افحص الباب. الأصوات بتجذب المصاب لما الإضاءة تكون مقفولة.','Inspect the door. Noise attracts the infected when the lights are off.'),
 11:bi('اقفل الإضاءة ولاحظ اتجاه الصوت. كل إشارة صوتية لها وصف مكتوب.','Switch off the lights and observe the sound direction. Every vital sound has a caption.'),
 12:bi('ابحث عن S07. الدخول محتاج مفتاح سمير أو تصريح ياسر.','Search S07. Entry requires Samir’s key or Yasser’s pass.'),
 13:bi('افتح ECHO، اطبعه، وخد الورقة من الطابعة.','Open ECHO, print it, and collect the sheet.'),
 14:bi('افتح YOU، ثم اكشف أثر المحو بالمصباح. اربط الأدلة في دفتر التحقيق.','Open YOU, then reveal the erasure imprint under the lamp. Connect evidence in the journal.'),
 15:bi('راجع استنتاجاتك. النهاية الحقيقية محتاجة إثبات العلاقة بين التجربة والنقل ومحو الذاكرة.','Review your deductions. The true ending requires proving the links between the experiment, transfer, and memory erasure.')
};
export const EVIDENCE={
 transfer:{title:bi('أمر نقل 14 شخصًا','Transfer order: 14 people'),note:bi('نقل من المستشفى إلى ملحق ECHO. التوقيع تحت طبقة حبر أحدث.','Hospital → ECHO annex. A signature lies beneath newer ink.')},
 signature:{title:bi('الختم القديم','The earlier seal'),note:bi('أثر الختم يطابق أثر معصمك. أمر النقل اتوثّق باسمك.','The seal imprint matches your wrist scar. The transfer was authenticated in your name.')},
 cctv:{title:bi('الكاميرا 02:14','CCTV 02:14'),note:bi('صاحب القفاز الأيسر دخل غرفة المحو وخرج بهوية موظف أرشيف.','The left-gloved visitor entered the erasure room and left with an archivist’s ID.')},
 researcher:{title:bi('هويات الباحث','Researcher’s aliases'),note:bi('سليم مراد / س. م. / موظف 3142. نفس الخط ونفس القفاز على ثلاث معاملات.','Salim Mourad / S. M. / employee 3142. Same handwriting and glove across three records.')},
 hala:{title:bi('دفتر هالة','Hala’s log'),note:bi('سبع حالات عصبية سبقت الإعلان الرسمي عن الوباء.','Seven neurological cases preceded the official outbreak announcement.')},
 deleted:{title:bi('الأسماء المحذوفة','Deleted names'),note:bi('14 سجلًا اتحذفوا وقت نقل مجموعة Echo.','Fourteen records were deleted at the time of the Echo transfer.')},
 s07:{title:bi('المريض 07','Patient 07'),note:bi('محمود مسجّل ضمن متطوعي الاستجابة العصبية. إلغاء الاسم لم يلغِ المرض.','Mahmoud appears in the neural-response trial volunteers. Erasing his name did not erase the illness.')},
 echo:{title:bi('بروتوكول Echo','Echo protocol'),note:bi('التجربة بدأت بموافقة علاجية ثم تغيّر هدفها. تسريب 2024 اتغطّى عليه بمحو السجلات.','The trial began under therapeutic consent, then changed purpose. The 2024 leak was concealed by record erasure.')},
 self:{title:bi('ملفك قبل ثلاث سنين','Your file, three years earlier'),note:bi('وافقت على نقل 14 شخصًا لعلاج مفترض. مسحوا ذاكرتك وأعادوك للسجل لتوثيق الأسماء الجديدة.','You approved a transfer of fourteen people for supposed treatment. They erased your memory and assigned you to authenticate the new identities.')},
 erasure:{title:bi('أثر جلسة المحو','Erasure-session imprint'),note:bi('سليم نفّذ المحو بجرعة عصبية وإعادة تلقين. الورق احتفظ بطبقات الضغط والحبر التي لم تُمحَ.','Salim administered a neural dose and repeated conditioning. Paper retained pressure and ink layers that were never erased.')},
 street:{title:bi('شهود الشارع','Street witnesses'),note:bi('نفس المرضى ظهروا في مسار المستشفى والسجل.','The same patients appear along the hospital–registry route.')},
 call:{title:bi('مكالمة سمير','Samir’s call'),note:bi('الأرشيف تحت السجل، والمفتاح يفتح ممر الملحق.','The archive lies below the registry; its key opens the annex passage.')},
 sound:{title:bi('استجابة للصوت','Response to sound'),note:bi('في الظلام تتبع الحالات المتقدمة مصادر الصوت. الضوء يوقف الاقتراب مؤقتًا.','In darkness advanced cases follow active sound sources. Light temporarily stops their approach.')}
};
export const DEDUCTIONS=[
 {id:'responsibility',a:'signature',b:'self',label:bi('أنا وثّقت النقل من غير معرفة هدفه','I authenticated the transfer without knowing its purpose'),wrong:bi('أنا اخترعت المرض بمفردي','I invented the illness alone')},
 {id:'coverup',a:'transfer',b:'deleted',label:bi('حذف السجلات أخفى نقل المجموعة','Record deletion concealed the group transfer'),wrong:bi('المجموعة لم تدخل المستشفى أصلًا','The group never entered the hospital')},
 {id:'outbreak',a:'hala',b:'echo',label:bi('التجربة سبقت الوباء والتغطية ساعدت انتشاره','The experiment preceded the outbreak; the cover-up enabled its spread'),wrong:bi('الوباء بدأ بعد إغلاق السجل فقط','The outbreak began only after the registry closed')},
 {id:'erasure',a:'researcher',b:'erasure',label:bi('سليم محا ذاكرتي وأعادني لتوثيق الهويات','Salim erased my memory and returned me to authenticate identities'),wrong:bi('كل الأحداث كانت حلمًا','Everything was a dream')}
];
export const CINEMATICS=[
 ['street','hassan','الفجر / أول طابور','Dawn / The first queue','المدينة بتصحى، والنافذة رقم 4 تستنى ختمك.','The city wakes. Window 4 waits for your seal.'],
 ['office','researcher','نسخة بلا مرسل','An unrequested copy','قفاز عليه حبر. وجه غريب، وخط مألوف.','An ink-stained glove. A strange face, familiar handwriting.'],
 ['corridor','sameh','الممر الناقص','The missing corridor','ظل مواطن يعبر. صورته في السجل لا تعبر معه.','A citizen crosses. His registry portrait stays behind.'],
 ['office','mahmoud','الاسم الذي انكسر','The broken name','محمود يحاول ينطق اسمه. الختم يرتعش قبل إيده.','Mahmoud tries to say his name. The seal trembles before his hand.'],
 ['archive','manager','أربعة عشر سطرًا','Fourteen lines','المدير يقفل الدرج. ضوء قديم يتسرّب من الحبر.','The manager shuts a drawer. Old light seeps through the ink.'],
 ['corridor','yasser','قبل المصادرة','Before confiscation','خطوات عسكرية. كاميرا واحدة احتفظت بالوقت.','Military footsteps. One camera kept the timestamp.'],
 ['street','coworker','الشاهد الأخير','The last witness','المارة يتوقفوا. طريق المستشفى مش زي إمبارح.','Passers-by stop. The hospital road has changed.'],
 ['hospital','hala','سبع نبضات','Seven pulses','هالة تقلب الدفتر. تواريخ المرض أقدم من الإعلان.','Hala turns a page. Illness predates the announcement.'],
 ['archive','samir','المفتاح تحت الصمت','A key beneath silence','سمير يلف المفتاح في ورقة بدل ما يسيبه يرن.','Samir wraps the key in paper to silence it.'],
 ['corridor','coworker','عند الباب','At the door','خدش على الخشب. الصوت يقرب، ثم يسكت.','A scratch in the wood. The sound approaches, then stops.'],
 ['office','citizen','نصيب من الضوء','A share of light','الناجون يحصوا المؤن. نور واحد يكفي وجوه كتير.','Survivors count supplies. One lamp holds many faces.'],
 ['lab','mahmoud','غرفة 07','Room 07','الزجاج يعكس وجهين. رقم واحد في كل الملفات.','Glass reflects two faces. One number in every file.'],
 ['lab','researcher','النسخة التي نجت','The surviving copy','الباحث يمد إيده للورق. القرار هذه المرة قرارك.','The researcher reaches for the paper. This time the choice is yours.'],
 ['memory','player','التوقيع يعود','The signature returns','أنت لم تختر المرض. لكنك اخترت توقيع أمر النقل.','You did not choose the illness. You did choose to sign the transfer.'],
 ['street','echo','ما تبقّى من المدينة','What remains of the city','كل ملف شاهد. وكل صمت قرار.','Every file is a witness. Every silence, a decision.']
].map((c,i)=>({day:i+1,location:c[0],actor:c[1],title:bi(c[2],c[3]),caption:bi(c[4],c[5]),duration:4.5+(i%3)*.5,composition:i%5}));
export const ENDINGS={
 true:[bi('النهاية الحقيقية','TRUE ENDING'),bi('وثّقت التجربة والتغطية ودورك في النقل ومحو الذاكرة. نشرت الدليل باسمك، وسلمت نسخًا للناجين. سليم يشهد؛ المسؤولية لا تختفي مع الذاكرة.','You proved the experiment, cover-up, your transfer approval, and the erasure. You publish under your own name and give copies to survivors. Salim testifies. Responsibility survives memory.')],
 truth:[bi('الحقيقة','THE TRUTH'),bi('الملفات خرجت للعالم. المؤسسة اتكشفت، لكن أجزاء من تاريخك لسه من غير تفسير.','The files reach the world. The institution is exposed, but parts of your own history remain unresolved.')],
 silence:[bi('الصمت','THE SILENCE'),bi('الملفات اتدفنت. المؤسسة تستمر، والحقيقة تختفي خلف ختم جديد.','The files are buried. The institution endures. A fresh seal hides the truth.')],
 surv:[bi('الناجي','THE SURVIVOR'),bi('خرجت من المدينة ومعاك حياتك. السجلات اللي سبتها تحكي نسخة تانية.','You leave the city alive. The records you leave behind tell a different story.')],
 inf:[bi('المصاب','THE INFECTED'),bi('عبرت الحاجز، لكن إيدك لم تتوقف عن الرعشة. الإصابة ما زالت معاك.','You pass the checkpoint, but your hand will not stop shaking. The infection travels with you.')],
 sac:[bi('التضحية','THE SACRIFICE'),bi('شغّلت التليفون لجذب المصابين بعيدًا عن الناجين. اسمك اتشال من السجل؛ فضل في ذاكرتهم.','You ring the telephone to lure the infected away from the survivors. Your name leaves the registry, but stays in their memory.')],
 loop:[bi('الحلقة','THE LOOP'),bi('ربطت جلسة المحو بتعيينك المتكرر. المرة دي أخفيت نسخة تحت المصباح: رسالة لنفسك قبل الوردية القادمة.','You connect memory erasure to repeated reassignment. This time you hide a copy beneath the lamp: a message to yourself before the next shift.')],
 file:[bi('الملف الأخير','THE LAST FILE'),bi('عرفت إنك كنت متطوعًا، وإن توقيعك كان حقيقيًا. الملف مفتوح؛ دور المؤسسة لم يثبت كاملًا.','You learn you volunteered, and that your signature was real. Your file is open; the institution’s whole role remains unproved.')]
};
export const GREETINGS={
 hassan:[bi('واقِف من بدري. راجعها بسرعة لو سمحت.','I have waited since dawn. Please check it quickly.'),bi('الطابور سألني إذا المكتب هيفتح تاني بكرة.','The queue asked if this office would open tomorrow.'),bi('معايا كل الورق النهاردة. المرة اللي فاتت نسيت نسخة.','I brought every paper today. Last time I forgot a copy.')],
 omkarim:[bi('بص على السنة، مش على الصورة. ده تاريخ تاني خالص.','Look at the year, not my photo. That date is completely different.'),bi('السجل كبّرني مرة واحدة. مين كتب السنة دي؟','The registry aged me overnight. Who wrote that year?'),bi('أنا عايزة حقي في التاريخ الصحيح.','I just want my correct date back.')],
 default:[bi('افحص الورق كويس. في حاجة مش مطمّناني.','Check the papers carefully. Something feels wrong.'),bi('كنت هنا قبل كده، بس الموظف مش فاكرني.','I was here before, but the clerk did not remember me.'),bi('ليه نفس الختم على ورق ناس مش متشابهة؟','Why do different people’s papers carry the same seal?')]
};
export const RESEARCHER_LINES=[
 bi('أنا مندوب توريد. الحبر القديم بيظهر مع الحرارة، صدقني.','I am a supply agent. Old ink responds to warmth, believe me.'),
 bi('اسمي في السجل مختصر. الأسماء مش دايمًا أقوى دليل.','My name is abbreviated in the registry. Names are not always the strongest evidence.'),
 bi('أنا ما أنقذتش ذاكرتك. يمكن أقدر أنقذ الدليل اللي باقي منها.','I did not save your memory. Perhaps I can save what remains as evidence.')
];
