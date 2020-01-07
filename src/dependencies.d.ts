declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module 'gatsby-plugin-disqus' {
  const Disqus: React.FC<{ config: Object }>;
  export { Disqus };
}
