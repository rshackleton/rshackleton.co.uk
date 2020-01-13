import React, { FC } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

import { Container } from './TweetEmbed.styles';

interface TweetEmbedProps {
  id: string;
}

const TweetEmbed: FC<TweetEmbedProps> = ({ id }) => (
  <Container>
    <TwitterTweetEmbed tweetId={id} />
  </Container>
);

export default TweetEmbed;
