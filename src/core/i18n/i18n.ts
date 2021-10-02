import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import languages from '../constants/languages';
import translationEn from './locales/translationEn.json';
import translationRu from './locales/translationRu.json';

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: translationRu },
    en: { translation: translationEn }
  },
  lng: languages.ru,
  fallbackLng: languages.ru,
  interpolation: { escapeValue: false }
});

export default i18n;
