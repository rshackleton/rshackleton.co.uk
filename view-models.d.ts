interface ContentViewModel {
  id: string;
  codename: string;
  type: string;
}

interface RichTextViewModel {
  html: string;
  images: RichTextImageViewModel[];
  links: RichTextLinkViewModel[];
  linkedItems: ContentViewModel[];
}

interface RichTextImageViewModel {
  description?: string;
  height?: number;
  imageId: string;
  url: string;
  width?: number;
}

interface RichTextLinkViewModel {
  codename: string;
  linkId: string;
  type: string;
  urlSlug: string;
}

interface ArticleViewModel extends ContentViewModel {
  body: RichTextViewModel | null;
  date: string;
  image: string;
  slug: string;
  summary: string;
  title: string;
}

interface ArticleListingViewModel extends ContentViewModel {
  image: string;
  title: string;
}

interface CodeBlockViewModel extends ContentViewModel {
  code: string;
  language: string;
  sourceUrl: string;
}

interface ContactPageViewModel extends ContentViewModel {}

interface ContentPageViewModel extends ContentViewModel {
  body: string;
  image: string;
  slug: string;
  summary: string;
  title: string;
}

interface HomepageViewModel extends ContentViewModel {
  image: string;
  title: string;
}

interface PageViewModel extends ContentViewModel {}

interface TweetViewModel extends ContentViewModel {
  tweetUrl: string;
}
