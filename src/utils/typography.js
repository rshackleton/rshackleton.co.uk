import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.5,
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

export const rhythm = typography.rhythm;

export default typography;
