import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Languages from '../constants/languages';
import translationEn from './locales/translationEn.json';
import translationRu from './locales/translationRu.json';

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: translationRu },
    en: { translation: translationEn }
  },
  lng: Languages.ru,
  fallbackLng: Languages.ru,
  interpolation: { escapeValue: false }
});

export default i18n;
