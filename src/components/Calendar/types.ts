import { FC } from 'react';
import {
  CalendarListBaseProps,
  DayComponentProps,
  DateObject as BaseDateObject,
  TCalendarDate,
} from 'react-native-calendars';
export type DateRange = {
  startingDay: string;
  endingDay: string;
};

type OnParentSelected = (selected: DateRange | undefined) => void;

export type CalendarProps = {
  onParentSelected?: OnParentSelected;
  defaultDateRange?: DateRange;
  minDate?: TCalendarDate;
  maxDate?: TCalendarDate;
  maxPeriod?: number | null; // days
};

export type useCalendarType = (
  onParentSelected?: OnParentSelected,
  defaultDateRange?: DateRange,
  maxPeriod?: number | null // days
) => {
  onSelect: (date: DateObject) => void;
  selected: MarketDates;
  messageAnim: any;
  message: string | null;
  current: TCalendarDate | undefined;
};

/**
 * custom Calendar library props
 */
type PeriodMarking = {
  startingDay?: boolean | undefined;
  endingDay?: boolean | undefined;
  selected?: boolean | undefined;
  betweenDay?: boolean | undefined;
};

export type DayComponent = Omit<DayComponentProps, 'marking'> & {
  marking: PeriodMarking;
};

export type MarketDates = {
  [date: string]: PeriodMarking;
};

export type DateObject = BaseDateObject;

type CalendarBaseProps = Omit<CalendarListBaseProps, 'dayComponent'> & {
  jalali: boolean;
  markedDates?: MarketDates;
  dayComponent?: FC<DayComponent>;
};

export type CalendarBaseType = FC<CalendarBaseProps>;
