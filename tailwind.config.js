/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#1C2128",
        red: "red",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(152.19deg, rgba(136, 235, 239, 0.9) -0.04%, rgba(83, 91, 230, 0.9) 100%)",
      },
      screens: {
        lg: { min: "1024px" },
        md: { max: "1023px" },
        sm: { max: "650px" },
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
