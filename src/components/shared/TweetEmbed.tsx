import React, { FC } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Container } from './TweetEmbed.styles';

interface ITweetEmbedProps {
  id: string;
}

const TweetEmbed: FC<ITweetEmbedProps> = ({ id }) => (
  <Container>
    <TwitterTweetEmbed tweetId={id} />
  </Container>
);

export default TweetEmbed;
