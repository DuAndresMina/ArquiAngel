import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js';

const CAT_NECESSARY = "necessary";
const CAT_ANALYTICS = "analytics";
const CAT_ADVERTISEMENT = "advertisement";
const CAT_FUNCTIONALITY = "functionality";
const CAT_SECURITY = "security";

const SERVICE_AD_STORAGE = 'ad_storage'
const SERVICE_AD_USER_DATA = 'ad_user_data'
const SERVICE_AD_PERSONALIZATION = 'ad_personalization'
const SERVICE_ANALYTICS_STORAGE = 'analytics_storage'
const SERVICE_FUNCTIONALITY_STORAGE = 'functionality_storage'
const SERVICE_PERSONALIZATION_STORAGE = 'personalization_storage'
const SERVICE_SECURITY_STORAGE = 'security_storage'

// Define dataLayer and the gtag function.
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Set default consent to 'denied' (this should happen before changing any other dataLayer)
gtag('consent', 'default', {
    [SERVICE_AD_STORAGE]: 'denied',
    [SERVICE_AD_USER_DATA]: 'denied',
    [SERVICE_AD_PERSONALIZATION]: 'denied',
    [SERVICE_ANALYTICS_STORAGE]: 'denied',
    [SERVICE_FUNCTIONALITY_STORAGE]: 'denied',
    [SERVICE_PERSONALIZATION_STORAGE]: 'denied',
    [SERVICE_SECURITY_STORAGE]: 'denied',
});

/** 
 * Update gtag consent according to the users choices made in CookieConsent UI
 */
function updateGtagConsent() {
    gtag('consent', 'update', {
        [SERVICE_ANALYTICS_STORAGE]: CookieConsent.acceptedService(SERVICE_ANALYTICS_STORAGE, CAT_ANALYTICS) ? 'granted' : 'denied',
        [SERVICE_AD_STORAGE]: CookieConsent.acceptedService(SERVICE_AD_STORAGE, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        [SERVICE_AD_USER_DATA]: CookieConsent.acceptedService(SERVICE_AD_USER_DATA, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        [SERVICE_AD_PERSONALIZATION]: CookieConsent.acceptedService(SERVICE_AD_PERSONALIZATION, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
        [SERVICE_FUNCTIONALITY_STORAGE]: CookieConsent.acceptedService(SERVICE_FUNCTIONALITY_STORAGE, CAT_FUNCTIONALITY) ? 'granted' : 'denied',
        [SERVICE_PERSONALIZATION_STORAGE]: CookieConsent.acceptedService(SERVICE_PERSONALIZATION_STORAGE, CAT_FUNCTIONALITY) ? 'granted' : 'denied',
        [SERVICE_SECURITY_STORAGE]: CookieConsent.acceptedService(SERVICE_SECURITY_STORAGE, CAT_SECURITY) ? 'granted' : 'denied',
    });
}

// Enable dark mode
document.documentElement.classList.add('cc--light-funky');

// Add custom CSS
const style = document.createElement('style');
style.textContent = `
.cc--light-funky {
    color-scheme: light;

    --cc-bg: #f9faff;
    --cc-primary-color: #F27405;
    --cc-secondary-color: #262223;

    --cc-btn-primary-bg: #F27405;
    --cc-btn-primary-color: var(--cc-bg);
    --cc-btn-primary-hover-bg:rgb(158, 76, 4);
    --cc-btn-primary-hover-color: #fff;

    --cc-btn-secondary-bg: #dfe7f9;
    --cc-btn-secondary-color: var(--cc-secondary-color);
    --cc-btn-secondary-hover-bg: #c6d1ea;
    --cc-btn-secondary-hover-color: #000;

    --cc-cookie-category-block-bg: #ebeff9;
    --cc-cookie-category-block-border: #ebeff9;
    --cc-cookie-category-block-hover-bg: #dbe5f9;
    --cc-cookie-category-block-hover-border: #dbe5f9;
    --cc-cookie-category-expanded-block-hover-bg: #ebeff9;
    --cc-cookie-category-expanded-block-bg: #ebeff9;

    --cc-overlay-bg: rgba(219, 232, 255, 0.85)!important;

    --cc-toggle-readonly-bg: #cbd8f1;
    --cc-toggle-on-knob-bg: var(--cc-bg);
    --cc-toggle-off-bg: #8fa8d6;
    --cc-toggle-readonly-knob-bg: var(--cc-bg);

    --cc-separator-border-color: #f1f3f5;

    --cc-footer-border-color: #f1f3f5;
    --cc-footer-bg: var(--cc-bg);

`;
document.head.appendChild(style);

CookieConsent.run({

    // Trigger consent update when user choices change
    onFirstConsent: () => {
        updateGtagConsent();
    },
    onConsent: () => {
        updateGtagConsent();
    },
    onChange: () => {
        updateGtagConsent();
    },

    guiOptions: {
        consentModal: {
            layout: "cloud",
            position: "middle center",
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: "box",
            position: "right",
            equalWeightButtons: true,
            flipButtons: false
        }
    },
    categories: {
        [CAT_NECESSARY]: {
            enabled: true,  // this category is enabled by default
            readOnly: true,  // this category cannot be disabled
        },
        [CAT_ANALYTICS]: {
            autoClear: {
                cookies: [
                    {
                        name: /^_ga/,   // regex: match all cookies starting with '_ga'
                    },
                    {
                        name: '_gid',   // string: exact cookie name
                    }
                ]
            },
            // See: https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
            services: {
                [SERVICE_ANALYTICS_STORAGE]: {
                    label: 'Habilita el almacenamiento (como cookies) relacionado con análisis, por ejemplo, duración de la visita.',
                }
            }
        },
        [CAT_ADVERTISEMENT]: {
            services: {
                [SERVICE_AD_STORAGE]: {
                    label: 'Habilita el almacenamiento (como cookies) relacionado con publicidad.',
                },
                [SERVICE_AD_USER_DATA]: {
                    label: 'Establece el consentimiento para enviar datos de usuario relacionados con publicidad a Google.',
                },
                [SERVICE_AD_PERSONALIZATION]: {
                    label: 'Establece el consentimiento para publicidad personalizada.',
                },
            }
        },
        [CAT_FUNCTIONALITY]: {
            services: {
                [SERVICE_FUNCTIONALITY_STORAGE]: {
                    label: 'Habilita el almacenamiento que soporta la funcionalidad del sitio web o la aplicación, por ejemplo, configuraciones de idioma.',
                },
                [SERVICE_PERSONALIZATION_STORAGE]: {
                    label: 'Habilita el almacenamiento relacionado con la personalización, por ejemplo, recomendaciones de videos.',
                },
            }
        },
        [CAT_SECURITY]: {
            services: {
                [SERVICE_SECURITY_STORAGE]: {
                    label: 'Habilita el almacenamiento relacionado con la seguridad, como la autenticación de usuarios, la prevención de fraudes y otras protecciones para el usuario.',
                },
            }
        }
    },
    language: {
        default: 'es',
        translations: {
            es: {
                // See: https://support.google.com/tagmanager/answer/10718549?hl=en
                consentModal: {
                    title: 'Usamos cookies',
                    description: 'Este sitio web utiliza cookies esenciales para garantizar su correcto funcionamiento y cookies de seguimiento para comprender cómo interactúas con él. Estas últimas se establecerán solo después de obtener tu consentimiento.',
                    acceptAllBtn: 'Aceptar todas',
                    acceptNecessaryBtn: 'Rechazar todas',
                    showPreferencesBtn: 'Administrar preferencias individuales',
                    footer: "<a href=\"https://www.acarquitectura.com.co/politica-privacidad\">Política de privacidad</a>\n<a href=\"https://www.acarquitectura.com.co/politica-cookies\">Politica de Cookies</a>"
                },
                preferencesModal: {
                    title: 'Administrar preferencias de cookies',
                    acceptAllBtn: 'Aceptar todas',
                    acceptNecessaryBtn: 'Rechazar todas',
                    savePreferencesBtn: 'Aceptar selección actual',
                    closeIconLabel: 'Cerrar modal',
                    sections: [
                        {
                            title: "Uso de cookies",
                            description: "Utilizamos cookies para garantizar las funcionalidades básicas del sitio web y para mejorar tu experiencia en línea."
                        },
                        {
                            title: "Cookies estrictamente necesarias",
                            description: "Estas cookies son esenciales para el correcto funcionamiento del sitio web.",
                            linkedCategory: CAT_NECESSARY,
                        },
                        {
                            title: "Analíticas",
                            description: 'Las cookies utilizadas para análisis ayudan a recopilar datos que permiten a los servicios comprender cómo interactúan los usuarios con un servicio en particular. Estos conocimientos permiten a los servicios mejorar el contenido y construir mejores funciones que mejoran la experiencia del usuario.',
                            linkedCategory: CAT_ANALYTICS,
                            cookieTable: {
                                headers: {
                                    name: "Nombre",
                                    domain: "Servicio",
                                    description: "Descripción",
                                    expiration: "Expiración"
                                },
                                body: [
                                    {
                                        name: "_ga",
                                        domain: "Google Analytics",
                                        description: "Cookie establecida por <a href=\"https://business.safety.google/adscookies/\">Google Analytics</a>",
                                        expiration: "Expira después de 2 años"
                                    },
                                    {
                                        name: "_gid",
                                        domain: "Google Analytics",
                                        description: "Cookie establecida por <a href=\"https://business.safety.google/adscookies/\">Google Analytics</a>",
                                        expiration: "Expira después de 24 horas"
                                    }
                                ]
                            }
                        },
                        {
                            title: 'Publicidad',
                            description: 'Google utiliza cookies para publicidad, incluyendo la entrega y renderización de anuncios, la personalización de anuncios (dependiendo de tu configuración de anuncios en <a href=\"https://g.co/adsettings\">g.co/adsettings</a>), limitando el número de veces que se muestra un anuncio a un usuario, silenciando anuncios que has elegido dejar de ver y midiendo la efectividad de los anuncios.',
                            linkedCategory: CAT_ADVERTISEMENT,
                        },
                        {
                            title: 'Funcionalidad',
                            description: 'Las cookies utilizadas para la funcionalidad permiten a los usuarios interactuar con un servicio o sitio para acceder a funciones que son fundamentales para ese servicio. Las cosas consideradas fundamentales para el servicio incluyen preferencias como la elección de idioma del usuario, optimizaciones de productos que ayudan a mantener y mejorar un servicio, y mantener información relacionada con la sesión de un usuario, como el contenido de un carrito de compras.',
                            linkedCategory: CAT_FUNCTIONALITY,
                        },
                        {
                            title: 'Seguridad',
                            description: 'Las cookies utilizadas para la seguridad autentican a los usuarios, previenen fraudes y protegen a los usuarios mientras interactúan con un servicio.',
                            linkedCategory: CAT_SECURITY,
                        },
                        {
                            title: 'Más información',
                            description: 'Para cualquier consulta relacionada con la política de cookies y tus elecciones, por favor <a href="https://www.acarquitectura.com.co/contact">contáctanos</a>.'
                        }
                    ]
                }
            }
        }
    }
});

