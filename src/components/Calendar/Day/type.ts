import { FC } from 'react';
import { DateObject } from 'react-native-calendars';

import { DayComponent } from '../types';

type Props = DayComponent & {
  onSelect: (date: DateObject) => void;
};

export type CalendarDayType = FC<Props>;
