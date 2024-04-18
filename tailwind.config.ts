import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.tsx"],
  plugins: [forms],
};

export default config;
