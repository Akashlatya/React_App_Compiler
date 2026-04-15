import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
    en: {
        translation: {
            "welcome_message": "Code To Decode Your Life",
            "compiler_title": "{{lang}} Compiler",
            "dsa_compiler_title": "DSA Compiler",
            "terminal_title": "Terminal",
            "reset": "Reset",
            "code_tab": "Code",
            "output_tab": "Output",
            "about_us": "About Us",
            "projects": "Projects",
            "contact": "Contact",
            "coming_soon": "Coming Soon...",
            "home_title": "Master Programming",
            "home_subtitle": "Write, compile, and run code instantly in multiple languages. The best place to start your coding journey.",
            "code_empty_warning": "⚠️ Code is empty.",
            "code_empty_desc": "Please write some code before running.",
            "executing": "Executing...",
            "languages": {
                "java": "Java",
                "cpp": "C++",
                "python": "Python",
                "c": "C"
            }
        }
    },
    de: {
        translation: {
            "welcome_message": "Code zum Entschlüsseln deines Lebens",
            "compiler_title": "{{lang}} Compiler",
            "dsa_compiler_title": "DSA Compiler",
            "terminal_title": "Terminal",
            "reset": "Zurücksetzen",
            "code_tab": "Code",
            "output_tab": "Ausgabe",
            "about_us": "Über uns",
            "projects": "Projekte",
            "contact": "Kontakt",
            "coming_soon": "Kommt bald...",
            "home_title": "Meistere das Programmieren",
            "home_subtitle": "Schreibe, kompiliere und führe Code sofort in mehreren Sprachen aus. Der beste Ort, um deine Programmier reise zu beginnen.",
            "code_empty_warning": "⚠️ Code ist leer.",
            "code_empty_desc": "Bitte schreibe etwas Code bevor du ausführst.",
            "executing": "Ausführen...",
            "languages": {
                "java": "Java",
                "cpp": "C++",
                "python": "Python",
                "c": "C"
            }
        }
    },
    zh: {
        translation: {
            "welcome_message": "代码解码你的人生",
            "compiler_title": "{{lang}} 编译器",
            "dsa_compiler_title": "DSA 编译器",
            "terminal_title": "终端",
            "reset": "重置",
            "code_tab": "代码",
            "output_tab": "输出",
            "about_us": "关于我们",
            "projects": "项目",
            "contact": "联系方式",
            "coming_soon": "即将推出...",
            "home_title": "精通编程",
            "home_subtitle": "即时编写、编译和运行多语言代码。开启编程之旅的最佳起点。",
            "code_empty_warning": "⚠️ 代码为空。",
            "code_empty_desc": "请在运行前编写一些代码。",
            "executing": "执行中...",
            "languages": {
                "java": "Java",
                "cpp": "C++",
                "python": "Python",
                "c": "C"
            }
        }
    },
    es: {
        translation: {
            "welcome_message": "Código para decodificar tu vida",
            "compiler_title": "Compilador {{lang}}",
            "dsa_compiler_title": "Compilador DSA",
            "terminal_title": "Terminal",
            "reset": "Reiniciar",
            "code_tab": "Código",
            "output_tab": "Salida",
            "about_us": "Sobre nosotros",
            "projects": "Proyectos",
            "contact": "Contacto",
            "coming_soon": "Próximamente...",
            "home_title": "Domina la Programación",
            "home_subtitle": "Escribe, compila y ejecuta código al instante en múltiples lenguajes. El mejor lugar para comenzar tu viaje de programación.",
            "code_empty_warning": "⚠️ El código está vacío.",
            "code_empty_desc": "Por favor escribe algo de código antes de ejecutar.",
            "executing": "Ejecutando...",
            "languages": {
                "java": "Java",
                "cpp": "C++",
                "python": "Python",
                "c": "C"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        detection: {
            // Prioritize standard browser detection first
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        },
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

// Optional: Enhance with IP-based detection (Fire-and-forget)
// This will override the browser setting if a match is found based on country
const savedLang = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null;

// Only fetch if we don't have a saved language preference (or if it's the default/fallback)
// And defer it to avoid blocking initial load (LCP)
if (!savedLang || savedLang === 'en') {
    setTimeout(() => {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                const country = data.country_code; // e.g., 'DE', 'CN', 'ES'
                let lang = null;

                if (country === 'DE') lang = 'de';
                else if (country === 'CN') lang = 'zh';
                // Map common Spanish speaking countries
                else if (['ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY'].includes(country)) lang = 'es';

                // Only switch if we found a supported language and it's different from current
                if (lang && lang !== i18n.language) {
                    // console.log(`Detected location: ${country}, switching to ${lang}`);
                    i18n.changeLanguage(lang);
                }
            })
            .catch(() => {
                // Silently fail to default (English)
            });
    }, 2000); // Delay by 2s to allow LCP to finish first
}

export default i18n;
