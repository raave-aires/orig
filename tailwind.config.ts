import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                cor_de_fundo: "#303030",
                f_inputs: "#27272a",
                b_inputs: "#3f3f46"
            },

            backgroundImage: {
                'brotos': "url('/assets/imgs/brotos.jpg')",
              }
        },
    },
    darkMode: "class",
    plugins: [
        nextui()
    ]
};

export default config;
