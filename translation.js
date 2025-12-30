// translations.js - Ghana Store 多语言系统
const translations = {
    en: {
        navHome: "Home",
        navAbout: "About",
        navBusiness: "Business",
        navProducts: "Products",
        navCustomization: "Customization",
        navContact: "Contact",
        navPayment: "Payment Guide",
        langLabel: "Language:",
        footerRights: "© 2023 Ghana Store.",
        footerPayments: "Payments: MTN | Vodafone Cash | Bank Transfer"
    },
    fr: {
        navHome: "Accueil",
        navAbout: "À propos",
        navBusiness: "Activités",
        navProducts: "Produits",
        navCustomization: "Personnalisation",
        navContact: "Contact",
        navPayment: "Guide de Paiement",
        langLabel: "Langue:",
        footerRights: "© 2023 Ghana Store.",
        footerPayments: "Paiements: MTN | Vodafone Cash | Virement"
    },
    tw: {
        navHome: "Fie",
        navAbout: "About",
        navBusiness: "Business",
        navProducts: "Products",
        navCustomization: "Customization",
        navContact: "Contact",
        navPayment: "Payment Guide",
        langLabel: "Kasa:",
        footerRights: "© 2023 Ghana Store.",
        footerPayments: "Payments: MTN | Vodafone Cash | Bank Transfer"
    },
    zh: {
        navHome: "首页",
        navAbout: "关于我们",
        navBusiness: "业务概览",
        navProducts: "产品分类",
        navCustomization: "定制服务",
        navContact: "联系方式",
        navPayment: "支付指南",
        langLabel: "语言:",
        footerRights: "© 2023 加纳商城",
        footerPayments: "支持: MTN | Vodafone Cash | 银行转账"
    }
};

function changeLanguage(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector('.lang-btn[data-lang="' + lang + '"]');
    if (activeBtn) activeBtn.classList.add('active');
    localStorage.setItem('ghana-store-lang', lang);
}

document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('ghana-store-lang') || 'en';
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            changeLanguage(this.getAttribute('data-lang'));
        });
    });
    changeLanguage(savedLang);
});