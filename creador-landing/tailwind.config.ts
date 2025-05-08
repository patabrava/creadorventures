import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Exact colors from style guide
        'ink': '#000000',
        'paper': '#FFFFFF',
        'graphite-60': '#666666',
        'graphite-40': '#999999',
        'accent-lime': '#00FF55',
        'focus-ring-light': 'rgba(255,255,255,0.32)',
        'focus-ring-dark': 'rgba(0,0,0,0.32)',
      },
      spacing: {
        // Exact spacing from style guide
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '48px',
        'xxl': '72px',
        'xxxl': '160px',
      },
      fontSize: {
        // Exact font sizes from style guide
        'xs': '11px',
        'sm': '16px',
        'md': '18px',
        'lg': '40px',
        'xl': '48px',
        'xxl': '56px',
      },
      transitionTimingFunction: {
        // Exact transition timing functions from style guide
        'fast': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'medium': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slow': 'cubic-bezier(0.35, 0, 0.25, 1)',
      },
      transitionDuration: {
        // Exact transition durations from style guide
        'fast': '240ms',
        'medium': '500ms',
        'slow': '600ms',
      },
      fontFamily: {
        'sans': ['"Inter"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      lineHeight: {
        // Exact line heights from style guide
        'tight': '1.05',
        'snug': '1.1',
        'normal': '1.15',
        'body': '1.6',
      },
      fontWeight: {
        // Only light and regular weights used in the style guide
        'light': '300',
        'regular': '400',
      },
      borderRadius: {
        'pill': '999px',
      },
      maxWidth: {
        'container': '1440px',
      },
      animation: {
        'fade-in': 'fadeIn 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'stagger-fade-in': 'staggerFadeIn 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        staggerFadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        // Shadow values from style guide
        'lg': '0 4px 12px rgba(0,0,0,0.18)',
        'inner-sm': 'inset 0 1px 2px rgba(0,0,0,0.1)',
      },
      letterSpacing: {
        // Letter spacing from style guide
        'tight': '-0.02em',
        'normal': '-0.01em',
      },
      gridTemplateColumns: {
        'portfolio': 'repeat(auto-fill, minmax(300px, 1fr))',
        'news': '320px 1fr',
        'footer': 'repeat(3, 1fr)',
      },
      height: {
        'hero': '80vh',
        'portfolio-tile': '50vh',
      },
      zIndex: {
        'nav': '50',
        'overlay': '40',
      },
    },
    screens: {
      // Breakpoints exactly as in style guide
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px',
    },
  },
  plugins: [],
} as Config;

export default config; 