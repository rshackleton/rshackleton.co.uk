import { rgba } from 'polished';

export interface IBrand {
  primary: string;
  secondary: string;
  error: string;
}

export interface IFonts {
  headerFontFamily: string;
  bodyFontFamily: string;
}

export interface ITheme {
  brand: IBrand;
  breakpoints: Record<string, number>;
  colors: Record<string, string>;
  container: Record<string, string>;
  dimensions: Record<string, number>;
  fonts: IFonts;
  layers: Record<string, number>;
}

const brand: IBrand = {
  primary: '#466841',
  secondary: '#9ef8ef',
  error: '#ed4337',
};

const fonts: IFonts = {
  headerFontFamily: '"Raleway", sans-serif',
  bodyFontFamily: '"Zilla Slab", serif',
};

const theme: ITheme = {
  brand,
  breakpoints: {
    xs: 320,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
  colors: {
    body: rgba('#000000', 0.8),
    error: brand.error,
    link: brand.primary,
    linkHover: brand.primary,
    insetBackground: '#fefefe',
    siteBackground: '#fefefe',
  },
  container: {
    base: '80rem',
    text: '50rem',
  },
  dimensions: {
    banner: 18,
    header: 2,
    footer: 2,
  },
  fonts,
  layers: {
    root: -1,
    base: 1,
    content: 10,
    header: 50,
    overlay: 100,
    priority: 1000,
  },
};

export default theme;
