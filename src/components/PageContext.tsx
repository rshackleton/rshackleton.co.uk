import { RouteComponentProps } from '@reach/router';
import * as React from 'react';

export type PageContext = RouteComponentProps & Record<string, unknown>;

export interface IPageContextProviderProps {
  children: React.ReactNode;
  value: PageContext;
}

const PageContext = React.createContext<PageContext>({});

export const PageContextProvider: React.FC<IPageContextProviderProps> = ({
  children,
  value,
}) => {
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePageContext = (): PageContext => React.useContext(PageContext);
