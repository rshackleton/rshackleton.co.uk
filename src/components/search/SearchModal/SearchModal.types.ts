/**
 * SearchModal props.
 */
export interface ISearchModalProps {}

/**
 * SearchModalProvider props.
 */
export interface ISearchModalProviderProps {
  children: React.ReactNode;
}

/**
 * Modal state.
 */
export type SearchModalContextValue = [boolean, React.Dispatch<React.SetStateAction<boolean>>] | [];
