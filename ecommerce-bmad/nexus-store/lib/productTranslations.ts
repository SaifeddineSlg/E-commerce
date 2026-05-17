import type { Locale } from './translations'

// Traductions des catégories
export const categoryNames: Record<string, Record<Locale, string>> = {
  Audio:       { fr: 'Audio',       en: 'Audio',       ar: 'صوتيات' },
  Wearables:   { fr: 'Wearables',   en: 'Wearables',   ar: 'أجهزة قابلة للارتداء' },
  'Smart Home':{ fr: 'Smart Home',  en: 'Smart Home',  ar: 'المنزل الذكي' },
  Photography: { fr: 'Photographie',en: 'Photography', ar: 'تصوير' },
  Computing:   { fr: 'Informatique',en: 'Computing',   ar: 'حوسبة' },
  Gaming:      { fr: 'Gaming',      en: 'Gaming',      ar: 'ألعاب' },
}

// Traductions des produits par ID
export const productTranslations: Record<string, Record<Locale, { name: string; description: string; longDescription: string }>> = {
  'prod-1': {
    fr: { name: 'NexusAir Pro', description: 'Casque sans fil à réduction de bruit active de nouvelle génération.', longDescription: "Le NexusAir Pro redéfinit l'expérience audio avec sa technologie ANC de 4ème génération. 30h d'autonomie, connectivité multipoint et son spatial immersif." },
    en: { name: 'NexusAir Pro', description: 'Next-gen wireless headphones with active noise cancellation.', longDescription: 'The NexusAir Pro redefines the audio experience with 4th-gen ANC technology. 30h battery life, multipoint connectivity and immersive spatial sound.' },
    ar: { name: 'NexusAir Pro', description: 'سماعات لاسلكية من الجيل الجديد مع إلغاء ضوضاء نشط.', longDescription: 'تُعيد سماعة NexusAir Pro تعريف تجربة الصوت بتقنية ANC من الجيل الرابع. 30 ساعة استقلالية، واتصال متعدد النقاط وصوت فضائي غامر.' },
  },
  'prod-2': {
    fr: { name: 'NexusBuds X1', description: 'Écouteurs true wireless avec son studio dans votre poche.', longDescription: 'Les NexusBuds X1 offrent une qualité sonore studio avec une autonomie de 36h combinée. Résistants à l\'eau IPX5, parfaits pour le sport et le quotidien.' },
    en: { name: 'NexusBuds X1', description: 'True wireless earbuds with studio sound in your pocket.', longDescription: 'NexusBuds X1 deliver studio-quality sound with 36h combined battery life. IPX5 water-resistant, perfect for sport and everyday use.' },
    ar: { name: 'NexusBuds X1', description: 'سماعات أذن لاسلكية حقيقية بجودة استوديو في جيبك.', longDescription: 'توفر NexusBuds X1 جودة صوت استوديو مع 36 ساعة استقلالية مجمعة. مقاومة للماء IPX5، مثالية للرياضة والاستخدام اليومي.' },
  },
  'prod-3': {
    fr: { name: 'SonicWave 500', description: 'Enceinte Bluetooth portable avec son à 360° et basses profondes.', longDescription: 'La SonicWave 500 est l\'enceinte portable ultime. 20W de puissance, basses renforcées, étanche IPX7 et 24h d\'autonomie.' },
    en: { name: 'SonicWave 500', description: 'Portable Bluetooth speaker with 360° sound and deep bass.', longDescription: 'The SonicWave 500 is the ultimate portable speaker. 20W power, boosted bass, IPX7 waterproof and 24h battery life.' },
    ar: { name: 'SonicWave 500', description: 'مكبر صوت بلوتوث محمول بصوت 360 درجة وجهير عميق.', longDescription: 'SonicWave 500 هو مكبر الصوت المحمول المثالي. 20 واط، جهير معزز، مقاوم للماء IPX7 و24 ساعة استقلالية.' },
  },
  'prod-4': {
    fr: { name: 'NexusWatch Ultra', description: 'Montre connectée premium avec suivi santé avancé et GPS intégré.', longDescription: 'La NexusWatch Ultra surveille votre santé 24/7 avec mesure ECG, SpO2, et température corporelle. GPS multi-bandes, boîtier titane, verre saphir.' },
    en: { name: 'NexusWatch Ultra', description: 'Premium smartwatch with advanced health tracking and built-in GPS.', longDescription: 'NexusWatch Ultra monitors your health 24/7 with ECG, SpO2, and body temperature measurement. Multi-band GPS, titanium case, sapphire glass.' },
    ar: { name: 'NexusWatch Ultra', description: 'ساعة ذكية مميزة مع تتبع صحي متقدم ونظام GPS مدمج.', longDescription: 'تراقب NexusWatch Ultra صحتك على مدار الساعة بقياس ECG وSpO2 ودرجة حرارة الجسم. GPS متعدد النطاقات، هيكل تيتانيوم، زجاج ياقوت.' },
  },
  'prod-5': {
    fr: { name: 'FitBand Pro', description: 'Bracelet fitness élégant avec suivi 24/7 et 7 jours d\'autonomie.', longDescription: 'Le FitBand Pro s\'adapte à votre style de vie. Suivi de 50+ activités sportives, monitoring du sommeil, alertes cardiaques intelligentes.' },
    en: { name: 'FitBand Pro', description: 'Sleek fitness band with 24/7 tracking and 7-day battery life.', longDescription: 'FitBand Pro adapts to your lifestyle. Tracks 50+ sports activities, sleep monitoring, and smart heart rate alerts.' },
    ar: { name: 'FitBand Pro', description: 'سوار لياقة أنيق مع تتبع 24/7 وبطارية 7 أيام.', longDescription: 'يتكيف FitBand Pro مع نمط حياتك. يتتبع أكثر من 50 نشاطاً رياضياً، ومراقبة النوم، وتنبيهات معدل ضربات القلب الذكية.' },
  },
  'prod-6': {
    fr: { name: 'NexusHub Smart', description: 'Hub domotique central compatible avec tous vos appareils connectés.', longDescription: 'Le NexusHub Smart unifie tout votre écosystème domotique. Compatible Zigbee, Z-Wave, Matter et Thread. Contrôlez jusqu\'à 200 appareils.' },
    en: { name: 'NexusHub Smart', description: 'Central smart home hub compatible with all your connected devices.', longDescription: 'NexusHub Smart unifies your entire smart home ecosystem. Zigbee, Z-Wave, Matter and Thread compatible. Control up to 200 devices.' },
    ar: { name: 'NexusHub Smart', description: 'مركز المنزل الذكي المركزي متوافق مع جميع أجهزتك المتصلة.', longDescription: 'يوحّد NexusHub Smart منظومة منزلك الذكي بأكملها. متوافق مع Zigbee وZ-Wave وMatter وThread. تحكم في ما يصل إلى 200 جهاز.' },
  },
  'prod-7': {
    fr: { name: 'LumiLight Pro', description: 'Ampoules connectées avec 16M de couleurs et scènes automatiques.', longDescription: 'Les LumiLight Pro transforment votre ambiance en un instant. Synchronisation musicale, mode réveil progressif, intégration Alexa/Google.' },
    en: { name: 'LumiLight Pro', description: 'Smart bulbs with 16M colors and automatic scenes.', longDescription: 'LumiLight Pro transforms your ambiance instantly. Music sync, sunrise wake-up mode, Alexa/Google Assistant integration included.' },
    ar: { name: 'LumiLight Pro', description: 'مصابيح ذكية بـ 16 مليون لون ومشاهد تلقائية.', longDescription: 'تحوّل LumiLight Pro أجواءك في لحظة. مزامنة موسيقية، وضع الاستيقاظ التدريجي، تكامل مع Alexa وGoogle.' },
  },
  'prod-8': {
    fr: { name: 'SecureCam 4K', description: 'Caméra de surveillance 4K avec IA et vision nocturne couleur.', longDescription: 'La SecureCam 4K protège votre maison avec résolution 4K Ultra HD, détection IA personnes/véhicules, vision nocturne couleur.' },
    en: { name: 'SecureCam 4K', description: '4K security camera with AI and color night vision.', longDescription: 'SecureCam 4K protects your home with 4K Ultra HD resolution, AI person/vehicle detection, and color night vision.' },
    ar: { name: 'SecureCam 4K', description: 'كاميرا مراقبة 4K مع ذكاء اصطناعي ورؤية ليلية ملونة.', longDescription: 'تحمي SecureCam 4K منزلك بدقة 4K Ultra HD وكشف الأشخاص/المركبات بالذكاء الاصطناعي ورؤية ليلية ملونة.' },
  },
  'prod-9': {
    fr: { name: 'AlphaLens X100', description: 'Appareil photo hybride 45MP avec stabilisation 7 stops et vidéo 8K.', longDescription: "L'AlphaLens X100 est le reflex sans miroir ultime. Capteur plein format 45MP BSI, AF par détection de phase sur 100% du capteur, vidéo 8K RAW interne." },
    en: { name: 'AlphaLens X100', description: '45MP mirrorless camera with 7-stop stabilization and 8K video.', longDescription: 'The AlphaLens X100 is the ultimate mirrorless camera. 45MP full-frame BSI sensor, phase-detect AF across 100% of frame, internal 8K RAW video.' },
    ar: { name: 'AlphaLens X100', description: 'كاميرا بدون مرآة 45 ميجابكسل مع تثبيت 7 وقفات وفيديو 8K.', longDescription: 'AlphaLens X100 هي كاميرا بدون مرآة المثالية. مستشعر كامل الإطار 45 ميجابكسل، AF بالكشف عن الطور على 100% من الإطار، فيديو 8K RAW داخلي.' },
  },
  'prod-10': {
    fr: { name: 'NexusDrone Air', description: 'Drone compact avec caméra 4K et 34 minutes d\'autonomie.', longDescription: 'Le NexusDrone Air se plie dans une poche et déploie des images 4K saisissantes. Transmission vidéo 15km, évitement d\'obstacles 360°.' },
    en: { name: 'NexusDrone Air', description: 'Compact drone with 4K camera and 34-minute flight time.', longDescription: 'NexusDrone Air folds into a pocket and captures stunning 4K footage. 15km video transmission, 360° obstacle avoidance, intelligent tracking.' },
    ar: { name: 'NexusDrone Air', description: 'طائرة مسيّرة مدمجة بكاميرا 4K و34 دقيقة طيران.', longDescription: 'تنطوي NexusDrone Air في جيبك وتلتقط لقطات 4K رائعة. بث فيديو 15 كم، تجنب العوائق 360 درجة، تتبع ذكي.' },
  },
  'prod-11': {
    fr: { name: 'ProBook Ultra 14', description: 'Laptop ultra-fin avec puce M3 Pro, 16h d\'autonomie et écran OLED.', longDescription: 'Le ProBook Ultra 14 est le laptop parfait pour les professionnels nomades. Puce M3 Pro, 18GB RAM, SSD 512GB, écran OLED 2.8K 120Hz. Seulement 1.2kg.' },
    en: { name: 'ProBook Ultra 14', description: 'Ultra-slim laptop with M3 Pro chip, 16h battery and OLED display.', longDescription: 'ProBook Ultra 14 is the perfect laptop for nomadic professionals. M3 Pro chip, 18GB RAM, 512GB SSD, 2.8K 120Hz OLED display. Only 1.2kg.' },
    ar: { name: 'ProBook Ultra 14', description: 'لابتوب رفيع للغاية بمعالج M3 Pro وبطارية 16 ساعة وشاشة OLED.', longDescription: 'ProBook Ultra 14 هو اللابتوب المثالي للمحترفين المتنقلين. معالج M3 Pro، 18 جيجابايت رام، SSD 512 جيجابايت، شاشة OLED 2.8K 120Hz. 1.2 كجم فقط.' },
  },
  'prod-12': {
    fr: { name: 'NexusPad Pro 12', description: 'Tablette professionnelle avec stylet et clavier magnétique inclus.', longDescription: 'Le NexusPad Pro 12 transforme votre façon de créer. Écran mini-LED ProMotion 120Hz, stylet 4096 niveaux, compatible clavier magnétique.' },
    en: { name: 'NexusPad Pro 12', description: 'Professional tablet with stylus and magnetic keyboard included.', longDescription: 'NexusPad Pro 12 transforms the way you create. Mini-LED ProMotion 120Hz display, 4096-level stylus, magnetic keyboard compatible.' },
    ar: { name: 'NexusPad Pro 12', description: 'جهاز لوحي احترافي مع قلم وكيبورد مغناطيسي مضمنين.', longDescription: 'يحوّل NexusPad Pro 12 طريقة إبداعك. شاشة mini-LED ProMotion 120Hz، قلم 4096 مستوى، متوافق مع الكيبورد المغناطيسي.' },
  },
  'prod-13': {
    fr: { name: 'GamePad Neo X', description: 'Manette gaming pro avec triggers adaptatifs et retour haptique avancé.', longDescription: 'Le GamePad Neo X est la manette ultime pour les gamers sérieux. Triggers adaptatifs 4 zones, retour haptique HD, 40h d\'autonomie.' },
    en: { name: 'GamePad Neo X', description: 'Pro gaming controller with adaptive triggers and advanced haptic feedback.', longDescription: 'GamePad Neo X is the ultimate controller for serious gamers. 4-zone adaptive triggers, HD haptic feedback, customizable grips and 40h battery.' },
    ar: { name: 'GamePad Neo X', description: 'يد تحكم ألعاب احترافية مع زناد تكيفي وتغذية راجعة لمسية متقدمة.', longDescription: 'GamePad Neo X هي يد التحكم المثالية للاعبين الجادين. زناد تكيفي 4 مناطق، تغذية راجعة لمسية HD، مقابض قابلة للتخصيص و40 ساعة استقلالية.' },
  },
  'prod-14': {
    fr: { name: 'NexusChair Pro', description: 'Siège gaming ergonomique avec support lombaire réglable et accoudoirs 4D.', longDescription: 'Le NexusChair Pro est conçu pour les longues sessions. Support lombaire avec massage intégré, accoudoirs 4D, inclinaison 180°.' },
    en: { name: 'NexusChair Pro', description: 'Ergonomic gaming chair with adjustable lumbar support and 4D armrests.', longDescription: 'NexusChair Pro is designed for long sessions. Lumbar support with built-in massage, 4D armrests, 180° recline, premium breathable materials.' },
    ar: { name: 'NexusChair Pro', description: 'كرسي ألعاب مريح مع دعم قطني قابل للتعديل ومساند ذراع 4D.', longDescription: 'صُمم NexusChair Pro للجلسات الطويلة. دعم قطني مع تدليك مدمج، مساند ذراع 4D، إمالة 180 درجة، مواد متميزة قابلة للتنفس.' },
  },
  'prod-15': {
    fr: { name: 'VisionVR Elite', description: 'Casque VR standalone avec résolution 4K par oeil et suivi full-body.', longDescription: 'Le VisionVR Elite offre une immersion totale sans PC. Résolution 4K par oeil, suivi du regard, expressions faciales, suivi full-body.' },
    en: { name: 'VisionVR Elite', description: 'Standalone VR headset with 4K per-eye resolution and full-body tracking.', longDescription: 'VisionVR Elite delivers total immersion without a PC. 4K per-eye resolution, eye tracking, facial expressions capture, full-body tracking.' },
    ar: { name: 'VisionVR Elite', description: 'خوذة VR مستقلة بدقة 4K لكل عين وتتبع الجسم الكامل.', longDescription: 'توفر VisionVR Elite انغماساً تاماً بدون حاسوب. دقة 4K لكل عين، تتبع العيون، التقاط تعابير الوجه، تتبع الجسم الكامل.' },
  },
  'prod-16': {
    fr: { name: 'NexusDesk Monitor 27"', description: 'Écran 4K OLED 240Hz avec bras articulé et hub USB-C intégré.', longDescription: 'Le NexusDesk Monitor 27" est le moniteur parfait. OLED 4K 240Hz, Delta E < 1, DCI-P3 99%, hub USB-C 96W et haut-parleurs intégrés.' },
    en: { name: 'NexusDesk Monitor 27"', description: '4K OLED 240Hz monitor with articulated arm and built-in USB-C hub.', longDescription: 'NexusDesk Monitor 27" is the perfect monitor. OLED 4K 240Hz, Delta E < 1, 99% DCI-P3 coverage, 96W USB-C hub and built-in speakers.' },
    ar: { name: 'NexusDesk شاشة 27"', description: 'شاشة OLED 4K بتردد 240Hz مع ذراع مفصلية ومحور USB-C مدمج.', longDescription: 'NexusDesk Monitor 27" هي الشاشة المثالية. OLED 4K 240Hz، Delta E < 1، تغطية DCI-P3 99%، محور USB-C 96 واط ومكبرات صوت مدمجة.' },
  },
  'prod-17': {
    fr: { name: 'NexusBand Sense', description: 'Bracelet connecté haut de gamme avec ECG et mesure de stress.', longDescription: 'Le NexusBand Sense surveille votre santé en temps réel. ECG cliniquement validé, mesure du stress, coach sportif IA intégré.' },
    en: { name: 'NexusBand Sense', description: 'Premium smart band with ECG and stress measurement.', longDescription: 'NexusBand Sense monitors your health in real time. Clinically validated ECG, stress measurement, body composition analysis, AI sports coach.' },
    ar: { name: 'NexusBand Sense', description: 'سوار ذكي مميز مع ECG وقياس الإجهاد.', longDescription: 'يراقب NexusBand Sense صحتك في الوقت الفعلي. ECG معتمد سريرياً، قياس الإجهاد، تحليل تكوين الجسم، مدرب رياضي بالذكاء الاصطناعي.' },
  },
  'prod-18': {
    fr: { name: 'AudioStick Pro', description: 'Micro USB de studio pour créateurs de contenu avec traitement DSP.', longDescription: "L'AudioStick Pro capture votre voix avec une qualité broadcast. Microphone cardioïde 24bit/96kHz, traitement DSP temps réel, bras articulé inclus." },
    en: { name: 'AudioStick Pro', description: 'Studio USB microphone for content creators with DSP processing.', longDescription: 'AudioStick Pro captures your voice with broadcast quality. 24bit/96kHz cardioid microphone, real-time DSP processing, articulated arm included.' },
    ar: { name: 'AudioStick Pro', description: 'ميكروفون USB استوديو لصنّاع المحتوى مع معالجة DSP.', longDescription: 'يلتقط AudioStick Pro صوتك بجودة البث. ميكروفون كاردويد 24 بت/96 كيلوهرتز، معالجة DSP في الوقت الفعلي، ذراع مفصلية مضمنة.' },
  },
  'prod-19': {
    fr: { name: 'FlexLens 35mm', description: 'Objectif 35mm f/1.4 APO pour plein format avec autofocus silencieux.', longDescription: 'Le FlexLens 35mm f/1.4 APO est l\'objectif de la vie. Formule APO éliminant les aberrations chromatiques, AF linéaire silencieux, construction tropicalisée.' },
    en: { name: 'FlexLens 35mm', description: '35mm f/1.4 APO lens for full-frame with silent autofocus.', longDescription: 'FlexLens 35mm f/1.4 APO is the perfect everyday lens. APO formula eliminating chromatic aberrations, silent linear AF, weather-sealed construction.' },
    ar: { name: 'FlexLens 35mm', description: 'عدسة 35mm f/1.4 APO للإطار الكامل مع تركيز تلقائي صامت.', longDescription: 'FlexLens 35mm f/1.4 APO هي عدسة الحياة اليومية المثالية. صيغة APO تلغي الانحرافات اللونية، AF خطي صامت، بناء مقاوم للطقس.' },
  },
  'prod-20': {
    fr: { name: 'SmartPlug NX2', description: 'Prise connectée avec suivi de consommation et protection surtension.', longDescription: "Le SmartPlug NX2 transforme n'importe quel appareil en device connecté. Mesure la consommation en temps réel, programme des horaires, compatible Matter." },
    en: { name: 'SmartPlug NX2', description: 'Smart plug with energy monitoring and surge protection.', longDescription: 'SmartPlug NX2 turns any device into a connected one. Real-time energy monitoring, schedule programming, Matter and Thread compatible.' },
    ar: { name: 'SmartPlug NX2', description: 'قابس ذكي مع مراقبة الطاقة وحماية من ارتفاع الجهد.', longDescription: 'يحوّل SmartPlug NX2 أي جهاز إلى جهاز متصل. مراقبة الطاقة في الوقت الفعلي، برمجة الجداول الزمنية، متوافق مع Matter وThread.' },
  },
}
