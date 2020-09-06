import Link from 'next/link';
import React from 'react';

export interface IInlineLinkProps {
  content: string;
  linkId: string;
  type: string;
  urlSlug: string;
}

const InlineLink: React.FC<IInlineLinkProps> = ({ content, type, urlSlug }) => {
  let linkAs;
  let linkHref;

  switch (type) {
    case 'article': {
      linkAs = `/articles/${urlSlug}`;
      linkHref = `/articles/[slug]`;
      break;
    }

    case 'article_listing': {
      linkHref = `/articles`;
      break;
    }

    case 'content_page': {
      linkAs = `/${urlSlug}`;
      linkHref = `/[slug]`;
      break;
    }

    case 'homepage': {
      linkHref = `/`;
      break;
    }

    default: {
      linkHref = '/not-found';
    }
  }

  return (
    <Link href={linkHref} as={linkAs}>
      <a>{content}</a>
    </Link>
  );
};

export default InlineLink;
