# Echoes Beneath the Seal — Animated Pixel Edition

> كل ختم يخفي سجلًا، وكل سجل يترك صدى.


نسخة مطوّرة من النموذج الأولي للعبة السرد التفاعلي.

## ما تم الحفاظ عليه

- القصة الأصلية والأيام الخمسة عشر.
- الشخصيات والأدلة والاختيارات وProject Echo.
- نظام قاعدة البيانات والطابعة والهاتف والماسح والأرشيف.
- الحفظ التلقائي، Continue، تبديل اللغة، والنهايات الموجودة.

## ما تم تطويره في هذا الإصدار

- نظام `CharacterSprite` قابل لإعادة الاستخدام داخل Canvas.
- حركة Pixel Art إجرائية بإطارات زمنية مستوحاة من بنية Sprite Animation:
  - تنفس وتأرجح خفيف.
  - رمش.
  - تحريك الذراعين بشكل مستقل.
  - الكتابة والتحدث والوقوف.
  - تعبيرات هدوء، شك، ألم، وخوف.
  - اهتزاز وحركة غير منتظمة للمصاب.
- ظلال وملابس وبطاقات تعريف وتفاصيل وجه أصلية مصممة داخل الكود.
- مؤثرات جزيئات شفافة بدون تغطية المشهد.
- دعم أفضل للمس على الهاتف.

## التشغيل

افتح `index.html` في أي متصفح حديث، أو شغّل:

```bash
python3 -m http.server 4173
```

## مراجع تقنية تمت مراجعتها

هذه المراجع استُخدمت لفهم بنية الإطارات والتوقيت فقط؛ لم يتم نسخ شخصيات أو رسومات تجارية:

- [JavaScript Sprite Animation — Franks Laboratory](https://www.youtube.com/watch?v=1bj7g6sXit8)
- [Sprite Animation Without Canvas — DEV Community](https://dev.to/polluterofminds/how-to-create-a-sprite-animation-without-canvas-57cg)
- [Pixelorama — MIT licensed open-source pixel art tool](https://github.com/Orama-Interactive/Pixelorama)

كل رسومات الشخصيات في هذا الإصدار **أصلية وإجرائية** ومكتوبة داخل `index.html`، وليست منسوخة من هذه المراجع.
