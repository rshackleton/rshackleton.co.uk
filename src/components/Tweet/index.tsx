import React from 'react';

interface ITweetProps extends TweetViewModel {}

const Tweet: React.FC<ITweetProps> = ({ tweetUrl }) => {
  return <a href={tweetUrl}>Click here to view Tweet.</a>;
};

export default Tweet;
