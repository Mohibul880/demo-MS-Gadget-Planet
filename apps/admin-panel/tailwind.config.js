import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: { colors: { brand: "#2411a8" } } },
  plugins: [daisyui],
  daisyui: { themes: ["light", "dark"] }
};
