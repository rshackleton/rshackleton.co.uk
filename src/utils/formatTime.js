/** Get formatted date string. */
export default function formatTime(date) {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    hour12: true,
    minute: 'numeric',
    timeZone: 'Europe/London',
  });

  return formatter.format(date);
}
