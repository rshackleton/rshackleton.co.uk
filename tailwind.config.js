const defaultTheme = require('tailwindcss/defaultTheme');

const fonts = {
  heading: ['Raleway', ...defaultTheme.fontFamily.sans],
  body: ['"Zilla Slab"', ...defaultTheme.fontFamily.serif],
};

module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      ...fonts,
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1440px',
    },
    typography: (theme) => ({
      default: {
        css: {
          color: theme('colors.black'),
          h1: {
            color: theme('colors.black'),
            fontFamily: theme('fontFamily.heading').join(', '),
          },
          h2: {
            color: theme('colors.black'),
            fontFamily: theme('fontFamily.heading').join(', '),
          },
          h3: {
            color: theme('colors.black'),
            fontFamily: theme('fontFamily.heading').join(', '),
          },
          h4: {
            color: theme('colors.black'),
            fontFamily: theme('fontFamily.heading').join(', '),
          },
          h5: {
            color: theme('colors.black'),
            fontFamily: theme('fontFamily.heading').join(', '),
          },
          h6: {
            color: theme('colors.black'),
            fontFamily: theme('fontFamily.heading').join(', '),
          },
        },
      },
    }),
  },
  variants: {
    textDecoration: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [
    require('@tailwindcss/typography')({
      modifiers: ['lg'],
    }),
  ],
};
