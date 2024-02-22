export interface ICalendarHoliday {
  date: string;
  name: string;
}

export interface ICalendarTask {
  id: number;
  day: Date;
  title: string;
  description: string;
  label: string;
  filtered?: boolean;
}

export type CalendarWeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;
