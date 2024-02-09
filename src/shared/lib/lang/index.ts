import { createI18n } from 'vue-i18n';
import ru from '@/shared/lib/lang/ru.json';

const i18n = createI18n({
  seo: true,
  legacy: false,
  locale: 'ru',
  globalInjection: true,
  fallbackLocale: 'en',
  messages: {
    ru
  },
});

export default i18n;