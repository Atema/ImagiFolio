import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";
import radixColors from "tailwindcss-radix-colors";

const config: Config = {
  content: ["./src/**/*.tsx"],
  plugins: [forms, radixColors],
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
