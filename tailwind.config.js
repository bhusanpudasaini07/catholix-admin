/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1450px",
        smallLaptop: "1280px",
        tablet: "1024px",
        mw1024: {
          raw: "screen and (max-width: 1024px)",
        },
        mw991: {
          raw: "screen and (max-width: 991px)",
        },
        mw768: {
          raw: "screen and (max-width: 768px)",
        },
        mw375: {
          raw: "screen and (max-width: 375px)",
        },
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        primary40: {
          DEFAULT: "var(--primary-50)",
          foreground: "var(--primary-50-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        info: {
          DEFAULT: "var(--info)",
          foreground: "var(--info-foreground)",
          text: "var(--info-text)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
          text: "var(--warning-text)",
          muted: "var(--warning-muted)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        white: {
          DEFAULT: "var(--white)",
          // foreground: "var(--white-foreground)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          // foreground: "var(--white-foreground)",
        },
        color: {
          DEFAULT: "var(--color)",
          // foreground: "var(--white-foreground)",
        },
        separator: {
          DEFAULT: "var(--separator)",
          // foreground: "var(--white-foreground)",
        },

        purple: {
          50: "#4834D4",
          60: "#5947B3",
          70: "#EEEDF7",
          80: "#9F94D3",
          90: "#170C6B",
        },
        gray: {
          150: "#64748B",
          250: "#ECECEC",
          260: "#84919A",
          270: "#B8BFC4",
          280: "#F6F8F9",
          290: "#919EAB",
        },
        green: {
          150: "#48BB78",
          250: "#349D62",
          350: "#349D62",
        },
        red: {
          150: "#E94774",
          250: "#E42158",
        },
        dashboard: {
          50: "rgba(254, 171, 95, 0.20)",
          60: "rgba(218, 61, 205, 0.20)",
          70: "rgba(97, 73, 204, 0.20)",
          80: "rgba(49, 106, 217, 0.20)",
          90: "rgba(108, 182, 51, 0.20)",
        },
        dark: {
          55: "#1D212F",
        },
        light: {
          white: "#FEFEFE",
        },
        blue: {
          50: "#E6F2FF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
