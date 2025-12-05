import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // ⭐ ONLY YOUR BRAND COLORS
      colors: {
        brand: {
          peach: "#F8B195",
          coral: "#F67280",
          mauve: "#C06C84",
          purple: "#6C5B7B",
          navy: "#355C7D",
        },
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.8s ease-out",
        "pulse-slow": "pulse-slow 2s infinite",
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],

} satisfies Config;
