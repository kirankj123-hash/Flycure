import type { Config } from "tailwindcss";
import { theme } from "./src/styles/theme";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Community Fruit Ordering ("fruit-*") palette — kept isolated from the
        // marketing site's blue/emerald scheme. See src/app/fruit/**.
        leaf: {
          50: '#eef6ee',
          100: '#d7ead9',
          300: '#84bd8b',
          500: '#3d8a47',
          600: '#2f6f38',
          700: '#25592c',
          800: '#1d461f',
        },
        guava: {
          50: '#fff1f0',
          100: '#ffe1de',
          300: '#ff9c92',
          500: '#f2574a',
          600: '#d94334',
          700: '#b03327',
        },
        cream: {
          DEFAULT: '#faf6ef',
          50: '#fdfbf7',
          100: '#faf6ef',
          200: '#f2ead9',
        },
        bark: {
          50: '#f6f1ec',
          300: '#c7ad95',
          500: '#8a6a4d',
          700: '#5c4732',
        },
        'fly-blue': '#4065B8',
        'fly-blue-hover': '#3859A3',
        'text-primary': '#111111',
        'text-secondary': '#333333',
        'surface': '#F6F7F9',
        'hairline': '#EDF0F5',
        primary: {
          DEFAULT: theme.colors.primary,
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: theme.colors.secondary,
          foreground: "hsl(var(--secondary-foreground))",
        },
        emerald: {
          400: theme.colors.primary, // Map emerald-400 to our primary color
          500: theme.colors.primary,
        },
        blue: {
          50: '#eff6ff', // For card background
          200: '#bfdbfe', // For dotted line
          300: '#93c5fd', // For pillar icons
          600: "#4065B8",
          700: "#3859A3", // Hover state for blue-600
          900: "#4065B8",
        },
        gray: {
          50: '#f9fafb', // For testimonial background
          500: theme.colors.text.light,
          600: theme.colors.text.secondary,
          700: theme.colors.text.primary,
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro', 'ui-sans-serif', 'system-ui'],
        heading: ['SF Pro', theme.typography.fontFamily.heading, "ui-sans-serif", "system-ui"],
      },
      fontSize: {
        ...theme.typography.fontSize,
        '6xl': ['64px', '76px'],
      },
      fontWeight: theme.typography.fontWeight,
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
        full: "9999px",
      },
      boxShadow: {
        'light': '0 2px 4px rgba(0,0,0,0.05)',
        'focus': '0 6px 18px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
} satisfies Config;

export default config;