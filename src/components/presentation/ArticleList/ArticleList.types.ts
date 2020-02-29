export interface IArticleListProps {
  items: IArticleListItem[];
}

export interface IArticleListItem {
  id: string;
  codename: string;
  slug: string;
  summary: string;
  title: string;
}
