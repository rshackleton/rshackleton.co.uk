import theme from './theme';

/** Create object with breakpoints as min-width rules. */
const rules = Object.entries(theme.breakpoints).reduce(
  (acc, [key, val]) => ({ ...acc, [key]: `(min-width: ${val}px)` }),
  {},
);

/** Create object with rules as full media queries. */
const mq = Object.entries(rules).reduce(
  (acc, [key, val]) => ({ ...acc, [key]: `@media ${val}` }),
  {},
);

export { mq as default, rules };
