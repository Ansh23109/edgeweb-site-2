import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: ['content/**', '.next/**', 'node_modules/**'],
  },
  {
    rules: {
      // Internal nav intentionally uses plain <a> tags (full page loads),
      // matching the original static site and avoiding the vanilla chrome
      // scripts (preloader/cursor/discovery-modal) double-registering
      // global listeners across next/link client-side transitions — see
      // README "How the migration is built".
      '@next/next/no-html-link-for-pages': 'off',
      // False positive on App Router: this rule predates app/layout.js and
      // still assumes fonts belong in pages/_document.js.
      '@next/next/no-page-custom-font': 'off',
    },
  },
];

export default eslintConfig;
