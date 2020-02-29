import { Schema } from 'schema';

export interface ILinkedItemProps {
  linkedItem: Schema.IKontentItem<{}>;
}

export interface ILinkedItemComponentProps<T extends Schema.IKontentItem<{}>> {
  linkedItem: T;
}

export enum LinkedItemType {
  Article = 'article',
  CodeBlock = 'code_block',
  ContentPage = 'content_page',
  Tweet = 'tweet',
}
