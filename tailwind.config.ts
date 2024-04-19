import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.tsx"],
  plugins: [forms],
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },
      animation: {
        shake: "shake 0.2s ease-in-out 0s 2",
      },
      keyframes: {
        shake: {
          "0%": {
            transform: "translate(0rem, 0)",
          },
          "25%": {
            transform: "translate(0.5rem, 0)",
          },
          "75%": {
            transform: "translate(-0.5rem, 0)",
          },
          "100%": {
            transform: "translate(0rem, 0)",
          },
        },
      },
    },
  },
};

export default config;
