/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#a51d11",
        "primary-container": "#c83727",
        "on-primary": "#ffffff",
        "on-primary-container": "#ffebe8",
        "secondary": "#555f69",
        "secondary-container": "#d7e1ec",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#5a646e",
        "tertiary": "#505560",
        "background": "#f8f9fa",
        "surface": "#ffffff",
        "surface-container-low": "#f3f4f5",
        "surface-container": "#edeeef",
        "surface-container-high": "#e7e8e9",
        "surface-variant": "#e1e3e4",
        "on-surface": "#191c1d",
        "on-surface-variant": "#5a413c",
        "outline": "#8e706b",
        "outline-variant": "#e2beb9",
      },
      fontFamily: {
        serif: ["EB Garamond", "Garamond", "Georgia", "serif"],
        sans: ["Libre Franklin", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "container-max": "1200px",
      }
    },
  },
  plugins: [],
}
