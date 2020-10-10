export function debug(...data: any[]) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Debug]', ...data);
  }
}
