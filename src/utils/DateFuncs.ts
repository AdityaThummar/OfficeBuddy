export type PossibleDateTypes = string | number | Date;

export const getDateString = (d: PossibleDateTypes) => {
  return (
    new Date(d)?.toString()?.slice(0, 15) ??
    new Date()?.toString()?.slice(0, 15)
  );
};

export const getYYYYMMDD = (d: PossibleDateTypes) => {
  const date = new Date(d) ?? new Date();
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export const getTime12HFormat = (d: PossibleDateTypes) => {
  const date = new Date(d) ?? new Date();
  const h = date.getHours();
  let m: any = date.getMinutes();
  m = m < 10 ? `0${m}` : m;
  let final = ``;
  if (h > 12) {
    final = `${h - 12}:${m} PM`;
  } else if (h === 12) {
    final = `12:${m} PM`;
  } else if (h < 12 && h !== 0) {
    final = `${h}:${m} AM`;
  } else if (h === 0) {
    final = `12:${m} AM`;
  }
  final = Number(final.split(":")?.[0]) < 10 ? "0" + final : final;
  return final;
};

export const WeekDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
