declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module 'gatsby-plugin-disqus' {
  const Disqus: React.FC<{ config: Record<string, unknown> }>;
  export { Disqus };
}

declare module 'react-twitter-embed' {
  const TwitterTweetEmbed: React.FC<Record<string, unknown>>;
  export { TwitterTweetEmbed };
}
