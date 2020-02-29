import { graphql } from 'gatsby';
import React, { FC } from 'react';

import TweetEmbed from '@components/presentation/TweetEmbed';

import { ITweetProps } from './Tweet.types';

const URL_REGEX = /https:\/\/twitter\.com\/(\w+)\/status\/(\d+)\/?/;

const TweetComponent: FC<ITweetProps> = ({ linkedItem }) => {
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

export default TweetComponent;

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
