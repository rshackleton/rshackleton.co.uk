/** Get formatted date string. */
export default function formatDate(date?: number | Date): string {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/London',
    weekday: 'long',
    year: 'numeric',
  });

  return formatter.format(date);
}
