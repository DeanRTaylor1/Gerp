export function valueOrEmptyString(value: string | undefined): string {
  return value ? value : '';
}

export function dateTimeToDateString(date: string | undefined): string {
  return date ? new Date(date).toLocaleDateString('en-UK') : '';
}
