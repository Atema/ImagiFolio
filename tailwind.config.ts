import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.tsx"],
  plugins: [forms],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1500px",
    },
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },
    },
  },
};

export default config;
