/** @type {import('@ianvs/prettier-plugin-sort-imports').PrettierConfig} */
const config = {
  endOfLine: "lf",
  semi: false,
  tabWidth: 2,
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^~/types/(.*)$",
    "^~/config/(.*)$",
    "^~/lib/(.*)$",
    "^~/hooks/(.*)$",
    "^~/components/ui/(.*)$",
    "^~/components/(.*)$",
    "^~/styles/(.*)$",
    "^~/app/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.1.6",
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
}

export default config;
