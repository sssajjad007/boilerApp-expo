import React, { PropsWithChildren, useEffect, useState } from 'react';
import { CalendarContainer } from './styles';
import { Calendar } from 'react-native-calendars-jalali';
import CalendarDay from './Day';
import { CalendarBaseType, CalendarProps, DayComponent } from './types';
import useCalendar from './useCalendar';
import { CenterView, LoadingIndicatorPrimary } from '../../styles';
import { DelinoIcon } from '../Icon';
// shitty library
//@ts-expect-error
const CalendarBase: CalendarBaseType = (props) => <Calendar {...props} />;

export default function CalendarComponent(props: CalendarProps) {
  const { defaultDateRange, maxDate, maxPeriod, minDate, onParentSelected } = props;
  const [show, setShow] = useState<boolean>(false);
  const { onSelect, selected, messageAnim, message, current } = useCalendar(
    onParentSelected,
    defaultDateRange,
    maxPeriod
  );
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 250);
  }, []);

  function renderCalendar() {
    return (
      <CalendarBase
        jalali
        minDate={minDate}
        maxDate={maxDate}
        current={current}
        hideExtraDays
        markedDates={selected}
        dayComponent={(p: PropsWithChildren<DayComponent>) => <CalendarDay {...p} onSelect={onSelect} />}
        renderArrow={(direction) =>
          direction === 'right' ? (
            <DelinoIcon name={'icon_angle-right'} size={16} color={'black'} />
          ) : (
            <DelinoIcon name={'icon_angle-left'} size={16} color={'black'} />
          )
        }
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textMonthFontFamily: fontFamily.normal,
          textDayHeaderFontFamily: fontFamily.normal,
          textMonthFontSize: 18,
          textMonthFontWeight: '400',
          textDayHeaderFontSize: 16,
        }}
      />
    );
  }

  return (
    <CalendarContainer>
      {show ? (
        renderCalendar()
      ) : (
        <CenterView>
          <LoadingIndicatorPrimary />
        </CenterView>
      )}
    </CalendarContainer>
  );
}
export const fontFamily = {
  normal: 'IRANSansMobileFaNum',
  bold: 'IRANSansMobileFaNum',
};
