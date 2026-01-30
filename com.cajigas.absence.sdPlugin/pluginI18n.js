/**
 * Sistema de internacionalización para el plugin (Node.js)
 */

const fs = require('fs');
const path = require('path');

class PluginI18n {
    constructor() {
        this.translations = {};
        this.currentLanguage = 'en';
        this.fallbackLanguage = 'en';
    }
    
    init(language = 'en') {
        this.currentLanguage = language;
        
        try {
            const translationPath = path.join(__dirname, `${language}.json`);
            const data = fs.readFileSync(translationPath, 'utf8');
            this.translations = JSON.parse(data);
        } catch (error) {
            console.error(`Error loading translations for ${language}:`, error);
            
            // Fallback a inglés si falla
            if (language !== this.fallbackLanguage) {
                try {
                    const fallbackPath = path.join(__dirname, `${this.fallbackLanguage}.json`);
                    const data = fs.readFileSync(fallbackPath, 'utf8');
                    this.translations = JSON.parse(data);
                    this.currentLanguage = this.fallbackLanguage;
                } catch (fallbackError) {
                    console.error('Error loading fallback translations:', fallbackError);
                    this.translations = {};
                }
            }
        }
    }
    
    t(key, defaultValue = '') {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return defaultValue || key;
            }
        }
        
        return value;
    }
    
    getMessage(key) {
        return this.t(`Messages.${key}`, key);
    }
}

module.exports = PluginI18n;
