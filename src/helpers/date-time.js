/** Get formatted date string. */
export default function formatDate(date) {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return formatter.format(date);
}
