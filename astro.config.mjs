import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nfenglish.com.br',

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en', 'ru'],
    routing: {
      prefixDefaultLocale: false
    }
  },

  integrations: [sitemap()]
});