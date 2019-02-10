import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.55,
  headerLineHeight: 1.4,
  headerFontFamily: ['Droid Sans', 'sans-serif'],
  bodyFontFamily: ['Droid Serif', 'serif'],
  googleFonts: [
    {
      name: 'Droid Sans',
      styles: ['400', '700'],
    },
    {
      name: 'Droid Serif',
      styles: ['400', '400i', '700'],
    },
  ],
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export const adjustFontSizeTo = typography.adjustFontSizeTo;
export const rhythm = typography.rhythm;
export const scale = typography.scale;

export default typography;
