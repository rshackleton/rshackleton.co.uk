import { Link } from 'gatsby';
import React, { FC } from 'react';

interface InlineLinkProps {
  content: string;
  linkId: number;
  type: string;
  urlSlug: string;
}

const InlineLink: FC<InlineLinkProps> = ({
  content,
  linkId,
  type,
  urlSlug,
}) => {
  let url;

  switch (type) {
    case 'article': {
      url = `/articles/${urlSlug}`;
      break;
    }

    case 'article_listing': {
      url = `/articles`;
      break;
    }

    case 'content_page': {
      url = `/${urlSlug}`;
      break;
    }

    case 'home_page': {
      url = `/`;
      break;
    }

    default: {
      url = '/not-found';
    }
  }

  return (
    <Link key={linkId} to={url}>
      {content}
    </Link>
  );
};

export default InlineLink;
