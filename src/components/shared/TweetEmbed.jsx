import PropTypes from 'prop-types';
import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

import { Container } from './TweetEmbed.styles';

const TweetEmbed = ({ id }) => (
  <Container>
    <TwitterTweetEmbed tweetId={id} />
  </Container>
);

TweetEmbed.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TweetEmbed;
