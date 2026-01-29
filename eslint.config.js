import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: ["node_modules/**", ".next/**", "dist/**", "public/**", "**/*.css.ts"],
  },
  ...nextCoreWebVitals,
];

export default config;
