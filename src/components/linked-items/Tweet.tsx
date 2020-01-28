import TweetEmbed from '@components/shared/TweetEmbed';
import { graphql } from 'gatsby';
import { ITweet } from 'index';
import React, { FC } from 'react';

const URL_REGEX = /https:\/\/twitter\.com\/(\w+)\/status\/(\d+)\/?/;

interface ITweetProps {
  linkedItem: ITweet;
}

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
