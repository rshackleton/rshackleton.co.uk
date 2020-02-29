import { FluidObject } from 'gatsby-image';

export interface ILayoutProps {
  banner: FluidObject;
  bannerDescription?: string;
  children: React.ReactNode;
}
