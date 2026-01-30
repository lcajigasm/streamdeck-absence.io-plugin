/**
 * Sistema de internacionalización para Property Inspector
 */

class I18n {
    constructor() {
        this.translations = {};
        this.currentLanguage = 'en';
    }
    
    async init(language = 'en') {
        this.currentLanguage = language;
        try {
            console.log(`[i18n] Cargando traducciones para: ${language}`);
            const response = await fetch(`${language}.json`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('[i18n] Datos cargados:', data);
            
            // Si las traducciones están dentro de "Localization", usar ese objeto
            if (data.Localization) {
                this.translations = data.Localization;
                console.log('[i18n] Usando traducciones de Localization');
            } else {
                this.translations = data;
                console.log('[i18n] Usando traducciones de raíz');
            }
            
            console.log('[i18n] Traducciones cargadas exitosamente');
        } catch (error) {
            console.error(`[i18n] Error loading translations for ${language}:`, error);
            // Fallback a inglés si falla
            if (language !== 'en') {
                try {
                    console.log('[i18n] Intentando fallback a inglés...');
                    const fallbackResponse = await fetch('en.json');
                    const fallbackData = await fallbackResponse.json();
                    this.translations = fallbackData.Localization || fallbackData;
                    console.log('[i18n] Fallback a inglés exitoso');
                } catch (fallbackError) {
                    console.error('[i18n] Error en fallback:', fallbackError);
                    this.translations = {};
                }
            }
        }
    }
    
    t(key) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`[i18n] Traducción no encontrada para: ${key}`);
                return key; // Devolver la clave si no se encuentra
            }
        }
        
        console.log(`[i18n] Traducción encontrada para ${key}:`, value);
        return value;
    }
    
    translatePage() {
        console.log('[i18n] Iniciando traducción de la página...');
        
        // Traducir elementos con data-i18n
        const elementsWithI18n = document.querySelectorAll('[data-i18n]');
        console.log(`[i18n] Elementos con data-i18n: ${elementsWithI18n.length}`);
        
        elementsWithI18n.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Traducir placeholders con data-i18n-placeholder
        const elementsWithPlaceholder = document.querySelectorAll('[data-i18n-placeholder]');
        console.log(`[i18n] Elementos con data-i18n-placeholder: ${elementsWithPlaceholder.length}`);
        
        elementsWithPlaceholder.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });
        
        // Traducir títulos con data-i18n-title
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });
        
        console.log('[i18n] Traducción de página completada');
    }
}

// Crear instancia global
const i18n = new I18n();
