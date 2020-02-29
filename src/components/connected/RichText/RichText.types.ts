import { Schema } from 'schema';

export interface IRichTextProps {
  content: string;
  images: Schema.IKontentRichTextImage[];
  links: Schema.IKontentRichTextLink[];
  linkedItems: Schema.IKontentItem<{}>[];
}
