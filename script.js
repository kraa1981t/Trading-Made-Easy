document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher ---
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');

    if (localStorage.getItem('theme') === 'dark') {
        html.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
    }

    themeToggle.addEventListener('click', () => {
        if (html.getAttribute('data-theme') === 'dark') {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.className = 'fas fa-moon';
        } else {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.className = 'fas fa-sun';
        }
    });

    // --- Mobile Menu ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLeft = document.querySelector('.nav-left');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLeft.classList.toggle('active');
        });
    }

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (navLeft.classList.contains('active')) navLeft.classList.remove('active');
            }
        });
    });

    // --- Admin Config Loader (Upgraded to V3 for Priority & Cleanup) ---
    const CONFIG_KEY = 'tme_config_v3';
    const OLD_CONFIG_KEY = 'tme_config_v2';

    // Cleanup legacy config to prevent "ghost" reverts
    if (localStorage.getItem(OLD_CONFIG_KEY)) {
        console.log("Migrating/Cleaning old V2 config...");
        const oldData = localStorage.getItem(OLD_CONFIG_KEY);
        if (!localStorage.getItem(CONFIG_KEY)) {
            localStorage.setItem(CONFIG_KEY, oldData);
        }
        localStorage.removeItem(OLD_CONFIG_KEY);
    }

    function getLatestConfig() {
        try {
            return JSON.parse(localStorage.getItem(CONFIG_KEY)) || {};
        } catch (e) { return {}; }
    }

    // --- Notifications Ticker ---
    const ticker = document.getElementById('notification-ticker');
    let notifications = [
        "Welcome to Trading Made Easy - Transforming market analysis into profit.",
        "New algorithm update available for MT5 Bots.",
        "System latency reduced by 15% this week."
    ];

    const siteConfig = getLatestConfig();
    if (siteConfig && siteConfig.textOverrides && siteConfig.textOverrides.ticker_msgs) {
        const customMsgs = siteConfig.textOverrides.ticker_msgs.split('\n').filter(m => m.trim() !== '');
        if (customMsgs.length > 0) notifications = customMsgs;
    }

    let msgIndex = 0;
    if (ticker) {
        ticker.textContent = notifications[0];
        setInterval(() => {
            ticker.style.opacity = '0';
            setTimeout(() => {
                msgIndex = (msgIndex + 1) % notifications.length;
                ticker.textContent = notifications[msgIndex];
                ticker.style.opacity = '1';
            }, 500);
        }, 5000);
    }

    // --- Apply Admin Settings (MODIFIED: Moved to index.html for Page Builder) ---
    // Note: Most site settings are now handled dynamically in index.html's applySiteSettings()
    // to support the real-time cloud sync and Page Builder placements.

    // Social Links & Theme Persistence
    const liveCfg = getLatestConfig();
    if (liveCfg && liveCfg.links) {
        const fb = document.querySelector('a[href*="facebook.com"]');
        if (fb && liveCfg.links.facebook) fb.href = liveCfg.links.facebook;
        const pin = document.querySelector('a[href*="pinterest.com"]');
        if (pin && liveCfg.links.pinterest) pin.href = liveCfg.links.pinterest;
        const email = document.querySelector('a[href^="mailto:"]');
        if (email && liveCfg.links.email) email.href = "mailto:" + liveCfg.links.email;
    }

    // --- Language & Translations ---
    const translations = {
        en: {
            nav_home: "Home", nav_bots: "MT5 Bots", nav_signals: "Signals", nav_services: "Services", nav_about: "About", nav_contact: "Contact",
            site_title: "Trading Made Easy",
            hero_title: "Precision Trading. <span style='color: var(--primary-color);'>Automated.</span>",
            hero_subtitle: "\"A platform dedicated to automated trading solutions that transform complex market analysis into precise and profitable algorithms.\"",
            hero_btn_view: "View Bots", hero_btn_consult: "Get Consultation",
            stat_success: "Success Rate", stat_traders: "Active Traders", stat_algos: "Proprietary Algos",
            latest_offer_title: "Latest Offer:", latest_offer_text: "Get 20% off on the Momentum Hunter 2.0 this week!",
            bots_section_title: "Premium MT5 Bots",
            signals_title: "Daily Trading Signals",
            sig_prec: "High Precision Entries", sig_prec_desc: "Get real-time entry and exit points directly to your device.",
            sig_feat1: "Major Forex Pairs", sig_feat2: "Gold & Indices", sig_feat3: "Risk:Reward 1:3 Min",
            sig_brief: "Today's Audio Briefing", sig_brief_desc: "Daily market outlook and key levels for EURUSD and XAUUSD.",
            stats_section_title: "Platform Activity",
            stat_visits: "Monthly Visits", stat_views: "Product Views", stat_purchases: "Bot Purchases", stat_profit: "Client Profit Generated",
            services_section_title: "Services Offered",
            serv_custom: "Custom Trading Bot Development", serv_algo: "Algorithmic Strategy Design", serv_opt: "System Optimization", serv_ment: "Technical Mentorship",
            serv_other_label: "Other Specialized Services", serv_select: "Select a Service...",
            pay_title: "Secure Payments",
            about_title: "About the Developer", about_role: "Senior Algorithmic Trading Developer",
            about_bio_title: "Bio", about_bio_text: "I am KRAA MOHAMED, a specialized algorithmic trader and MQL5 developer. My passion lies in transforming complex trading concepts into efficient, automated code.",
            about_arsenal_title: "Technical Arsenal", about_exp_title: "Professional Experience",
            exp_role1: "Algorithmic Trading Consultant", exp_desc1a: "Deployed 15+ proprietary algorithms (78% success rate).", exp_desc1b: "Reduced latency by 40% via architecture optimization.",
            exp_role2: "Senior MQL5 Developer", exp_desc2a: "Led migration from MQL4 to MQL5 for 200+ clients.", exp_desc2b: "Implemented efficient backtesting frameworks.",
            exp_role3: "Trading Systems Analyst",
            contact_title: "Get In Touch",
            form_name: "Your Name", form_email: "Your Email", form_msg: "Your Message", form_send: "Send Message",
            follow_us: "Follow us on social media:",
            rights_reserved: "All rights reserved.",
            // Admin Panel
            adm_dashboard_title: "Admin Dashboard", adm_dashboard_desc: "Manage your website content and settings",
            adm_exit_btn: "Exit Dashboard", adm_enter_pass: "Enter Developer Password", adm_pass_placeholder: "Password",
            adm_login_btn: "Login", adm_error_pass: "Incorrect Password",
            adm_tab_general: "General", adm_tab_appearance: "Appearance", adm_tab_content: "Content & Products",
            adm_vis_title: "Section Visibility", adm_vis_bots: "MT5 Bots", adm_vis_signals: "Signals", adm_vis_services: "Services", adm_vis_about: "About Me",
            adm_social_title: "Social & Contact Links", adm_wallet_title: "Payment Wallets (Checkout)", adm_save_all: "Save All Changes",
            adm_app_title_label: "Site Title", adm_app_color_label: "Primary Color", adm_app_radius_label: "Corner Style",
            adm_app_meta_label: "SEO Meta Description", adm_app_profile_label: "Profile Picture (About Me)", adm_app_upload_btn: "Upload New Photo",
            adm_txt_hero_label: "Hero Title", adm_txt_hero_desc_label: "Hero Description", adm_txt_about_label: "About Bio",
            adm_txt_ticker_label: "News Ticker Messages", adm_txt_ticker_desc: "Enter one message per line.",
            adm_prod_manage_title: "Manage Products (Bots)", adm_prod_refresh: "Refresh List", adm_prod_add_title: "Add New Product",
            adm_prod_title_placeholder: "Product Title", adm_prod_price_placeholder: "Price ($)", adm_prod_img_btn: "Choose Image",
            adm_prod_desc_placeholder: "Short Description", adm_file_label: "Product Download File",
            adm_file_btn: "Choose/Update File", adm_file_remove: "Remove File", adm_file_none: "No file selected",
            adm_prod_add_btn: "+ Add Product",
            adm_prod_type_free: "Free Product?",
            download_free_btn: "Download Free",
            adm_prod_free_label: "FREE",
            buy_btn: "Buy Now"
        },
        ar: {
            nav_home: "الرئيسية", nav_bots: "روبوتات MT5", nav_signals: "الإشارات", nav_services: "الخدمات", nav_about: "من نحن", nav_contact: "اتصل بنا",
            site_title: "التداول السهل",
            hero_title: "تداول دقيق. <span style='color: var(--primary-color);'>مؤتمت.</span>",
            hero_subtitle: "\"منصة مخصصة لحلول التداول الآلي، تحول تحليل السوق المعقد إلى خوارزميات دقيقة ومربحة.\"",
            hero_btn_view: "شاهد الروبوتات", hero_btn_consult: "احصل على استشارة",
            stat_success: "نسبة النجاح", stat_traders: "متداول نشط", stat_algos: "خوارزميات خاصة",
            latest_offer_title: "أحدث العروض:", latest_offer_text: "احصل على خصم 20% على Momentum Hunter 2.0 هذا الأسبوع!",
            bots_section_title: "روبوتات MT5 المميزة",
            signals_title: "إشارات التداول اليومية",
            sig_prec: "دخول عالي الدقة", sig_prec_desc: "احصل على نقاط الدخول والخروج في الوقت الفعلي مباشرة إلى جهازك.",
            sig_feat1: "أزواج العملات الرئيسية", sig_feat2: "الذهب والمؤشرات", sig_feat3: "المخاطرة:العائد 1:3 كحد أدنى",
            sig_brief: "الموجز الصوتي لليوم", sig_brief_desc: "نظرة عامة يومية على السوق والمستويات الرئيسية لزوج اليورو/دولار والذهب.",
            stats_section_title: "نشاط المنصة",
            stat_visits: "زيارات شهرية", stat_views: "مشاهدات المنتجات", stat_purchases: "شراء الروبوتات", stat_profit: "أرباح العملاء المحققة",
            services_section_title: "الخدمات المقدمة",
            serv_custom: "تطوير روبوتات تداول مخصصة", serv_algo: "تصميم الاستراتيجيات الخوارزمية", serv_opt: "تحسين الأنظمة", serv_ment: "إرشاد تقني",
            serv_other_label: "خدمات متخصصة أخرى", serv_select: "اختر خدمة...",
            pay_title: "دفع آمن",
            about_title: "عن المطور", about_role: "مطور خوارزميات تداول أول",
            about_bio_title: "السيرة الذاتية", about_bio_text: "\"ريادة الجيل القادم من أنظمة التداول الخوارزمية التي تتيح أدوات التداول المؤسسية للجميع، مما يجعل تحليل السوق المتقدم متاحًا وقابلًا للتنفيذ للمتداولين في جميع أنحاء العالم.\"",
            about_arsenal_title: "الترسانة التقنية", about_exp_title: "الخبرة المهنية",
            exp_role1: "مستشار تداول خوارزمي", exp_desc1a: "نشر أكثر من 15 خوارزمية خاصة (نسبة نجاح 78%).", exp_desc1b: "تقليل زمن الانتقال بنسبة 40% من خلال تحسين البنية.",
            exp_role2: "مطور MQL5 أول", exp_desc2a: "قاد عملية الانتقال من MQL4 إلى MQL5 لأكثر من 200 عميل.", exp_desc2b: "تنفيذ أطر عمل فعالة للاختبار الخلفي (Backtesting).",
            exp_role3: "محلل أنظمة تداول",
            contact_title: "تواصل معنا",
            form_name: "اسمك", form_email: "بريدك الإلكتروني", form_msg: "رسالتك", form_send: "إرسال الرسالة",
            follow_us: "تابعنا على وسائل التواصل الاجتماعي:",
            rights_reserved: "جميع الحقوق محفوظة.",
            // Admin Panel
            adm_dashboard_title: "لوحة تحكم المسؤول", adm_dashboard_desc: "إدارة محتوى الموقع وإعداداته",
            adm_exit_btn: "خروج من اللوحة", adm_enter_pass: "أدخل كلمة مرور المطور", adm_pass_placeholder: "كلمة المرور",
            adm_login_btn: "دخول", adm_error_pass: "كلمة المرور غير صحيحة",
            adm_tab_general: "عام", adm_tab_appearance: "المظهر", adm_tab_content: "المحتوى والمنتجات",
            adm_vis_title: "ظهور الأقسام", adm_vis_bots: "روبوتات MT5", adm_vis_signals: "الإشارات", adm_vis_services: "الخدمات", adm_vis_about: "من أنا",
            adm_social_title: "روابط التواصل", adm_wallet_title: "محافظ الدفع", adm_save_all: "حفظ كل التغييرات",
            adm_app_title_label: "عنوان الموقع", adm_app_color_label: "اللون الأساسي", adm_app_radius_label: "زوايا العناصر",
            adm_app_meta_label: "وصف SEO (لجوجل)", adm_app_profile_label: "صورة البروفايل", adm_app_upload_btn: "رفع صورة جديدة",
            adm_txt_hero_label: "عنوان الهيرو", adm_txt_hero_desc_label: "وصف الهيرو", adm_txt_about_label: "السيرة الذاتية",
            adm_txt_ticker_label: "رسائل شريط الأخبار", adm_txt_ticker_desc: "أدخل رسالة واحدة في كل سطر.",
            adm_prod_manage_title: "إدارة المنتجات (الروبوتات)", adm_prod_refresh: "تحديث القائمة", adm_prod_add_title: "إضافة منتج جديد",
            adm_prod_title_placeholder: "اسم المنتج", adm_prod_price_placeholder: "السعر ($)", adm_prod_img_btn: "اختر صورة",
            adm_prod_desc_placeholder: "وصف قصير", adm_file_label: "ملف المنتج للتحميل",
            adm_file_btn: "اختر/تحديث الملف", adm_file_remove: "حذف الملف", adm_file_none: "لا يوجد ملف مختار",
            adm_prod_add_btn: "+ إضافة المنتج",
            adm_prod_type_free: "منتج مجاني؟",
            download_free_btn: "تحميل مجاني",
            adm_prod_free_label: "مجاني",
            buy_btn: "شراء الآن"
        },
        es: {
            nav_home: "Inicio", nav_bots: "Bots MT5", nav_signals: "Señales", nav_services: "Servicios", nav_about: "Sobre Mí", nav_contact: "Contacto",
            site_title: "Trading Made Easy",
            hero_title: "Trading de Precisión. <span style='color: var(--primary-color);'>Automatizado.</span>",
            hero_subtitle: "\"Una plataforma dedicada a soluciones de trading automatizado que transforman el análisis de mercado complejo en algoritmos precisos y rentables.\"",
            hero_btn_view: "Ver Bots", hero_btn_consult: "Obtener Consulta",
            stat_success: "Tasa de Éxito", stat_traders: "Traders Activos", stat_algos: "Algos Propios",
            latest_offer_title: "Última Oferta:", latest_offer_text: "¡Obtén un 20% de descuento en el Momentum Hunter 2.0 esta semana!",
            bots_section_title: "Bots MT5 Premium",
            signals_title: "Señales Diarias",
            sig_prec: "Alta Precisión", sig_prec_desc: "Obtén puntos de entrada y salida en tiempo real.",
            sig_feat1: "Pares Mayores Forex", sig_feat2: "Oro e Índices", sig_feat3: "Riesgo:Recompensa Min 1:3",
            sig_brief: "Informe de Audio de Hoy", sig_brief_desc: "Perspectiva diaria del mercado y niveles clave.",
            stats_section_title: "Actividad",
            stat_visits: "Visitas Mensuales", stat_views: "Vistas de Producto", stat_purchases: "Compras de Bots", stat_profit: "Beneficio Generado",
            services_section_title: "Servicios",
            serv_custom: "Desarrollo de Bots", serv_algo: "Diseño de Estrategias", serv_opt: "Optimización de Sistemas", serv_ment: "Mentoría Técnica",
            serv_other_label: "Otros Servicios", serv_select: "Seleccionar...",
            pay_title: "Pagos Seguros",
            about_title: "Sobre el Desarrollador", about_role: "Desarrollador Senior de Trading",
            about_bio_title: "Biografía", about_bio_text: "\"Ser pionero en sistemas de trading algorítmico de próxima generación que democraticen herramientas institucionales.\"",
            about_arsenal_title: "Arsenal Técnico", about_exp_title: "Experiencia Profesional",
            exp_role1: "Consultor de Trading", exp_desc1a: "Desplegó más de 15 algoritmos propietarios (78% de éxito).", exp_desc1b: "Redujo la latencia en un 40%.",
            exp_role2: "Desarrollador MQL5 Senior", exp_desc2a: "Lideró la migración de MQL4 a MQL5.", exp_desc2b: "Implementó marcos de backtesting eficientes.",
            exp_role3: "Analista de Sistemas",
            contact_title: "Contáctanos",
            form_name: "Tu Nombre", form_email: "Tu Email", form_msg: "Tu Message", form_send: "Enviar Mensaje",
            follow_us: "Síguenos en:",
            rights_reserved: "Todos los derechos reservados.",
            // Admin Panel
            adm_dashboard_title: "Panel de Control", adm_dashboard_desc: "Administre el contenido y la configuración",
            adm_exit_btn: "Salir", adm_enter_pass: "Contraseña de Desarrollador", adm_pass_placeholder: "Contraseña",
            adm_login_btn: "Entrar", adm_error_pass: "Contraseña incorrecta",
            adm_tab_general: "General", adm_tab_appearance: "Apariencia", adm_tab_content: "Contenido",
            adm_vis_title: "Visibilidad", adm_vis_bots: "Bots MT5", adm_vis_signals: "Señales", adm_vis_services: "Servicios", adm_vis_about: "Sobre Mí",
            adm_social_title: "Redes Sociales", adm_wallet_title: "Carteras (Pago)", adm_save_all: "Guardar Cambios",
            adm_app_title_label: "Título del Sitio", adm_app_color_label: "Color Primario", adm_app_radius_label: "Estilo de Bordes",
            adm_app_meta_label: "Descripción SEO", adm_app_profile_label: "Foto de Perfil", adm_app_upload_btn: "Subir Foto",
            adm_txt_hero_label: "Título Hero", adm_txt_hero_desc_label: "Descripción Hero", adm_txt_about_label: "Biografía",
            adm_txt_ticker_label: "Mensajes del Ticker", adm_txt_ticker_desc: "Un mensaje por línea.",
            adm_prod_manage_title: "Gestionar Productos", adm_prod_refresh: "Refrescar", adm_prod_add_title: "Nuevo Producto",
            adm_prod_title_placeholder: "Título", adm_prod_price_placeholder: "Precio ($)", adm_prod_img_btn: "Imagen",
            adm_prod_desc_placeholder: "Descripción", adm_file_label: "Archivo de Descarga",
            adm_file_btn: "Elegir Archivo", adm_file_remove: "Eliminar", adm_file_none: "Sin archivo",
            adm_prod_add_btn: "+ Añadir",
            adm_prod_type_free: "¿Producto Gratis?",
            download_free_btn: "Descarga Gratis",
            adm_prod_free_label: "GRATIS",
            buy_btn: "Comprar Ahora"
        },
        fr: {
            nav_home: "Accueil", nav_bots: "Bots MT5", nav_signals: "Signaux", nav_services: "Services", nav_about: "À Propos", nav_contact: "Contact",
            site_title: "Trading Made Easy",
            hero_title: "Trading de Précision. <span style='color: var(--primary-color);'>Automatisé.</span>",
            hero_subtitle: "\"Une plateforme dédiée aux solutions de trading automatisé transformant l'analyse complexe en algorithmes précis.\"",
            hero_btn_view: "Voir les Bots", hero_btn_consult: "Consultation",
            stat_success: "Taux de Réussite", stat_traders: "Traders Actifs", stat_algos: "Algos Propriétaires",
            latest_offer_title: "Dernière Offre:", latest_offer_text: "Obtenez 20% de réduction sur le Momentum Hunter 2.0 !",
            bots_section_title: "Bots MT5 Premium",
            signals_title: "Signaux Quotidiens",
            sig_prec: "Entrées Haute Précision", sig_prec_desc: "Points d'entrée et de sortie en temps réel.",
            sig_feat1: "Paires Forex Majeures", sig_feat2: "Or & Indices", sig_feat3: "Risque:Récompense 1:3 Min",
            sig_brief: "Briefing Audio du Jour", sig_brief_desc: "Perspectives de marché quotidiennes.",
            stats_section_title: "Activité",
            stat_visits: "Visites Mensuelles", stat_views: "Vues Produits", stat_purchases: "Achats de Bots", stat_profit: "Profit Généré",
            services_section_title: "Services Offerts",
            serv_custom: "Dév. de Bots Personnalisés", serv_algo: "Stratégie Algorithmique", serv_opt: "Optimisation Système", serv_ment: "Mentorat Technique",
            serv_other_label: "Autres Services", serv_select: "Choisir un service...",
            pay_title: "Paiements Sécurisés",
            about_title: "À propos du Développeur", about_role: "Dév. Trading Algorithmique Senior",
            about_bio_title: "Bio", about_bio_text: "\"Pionnier des systèmes de trading de nouvelle génération démocratisant les outils institutionnels.\"",
            about_arsenal_title: "Arsenal Technique", about_exp_title: "Expérience Pro",
            exp_role1: "Consultant Trading Algo", exp_desc1a: "Déploiement de 15+ algos (78% de réussite).", exp_desc1b: "Réduction de latence de 40%.",
            exp_role2: "Dév. MQL5 Senior", exp_desc2a: "Migration de MQL4 vers MQL5 pour 200+ clients.", exp_desc2b: "Frameworks de backtesting efficaces.",
            exp_role3: "Analyste Systèmes",
            contact_title: "Contactez-nous",
            form_name: "Votre Nom", form_email: "Votre Email", form_msg: "Votre Message", form_send: "Envoyer",
            follow_us: "Suivez-nous :",
            rights_reserved: "Tous droits réservés.",
            // Admin Panel
            adm_dashboard_title: "Tableau de Bord", adm_dashboard_desc: "Gérer le contenu et les paramètres",
            adm_exit_btn: "Quitter", adm_enter_pass: "Mot de passe Développeur", adm_pass_placeholder: "Mot de passe",
            adm_login_btn: "Connexion", adm_error_pass: "Mot de passe incorrect",
            adm_tab_general: "Général", adm_tab_appearance: "Apparence", adm_tab_content: "Contenu",
            adm_vis_title: "Visibilité des Sections", adm_vis_bots: "Bots MT5", adm_vis_signals: "Signaux", adm_vis_services: "Services", adm_vis_about: "À Propos",
            adm_social_title: "Réseaux Sociaux", adm_wallet_title: "Wallets (Paiement)", adm_save_all: "Enregistrer Tout",
            adm_app_title_label: "Titre du Site", adm_app_color_label: "Couleur Primaire", adm_app_radius_label: "Style d'Angles",
            adm_app_meta_label: "Description SEO", adm_app_profile_label: "Photo de Profil", adm_app_upload_btn: "Télécharger Photo",
            adm_txt_hero_label: "Titre Hero", adm_txt_hero_desc_label: "Description Hero", adm_txt_about_label: "Bio",
            adm_txt_ticker_label: "Messages du Ticker", adm_txt_ticker_desc: "Un message par ligne.",
            adm_prod_manage_title: "Gérer les Produits", adm_prod_refresh: "Rafraîchir", adm_prod_add_title: "Nouveau Produit",
            adm_prod_title_placeholder: "Titre", adm_prod_price_placeholder: "Prix ($)", adm_prod_img_btn: "Image",
            adm_prod_desc_placeholder: "Description Courte", adm_file_label: "Fichier de Téléchargement",
            adm_file_btn: "Choisir Fichier", adm_file_remove: "Supprimer", adm_file_none: "Aucun fichier",
            adm_prod_add_btn: "+ Ajouter",
            adm_prod_type_free: "Produit Gratuit ?",
            download_free_btn: "Téléchargement Gratuit",
            adm_prod_free_label: "GRATUIT",
            buy_btn: "Acheter"
        },
        zh: {
            nav_home: "首页", nav_bots: "MT5 机器人", nav_signals: "信号", nav_services: "服务", nav_about: "关于", nav_contact: "联系",
            site_title: "轻松交易",
            hero_title: "精准交易。<span style='color: var(--primary-color);'>自动化。</span>",
            hero_subtitle: "\"致力于自动化交易解决方案的平台，将复杂的市场分析转化为精确且有利可图的算法。\"",
            hero_btn_view: "查看机器人", hero_btn_consult: "获取咨询",
            stat_success: "成功率", stat_traders: "活跃交易者", stat_algos: "专有算法",
            latest_offer_title: "最新优惠：", latest_offer_text: "本周 Momentum Hunter 2.0 享 20% 折扣！",
            bots_section_title: "高级 MT5 机器人",
            signals_title: "每日交易信号",
            sig_prec: "高精度入场", sig_prec_desc: "直接获取实时入场和出场点。",
            sig_feat1: "主要外汇对", sig_feat2: "黄金与指数", sig_feat3: "风险回报比 1:3",
            sig_brief: "今日音频简报", sig_brief_desc: "每日市场展望及关键水平。",
            stats_section_title: "平台活动",
            stat_visits: "月访问量", stat_views: "产品浏览", stat_purchases: "机器人购买", stat_profit: "客户获利",
            services_section_title: "提供的服务",
            serv_custom: "定制机器人开发", serv_algo: "算法策略设计", serv_opt: "系统优化", serv_ment: "技术指导",
            serv_other_label: "其他专业服务", serv_select: "选择服务...",
            pay_title: "安全支付",
            about_title: "关于开发者", about_role: "高级算法交易开发者",
            about_bio_title: "简介", about_bio_text: "\"致力于开创下一代算法交易系统，普及机构级交易工具。\"",
            about_arsenal_title: "技术库", about_exp_title: "职业经验",
            exp_role1: "算法交易顾问", exp_desc1a: "部署了 15+ 专有算法（78% 成功率）。", exp_desc1b: "通过架构优化减少了 40% 的延迟。",
            exp_role2: "高级 MQL5 开发者", exp_desc2a: "主导 200+ 客户从 MQL4 迁移至 MQL5。", exp_desc2b: "实施了高效的回测框架。",
            exp_role3: "交易系统分析师",
            contact_title: "联系我们",
            form_name: "您的姓名", form_email: "您的邮箱", form_msg: "您的留言", form_send: "发送留言",
            follow_us: "关注我们：",
            rights_reserved: "版权所有。",
            // Admin Panel
            adm_dashboard_title: "管理员面板", adm_dashboard_desc: "管理网站内容和设置",
            adm_exit_btn: "退出", adm_enter_pass: "请输入开发者密码", adm_pass_placeholder: "密码",
            adm_login_btn: "登录", adm_error_pass: "密码错误",
            adm_tab_general: "常规", adm_tab_appearance: "外观", adm_tab_content: "内容",
            adm_vis_title: "板块可见性", adm_vis_bots: "MT5 机器人", adm_vis_signals: "信号", adm_vis_services: "服务", adm_vis_about: "关于我",
            adm_social_title: "社交链接", adm_wallet_title: "支付钱包", adm_save_all: "保存所有更改",
            adm_app_title_label: "网站标题", adm_app_color_label: "主题颜色", adm_app_radius_label: "圆角样式",
            adm_app_meta_label: "SEO 描述", adm_app_profile_label: "个人头像", adm_app_upload_btn: "上传新照片",
            adm_txt_hero_label: "海报标题", adm_txt_hero_desc_label: "海报描述", adm_txt_about_label: "个人简介",
            adm_txt_ticker_label: "新闻滚动消息", adm_txt_ticker_desc: "每行输入一条消息。",
            adm_prod_manage_title: "管理产品", adm_prod_refresh: "刷新列表", adm_prod_add_title: "添加新产品",
            adm_prod_title_placeholder: "产品标题", adm_prod_price_placeholder: "价格 ($)", adm_prod_img_btn: "选择图片",
            adm_prod_desc_placeholder: "简短描述", adm_file_label: "产品下载文件",
            adm_file_btn: "选择文件", adm_file_remove: "删除文件", adm_file_none: "未选择文件",
            adm_prod_add_btn: "+ 添加产品",
            adm_prod_type_free: "免费产品？",
            download_free_btn: "免费下载",
            adm_prod_free_label: "免费",
            buy_btn: "购买"
        }
    };

    const langSelect = document.querySelector('.lang-select');

    // Function to apply overrides to all languages
    function applyOverrides() {
        const currentCfg = getLatestConfig();
        if (currentCfg && currentCfg.textOverrides) {
            Object.keys(translations).forEach(lang => {
                const txt = currentCfg.textOverrides;
                if (txt.hero_title) translations[lang].hero_title = txt.hero_title;
                if (txt.hero_desc) translations[lang].hero_subtitle = txt.hero_desc;
                if (txt.about_bio) translations[lang].about_bio_text = txt.about_bio;

                // New Section Overrides
                if (txt.bots_title) translations[lang].bots_section_title = txt.bots_title;
                if (txt.signals_title) translations[lang].signals_title = txt.signals_title;
                if (txt.services_title) translations[lang].services_section_title = txt.services_title;
                if (txt.stats_title) translations[lang].stats_section_title = txt.stats_title;
                if (txt.pay_title) translations[lang].pay_title = txt.pay_title;
                if (txt.contact_title) translations[lang].contact_title = txt.contact_title;

                // Deep Detail Overrides
                if (txt.nav_home) translations[lang].nav_home = txt.nav_home;
                if (txt.nav_bots) translations[lang].nav_bots = txt.nav_bots;
                if (txt.nav_signals) translations[lang].nav_signals = txt.nav_signals;
                if (txt.nav_services) translations[lang].nav_services = txt.nav_services;
                if (txt.nav_about) translations[lang].nav_about = txt.nav_about;
                if (txt.nav_contact) translations[lang].nav_contact = txt.nav_contact;

                if (txt.latest_offer_text) translations[lang].latest_offer_text = txt.latest_offer_text;
                if (txt.about_role) translations[lang].about_role = txt.about_role;
                if (txt.serv_badge_1) translations[lang].serv_custom = txt.serv_badge_1;

                if (txt.sig_feat1) translations[lang].sig_feat1 = txt.sig_feat1;
                if (txt.sig_feat2) translations[lang].sig_feat2 = txt.sig_feat2;
                if (txt.sig_feat3) translations[lang].sig_feat3 = txt.sig_feat3;
                if (txt.stat_success) translations[lang].stat_success = txt.stat_success;
            });
        }

        // Appearance overrides (Title especially)
        if (currentCfg && currentCfg.appearance && currentCfg.appearance.siteTitle) {
            Object.keys(translations).forEach(lang => {
                translations[lang].site_title = currentCfg.appearance.siteTitle;
            });
        }
    }

    // Function to update content
    function updateLanguage(lang) {
        applyOverrides(); // Always refresh overrides before switching
        if (!translations[lang]) return;

        // Direction & Lang Attribute
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.lang = lang;

        const elements = document.querySelectorAll('[data-i18n], [data-i18n-placeholder]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const phKey = el.getAttribute('data-i18n-placeholder');

            if (key && translations[lang][key]) {
                let text = translations[lang][key];
                if (text.includes('<')) el.innerHTML = text;
                else el.textContent = text;
            }

            if (phKey && translations[lang][phKey]) {
                el.placeholder = translations[lang][phKey];
            }
        });

        // RE-APPLY ADMIN OVERRIDES (COLORS & TEXTS)
        if (typeof applySiteSettings === 'function') {
            applySiteSettings();
        }

        // Trigger product re-render
        const productContainer = document.getElementById('bots-grid-container');
        if (productContainer) {
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
        }

        // Save preference
        localStorage.setItem('language', lang);
    }

    if (langSelect) {
        langSelect.addEventListener('change', (e) => updateLanguage(e.target.value));
        const savedLang = localStorage.getItem('language') || 'en';
        langSelect.value = savedLang;
        updateLanguage(savedLang);
    }
});
