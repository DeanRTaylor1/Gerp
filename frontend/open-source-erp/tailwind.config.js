/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Light Mode
        'primary-bg-light': '#FFFFFF',
        'primary-text-light': '#282828',
        'secondary-bg-light': '#F3F4F6',
        'secondary-text-light': '#282828',
        'button-hover-text-inactive': '#276EF1',
        'button-hover-border-inactive': '#276EF1',

        // Dark Mode
        'primary-bg-dark': '#282828',
        'primary-text-dark': '#F5E8C7',
        'secondary-bg-dark': '#454545',
        'secondary-text-dark': '#F5E8C7',

        // Common
        'primary-inverse-bg': '#C7D5F5',
        'primary-inverse-text': '#276EF1',
        'primary-inverse-border': '#276EF1',
        'dark-primary-inverse-text': '#282828',
        'dark-primary-inverse-border': '#F5E8C7',
      },
    },
  },
  plugins: [],
};
