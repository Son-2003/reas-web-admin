import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '@/utils/i18n/key/en.json';
import viTranslation from '@/utils/i18n/key/vi.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  vi: {
    translation: viTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // current language
  fallbackLng: 'vi', // use vi if detected lng is not available
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
