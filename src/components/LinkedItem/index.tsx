import React from 'react';

import CodeBlock from '@/components/CodeBlock';
import Tweet from '@/components/Tweet';

interface ILinkedItemProps {
  linkedItem: ContentViewModel;
}

const LinkedItem: React.FC<ILinkedItemProps> = ({ linkedItem }) => {
  if (isCodeBlock(linkedItem)) {
    return <CodeBlock {...linkedItem} />;
  }

  if (isTweet(linkedItem)) {
    return <Tweet {...linkedItem} />;
  }

  return null;
};

export default LinkedItem;

function isCodeBlock(item: ContentViewModel): item is CodeBlockViewModel {
  return item.type === 'code_block';
}

function isTweet(item: ContentViewModel): item is TweetViewModel {
  return item.type === 'tweet';
}
