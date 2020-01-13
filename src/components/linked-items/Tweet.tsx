import { graphql } from 'gatsby';
import React, { FC } from 'react';

import TweetEmbed from '@components/shared/TweetEmbed';

const URL_REGEX = /https:\/\/twitter\.com\/(\w+)\/status\/(\d+)\/?/;

interface TweetProps {
  linkedItem: Tweet;
}

const Tweet: FC<TweetProps> = ({ linkedItem }) => {
  const url = linkedItem.elements.tweet_url.value || '';

  const result = URL_REGEX.exec(url);

  if (!result || !result.length) {
    return null;
  }

  const props = {
    id: result[2],
    url: result[0],
    username: result[1],
  };

  return <TweetEmbed {...props} />;
};

export default Tweet;

export const KontentItemTweetFragment = graphql`
  fragment KontentItemTweetFragment on KontentItemTweet {
    system {
      codename
      type
    }
    elements {
      tweet_url {
        value
      }
    }
  }
`;
