import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primary: {
          light: "#3fbaeb",
          DEFAULT: "#0fa9e6",
          dark: "#0c87b8",
        },
        secondary: {
          light: "#ff7ce5",
          DEFAULT: "#ff49db",
          dark: "#ff16d1",
        },
        accent: {
          light: "#a2bffa",
          DEFAULT: "#596eff",
          dark: "#4952cc",
        },
        info: {
          light: "#3abff8",
          DEFAULT: "#2094f3",
          dark: "#0c87b8",
        },
        success: {
          light: "#13ce66",
          DEFAULT: "#12b76a",
          dark: "#0ca858",
        },
        warning: {
          light: "#ffc82c",
          DEFAULT: "#ffab00",
          dark: "#ca8800",
        },
        danger: {
          light: "#ff4949",
          DEFAULT: "#ff5724",
          dark: "#e0301e",
        },
      },
    },
  },

  plugins: [require("@tailwindcss/typography")],
} as Config;
