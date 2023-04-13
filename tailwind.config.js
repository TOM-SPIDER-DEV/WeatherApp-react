/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#1C2128",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(152.19deg, rgba(136, 235, 239, 0.9) -0.04%, rgba(83, 91, 230, 0.9) 100%)",
      },
      screens: {
        lg: { min: "1024px" },
        md: { max: "1023px" },
      },
    },
  },
  plugins: [],
  "tailwindCSS.emmetCompletions": true,
  "tailwindCSS.lint.cssConflict": "error",
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSaveMode": "modifications",
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSaveMode": "modifications",
  },
};
