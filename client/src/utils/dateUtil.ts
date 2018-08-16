import * as fecha from "fecha";

export function formatDate(dateStr: string | number) {
  const milliseconds = getMilliseconds(dateStr);
  return fecha.format(milliseconds, "YYYY-MM-DD");
}

export function formatDateTime(dateStr: string | number) {
  const milliseconds = getMilliseconds(dateStr);
  return fecha.format(milliseconds, "YYYY-MM-DD HH:mm");
}

export function formateDateIf(milliseonds: number | undefined) {
  if (milliseonds == null) {
    return ''
  }
  return formatDate(milliseonds)
}

export function formatDateTimeIf(milliseonds: number | undefined) {
  if (milliseonds == null) {
    return ''
  }
  return formatDateTime(milliseonds)
}

export function getMilliseconds(input: number | string) {
  if (typeof input === "number") {
    return input;
  }
  return new Date(input).getTime();
}

export function dateToMilliseconds(dateStr: string) {
  return new Date(dateStr).getTime();
}
