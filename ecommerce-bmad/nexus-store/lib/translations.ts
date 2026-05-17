export type Locale = 'fr' | 'en' | 'ar'

export const translations = {
  fr: {
    // Header
    nav: { products: 'Produits', audio: 'Audio', wearables: 'Wearables', gaming: 'Gaming' },
    search: { placeholder: 'Rechercher un produit…', hint: 'Entrée pour rechercher · Échap pour fermer' },
    promo: { text: 'Code promo', suffix: '— 20% sur toute la boutique' },

    // Home
    home: {
      badge: 'Nouvelle collection 2025',
      heroTitle: 'Le futur,',
      heroHighlight: 'livré chez vous.',
      heroDesc: 'Découvrez notre sélection de gadgets tech et accessoires premium. Audio, wearables, smart home et plus encore.',
      cta: 'Explorer la boutique',
      ctaSecondary: 'Meilleures ventes',
      stats: { products: 'Produits', rating: 'Note moyenne', orders: 'Commandes' },
      features: [
        { title: 'Livraison express', desc: 'Gratuite dès 100€' },
        { title: 'Garantie 2 ans', desc: 'Sur tous les produits' },
        { title: 'Support 24/7', desc: 'Chat, email, téléphone' },
        { title: 'Retour 30 jours', desc: 'Sans question posée' },
      ],
      featured: { label: 'Sélection', title: 'Produits phares', seeAll: 'Voir tout' },
      categories: { label: 'Explorer', title: 'Par catégorie', products: 'produits' },
      banner: { label: 'Offre limitée', title: '20% sur tout le site', desc: "Utilisez le code", desc2: 'à la commande', cta: "J'en profite" },
      inStock: 'En stock', units: 'unités', topSale: 'Meilleure vente',
    },

    // Products
    products: {
      title: 'Tous les produits',
      searchResult: 'Résultats pour',
      found: 'produit trouvé', foundPlural: 'produits trouvés',
      sortLabel: 'Popularité',
      sortOptions: { featured: 'Popularité', 'price-asc': 'Prix croissant', 'price-desc': 'Prix décroissant', rating: 'Meilleures notes', newest: 'Nouveautés' },
      filters: 'Filtres', filtersActive: 'Filtres actifs :', all: 'Tout',
      category: 'Catégorie', maxPrice: 'Prix max', loading: 'Chargement…',
      empty: 'Aucun produit trouvé', emptyDesc: "Essayez d'autres mots-clés ou filtres",
    },

    // Product detail
    product: {
      addToCart: 'Ajouter au panier', inStock: 'En stock', outOfStock: 'Rupture de stock',
      lastUnits: 'Plus que', fewLeft: 'en stock !', specs: 'Caractéristiques',
      reviews: 'Avis clients', related: 'Vous aimerez aussi', verified: 'Vérifié',
      shipping: 'Livraison gratuite', shippingDesc: 'dès 100€',
      warranty: 'Garantie 2 ans', warrantyDesc: 'incluse',
      returns: 'Retour 30j', returnsDesc: 'offert', popular: 'Populaire', bestseller: 'Bestseller',
    },

    // Cart
    cart: {
      title: 'Panier', empty: 'Votre panier est vide', emptyDesc: 'Découvrez notre sélection de produits premium',
      browse: 'Voir les produits', clear: 'Vider le panier', continueShopping: 'Continuer les achats',
      summary: 'Récapitulatif', subtotal: 'Sous-total', discount: 'Réduction', shipping: 'Livraison',
      free: 'Gratuite', total: 'Total TTC', checkout: 'Commander', viewCart: 'Voir le panier complet',
      promo: { placeholder: 'Code promo', apply: 'Appliquer', applied: 'appliqué !', invalid: 'Code invalide. Essayez NEXUS20' },
      freeShipping: 'pour la livraison gratuite', moreToBuy: 'Plus que',
      payments: ['Visa', 'Mastercard', 'PayPal', 'Amex'],
      article: 'article', articles: 'articles',
    },

    // Checkout
    checkout: {
      title: 'Commande', steps: ['Livraison', 'Paiement', 'Confirmation'],
      shipping: { title: 'Adresse de livraison', firstName: 'Prénom', lastName: 'Nom', email: 'Email', phone: 'Téléphone', address: 'Adresse', city: 'Ville', zip: 'Code postal', country: 'Pays', continue: 'Continuer vers le paiement' },
      payment: { title: 'Paiement sécurisé', ssl: 'SSL 256-bit', demoTitle: 'Mode démo — utilisez ces cartes test :', demoNote: "Date : n'importe quelle date future · CVV : 3 chiffres", cardNumber: 'Numéro de carte', cardName: 'Nom sur la carte', expiry: "Date d'expiration", cvv: 'CVV', pay: 'Payer', back: 'Retour', error: 'Veuillez remplir tous les champs de paiement' },
      order: 'Votre commande',
    },

    // Success
    success: {
      title: 'Commande confirmée !', subtitle: 'Merci pour votre achat 🎉',
      orderNum: 'N° de commande :', tracking: 'Suivi de commande',
      steps: ['Commande confirmée', 'En préparation', 'En livraison', 'Livré'],
      times: ['Maintenant', 'Estimé : 2h', 'Estimé : demain', 'Estimé : 2-3 jours'],
      current: 'Actuel', continueShopping: 'Continuer les achats', backHome: "Retour à l'accueil",
    },

    // Footer
    footer: {
      tagline: 'Gadgets tech & accessoires premium.',
      demo: '© 2025 NEXUS Store. Démo client — Aucune transaction réelle.',
      status: 'Tous les systèmes opérationnels',
      links: {
        Boutique: [{ label: 'Tous les produits', href: '/products' }, { label: 'Audio', href: '/products?category=Audio' }, { label: 'Wearables', href: '/products?category=Wearables' }, { label: 'Gaming', href: '/products?category=Gaming' }],
        Support: [{ label: 'FAQ', href: '#' }, { label: 'Livraison', href: '#' }, { label: 'Retours', href: '#' }, { label: 'Contact', href: '#' }],
        Entreprise: [{ label: 'À propos', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Admin', href: '/admin' }, { label: 'Partenariats', href: '#' }],
      },
    },

    // Admin
    admin: {
      dashboard: 'Dashboard', welcome: 'Bienvenue ! Voici les données du mois.',
      revenue: "Chiffre d'affaires", orders: 'Commandes', products: 'Produits', customers: 'Clients',
      monthlyRevenue: 'Revenus mensuels', topProducts: 'Top produits', recentOrders: 'Commandes récentes',
      seeAll: 'Voir toutes →', sold: 'vendus',
      productsPage: { title: 'Produits', total: 'produits au total', add: 'Ajouter', search: 'Rechercher un produit…', featured: 'Featured', inStock: 'En stock', outOfStock: 'Rupture' },
      ordersPage: { title: 'Commandes', total: 'commandes au total', search: 'N° commande, client…', all: 'Toutes', products: 'Produits commandés', shippingTitle: 'Livraison', changeStatus: 'Changer le statut', noOrders: 'Aucune commande trouvée' },
      form: { nameLabel: 'Nom du produit *', desc: 'Description courte *', longDesc: 'Description longue', price: 'Prix (€) *', originalPrice: 'Prix barré (€)', stock: 'Stock *', image: 'Image URL *', tags: 'Tags (séparés par des virgules)', featured: 'Produit mis en avant (featured)', save: 'Enregistrer', cancel: 'Annuler', addTitle: 'Ajouter un produit', editTitle: 'Modifier le produit' },
      delete: { title: 'Supprimer le produit', desc: 'Cette action est irréversible.', confirm: 'Supprimer', cancel: 'Annuler' },
      sidebar: { admin: 'NEXUS Admin', panel: 'Panneau de gestion', dashboard: 'Dashboard', products: 'Produits', orders: 'Commandes', logout: 'Déconnexion', viewStore: 'Voir la boutique' },
      login: { title: 'NEXUS Admin', subtitle: "Connexion au panneau d'administration", demoLabel: 'Identifiants de démo :', submit: 'Se connecter', showPass: 'Afficher', hidePass: 'Masquer' },
    },

    // Common
    common: { back: 'Retour', viewAll: 'Voir tout', close: 'Fermer', confirm: 'Confirmer' },
  },

  en: {
    nav: { products: 'Products', audio: 'Audio', wearables: 'Wearables', gaming: 'Gaming' },
    search: { placeholder: 'Search a product…', hint: 'Enter to search · Esc to close' },
    promo: { text: 'Promo code', suffix: '— 20% off the entire store' },

    home: {
      badge: 'New collection 2025',
      heroTitle: 'The future,',
      heroHighlight: 'delivered to you.',
      heroDesc: 'Discover our selection of tech gadgets and premium accessories. Audio, wearables, smart home and more.',
      cta: 'Explore the store',
      ctaSecondary: 'Best sellers',
      stats: { products: 'Products', rating: 'Average rating', orders: 'Orders' },
      features: [
        { title: 'Express delivery', desc: 'Free over €100' },
        { title: '2-year warranty', desc: 'On all products' },
        { title: '24/7 Support', desc: 'Chat, email, phone' },
        { title: '30-day returns', desc: 'No questions asked' },
      ],
      featured: { label: 'Selection', title: 'Featured products', seeAll: 'See all' },
      categories: { label: 'Explore', title: 'By category', products: 'products' },
      banner: { label: 'Limited offer', title: '20% off the entire store', desc: 'Use code', desc2: 'at checkout', cta: 'Shop now' },
      inStock: 'In stock', units: 'units', topSale: 'Best seller',
    },

    products: {
      title: 'All products',
      searchResult: 'Results for',
      found: 'product found', foundPlural: 'products found',
      sortLabel: 'Popularity',
      sortOptions: { featured: 'Popularity', 'price-asc': 'Price: low to high', 'price-desc': 'Price: high to low', rating: 'Best rated', newest: 'Newest' },
      filters: 'Filters', filtersActive: 'Active filters:', all: 'All',
      category: 'Category', maxPrice: 'Max price', loading: 'Loading…',
      empty: 'No products found', emptyDesc: 'Try different keywords or filters',
    },

    product: {
      addToCart: 'Add to cart', inStock: 'In stock', outOfStock: 'Out of stock',
      lastUnits: 'Only', fewLeft: 'left!', specs: 'Specifications',
      reviews: 'Customer reviews', related: 'You might also like', verified: 'Verified',
      shipping: 'Free shipping', shippingDesc: 'over €100',
      warranty: '2-year warranty', warrantyDesc: 'included',
      returns: '30-day returns', returnsDesc: 'free', popular: 'Popular', bestseller: 'Bestseller',
    },

    cart: {
      title: 'Cart', empty: 'Your cart is empty', emptyDesc: 'Discover our premium product selection',
      browse: 'Browse products', clear: 'Clear cart', continueShopping: 'Continue shopping',
      summary: 'Order summary', subtotal: 'Subtotal', discount: 'Discount', shipping: 'Shipping',
      free: 'Free', total: 'Total', checkout: 'Checkout', viewCart: 'View full cart',
      promo: { placeholder: 'Promo code', apply: 'Apply', applied: 'applied!', invalid: 'Invalid code. Try NEXUS20' },
      freeShipping: 'for free shipping', moreToBuy: 'Only',
      payments: ['Visa', 'Mastercard', 'PayPal', 'Amex'],
      article: 'item', articles: 'items',
    },

    checkout: {
      title: 'Order', steps: ['Shipping', 'Payment', 'Confirmation'],
      shipping: { title: 'Shipping address', firstName: 'First name', lastName: 'Last name', email: 'Email', phone: 'Phone', address: 'Address', city: 'City', zip: 'ZIP code', country: 'Country', continue: 'Continue to payment' },
      payment: { title: 'Secure payment', ssl: 'SSL 256-bit', demoTitle: 'Demo mode — use these test cards:', demoNote: 'Date: any future date · CVV: 3 digits', cardNumber: 'Card number', cardName: 'Cardholder name', expiry: 'Expiry date', cvv: 'CVV', pay: 'Pay', back: 'Back', error: 'Please fill in all payment fields' },
      order: 'Your order',
    },

    success: {
      title: 'Order confirmed!', subtitle: 'Thank you for your purchase 🎉',
      orderNum: 'Order number:', tracking: 'Order tracking',
      steps: ['Order confirmed', 'Being prepared', 'Out for delivery', 'Delivered'],
      times: ['Now', 'Est. 2h', 'Est. tomorrow', 'Est. 2-3 days'],
      current: 'Current', continueShopping: 'Continue shopping', backHome: 'Back to home',
    },

    footer: {
      tagline: 'Tech gadgets & premium accessories.',
      demo: '© 2025 NEXUS Store. Client demo — No real transactions.',
      status: 'All systems operational',
      links: {
        Store: [{ label: 'All products', href: '/products' }, { label: 'Audio', href: '/products?category=Audio' }, { label: 'Wearables', href: '/products?category=Wearables' }, { label: 'Gaming', href: '/products?category=Gaming' }],
        Support: [{ label: 'FAQ', href: '#' }, { label: 'Shipping', href: '#' }, { label: 'Returns', href: '#' }, { label: 'Contact', href: '#' }],
        Company: [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Admin', href: '/admin' }, { label: 'Partnerships', href: '#' }],
      },
    },

    admin: {
      dashboard: 'Dashboard', welcome: 'Welcome! Here are this month\'s figures.',
      revenue: 'Revenue', orders: 'Orders', products: 'Products', customers: 'Customers',
      monthlyRevenue: 'Monthly revenue', topProducts: 'Top products', recentOrders: 'Recent orders',
      seeAll: 'See all →', sold: 'sold',
      productsPage: { title: 'Products', total: 'products total', add: 'Add', search: 'Search a product…', featured: 'Featured', inStock: 'In stock', outOfStock: 'Out of stock' },
      ordersPage: { title: 'Orders', total: 'orders total', search: 'Order #, customer…', all: 'All', products: 'Ordered items', shippingTitle: 'Shipping', changeStatus: 'Change status', noOrders: 'No orders found' },
      form: { nameLabel: 'Product name *', desc: 'Short description *', longDesc: 'Long description', price: 'Price (€) *', originalPrice: 'Original price (€)', stock: 'Stock *', image: 'Image URL *', tags: 'Tags (comma-separated)', featured: 'Featured product', save: 'Save', cancel: 'Cancel', addTitle: 'Add product', editTitle: 'Edit product' },
      delete: { title: 'Delete product', desc: 'This action is irreversible.', confirm: 'Delete', cancel: 'Cancel' },
      sidebar: { admin: 'NEXUS Admin', panel: 'Management panel', dashboard: 'Dashboard', products: 'Products', orders: 'Orders', logout: 'Logout', viewStore: 'View store' },
      login: { title: 'NEXUS Admin', subtitle: 'Sign in to the admin panel', demoLabel: 'Demo credentials:', submit: 'Sign in', showPass: 'Show', hidePass: 'Hide' },
    },

    common: { back: 'Back', viewAll: 'View all', close: 'Close', confirm: 'Confirm' },
  },

  ar: {
    nav: { products: 'المنتجات', audio: 'صوتيات', wearables: 'ساعات ذكية', gaming: 'ألعاب' },
    search: { placeholder: 'ابحث عن منتج…', hint: 'اضغط Enter للبحث · Esc للإغلاق' },
    promo: { text: 'كود ترويجي', suffix: '— خصم 20% على المتجر بأكمله' },

    home: {
      badge: 'مجموعة جديدة 2025',
      heroTitle: 'المستقبل،',
      heroHighlight: 'يُوصَل إليك.',
      heroDesc: 'اكتشف مجموعتنا من الأجهزة التقنية والإكسسوارات المميزة. صوتيات، ساعات ذكية، منزل ذكي والمزيد.',
      cta: 'استكشف المتجر',
      ctaSecondary: 'الأكثر مبيعاً',
      stats: { products: 'منتج', rating: 'متوسط التقييم', orders: 'طلب' },
      features: [
        { title: 'توصيل سريع', desc: 'مجاني من 100€' },
        { title: 'ضمان سنتان', desc: 'على جميع المنتجات' },
        { title: 'دعم 24/7', desc: 'دردشة، بريد، هاتف' },
        { title: 'إرجاع 30 يوم', desc: 'بدون أسئلة' },
      ],
      featured: { label: 'مختارات', title: 'المنتجات المميزة', seeAll: 'عرض الكل' },
      categories: { label: 'استكشاف', title: 'حسب الفئة', products: 'منتجات' },
      banner: { label: 'عرض محدود', title: 'خصم 20% على المتجر', desc: 'استخدم الكود', desc2: 'عند الدفع', cta: 'استفد الآن' },
      inStock: 'متوفر', units: 'وحدة', topSale: 'الأكثر مبيعاً',
    },

    products: {
      title: 'جميع المنتجات',
      searchResult: 'نتائج البحث عن',
      found: 'منتج', foundPlural: 'منتجات',
      sortLabel: 'الأكثر شهرة',
      sortOptions: { featured: 'الأكثر شهرة', 'price-asc': 'السعر: الأقل أولاً', 'price-desc': 'السعر: الأعلى أولاً', rating: 'الأعلى تقييماً', newest: 'الأحدث' },
      filters: 'فلاتر', filtersActive: 'فلاتر نشطة:', all: 'الكل',
      category: 'الفئة', maxPrice: 'أقصى سعر', loading: 'جارٍ التحميل…',
      empty: 'لا توجد منتجات', emptyDesc: 'جرّب كلمات مختلفة أو فلاتر أخرى',
    },

    product: {
      addToCart: 'أضف إلى السلة', inStock: 'متوفر في المخزن', outOfStock: 'نفد من المخزن',
      lastUnits: 'تبقى فقط', fewLeft: '!', specs: 'المواصفات',
      reviews: 'آراء العملاء', related: 'قد يعجبك أيضاً', verified: 'موثق',
      shipping: 'شحن مجاني', shippingDesc: 'من 100€',
      warranty: 'ضمان سنتان', warrantyDesc: 'مشمول',
      returns: 'إرجاع 30 يوم', returnsDesc: 'مجاناً', popular: 'رائج', bestseller: 'الأكثر مبيعاً',
    },

    cart: {
      title: 'سلة التسوق', empty: 'سلتك فارغة', emptyDesc: 'اكتشف مجموعتنا من المنتجات المميزة',
      browse: 'تصفح المنتجات', clear: 'إفراغ السلة', continueShopping: 'مواصلة التسوق',
      summary: 'ملخص الطلب', subtotal: 'المجموع الفرعي', discount: 'خصم', shipping: 'الشحن',
      free: 'مجاني', total: 'الإجمالي', checkout: 'إتمام الطلب', viewCart: 'عرض السلة كاملة',
      promo: { placeholder: 'كود الخصم', apply: 'تطبيق', applied: 'مُطبَّق!', invalid: 'كود غير صحيح. جرّب NEXUS20' },
      freeShipping: 'للحصول على شحن مجاني', moreToBuy: 'تبقى فقط',
      payments: ['Visa', 'Mastercard', 'PayPal', 'Amex'],
      article: 'عنصر', articles: 'عناصر',
    },

    checkout: {
      title: 'الطلب', steps: ['الشحن', 'الدفع', 'التأكيد'],
      shipping: { title: 'عنوان التوصيل', firstName: 'الاسم الأول', lastName: 'اسم العائلة', email: 'البريد الإلكتروني', phone: 'الهاتف', address: 'العنوان', city: 'المدينة', zip: 'الرمز البريدي', country: 'الدولة', continue: 'المتابعة إلى الدفع' },
      payment: { title: 'دفع آمن', ssl: 'SSL 256-bit', demoTitle: 'وضع تجريبي — استخدم هذه البطاقات:', demoNote: 'التاريخ: أي تاريخ مستقبلي · CVV: 3 أرقام', cardNumber: 'رقم البطاقة', cardName: 'اسم حامل البطاقة', expiry: 'تاريخ الانتهاء', cvv: 'CVV', pay: 'ادفع', back: 'رجوع', error: 'يرجى ملء جميع حقول الدفع' },
      order: 'طلبك',
    },

    success: {
      title: '!تم تأكيد طلبك', subtitle: 'شكراً على شرائك 🎉',
      orderNum: ':رقم الطلب', tracking: 'تتبع الطلب',
      steps: ['تأكيد الطلب', 'قيد التحضير', 'في الطريق إليك', 'تم التسليم'],
      times: ['الآن', 'خلال ساعتين', 'غداً', 'خلال 2-3 أيام'],
      current: 'الحالي', continueShopping: 'مواصلة التسوق', backHome: 'العودة للرئيسية',
    },

    footer: {
      tagline: 'أجهزة تقنية وإكسسوارات مميزة.',
      demo: '.© 2025 NEXUS Store. عرض تجريبي — لا معاملات حقيقية',
      status: 'جميع الأنظمة تعمل بكفاءة',
      links: {
        المتجر: [{ label: 'جميع المنتجات', href: '/products' }, { label: 'صوتيات', href: '/products?category=Audio' }, { label: 'ساعات ذكية', href: '/products?category=Wearables' }, { label: 'ألعاب', href: '/products?category=Gaming' }],
        الدعم: [{ label: 'أسئلة شائعة', href: '#' }, { label: 'الشحن', href: '#' }, { label: 'الإرجاع', href: '#' }, { label: 'تواصل معنا', href: '#' }],
        الشركة: [{ label: 'من نحن', href: '#' }, { label: 'المدونة', href: '#' }, { label: 'الإدارة', href: '/admin' }, { label: 'الشراكات', href: '#' }],
      },
    },

    admin: {
      dashboard: 'لوحة التحكم', welcome: 'مرحباً! إليك بيانات هذا الشهر.',
      revenue: 'الإيرادات', orders: 'الطلبات', products: 'المنتجات', customers: 'العملاء',
      monthlyRevenue: 'الإيرادات الشهرية', topProducts: 'أفضل المنتجات', recentOrders: 'أحدث الطلبات',
      seeAll: 'عرض الكل ←', sold: 'مُباع',
      productsPage: { title: 'المنتجات', total: 'منتجات إجمالاً', add: 'إضافة', search: 'ابحث عن منتج…', featured: 'مميز', inStock: 'متوفر', outOfStock: 'نفد' },
      ordersPage: { title: 'الطلبات', total: 'طلبات إجمالاً', search: 'رقم الطلب، العميل…', all: 'الكل', products: 'المنتجات المطلوبة', shippingTitle: 'التوصيل', changeStatus: 'تغيير الحالة', noOrders: 'لا توجد طلبات' },
      form: { nameLabel: 'اسم المنتج *', desc: 'وصف قصير *', longDesc: 'وصف مفصل', price: 'السعر (€) *', originalPrice: 'السعر الأصلي (€)', stock: 'المخزون *', image: 'رابط الصورة *', tags: 'الوسوم (مفصولة بفاصلة)', featured: 'منتج مميز', save: 'حفظ', cancel: 'إلغاء', addTitle: 'إضافة منتج', editTitle: 'تعديل المنتج' },
      delete: { title: 'حذف المنتج', desc: 'هذا الإجراء لا يمكن التراجع عنه.', confirm: 'حذف', cancel: 'إلغاء' },
      sidebar: { admin: 'NEXUS Admin', panel: 'لوحة الإدارة', dashboard: 'لوحة التحكم', products: 'المنتجات', orders: 'الطلبات', logout: 'تسجيل الخروج', viewStore: 'عرض المتجر' },
      login: { title: 'NEXUS Admin', subtitle: 'تسجيل الدخول إلى لوحة الإدارة', demoLabel: 'بيانات تجريبية:', submit: 'تسجيل الدخول', showPass: 'إظهار', hidePass: 'إخفاء' },
    },

    common: { back: 'رجوع', viewAll: 'عرض الكل', close: 'إغلاق', confirm: 'تأكيد' },
  },
} as const

export type TranslationKey = typeof translations.fr
