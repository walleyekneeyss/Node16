import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  extract: {
    include: ['**/*.{ts,tsx,jsx,js,css,html}'],
    exclude: ['node_modules', '.git', '.next'],
  },
});
