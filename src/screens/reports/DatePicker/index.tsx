import React, { useRef, useState } from 'react';
import { ButtonContainer, Container, IconWrapper } from './styles';
import { Button } from '../../../components/Button';
import CalendarComponent from '../../../components/Calendar';
import { dateFormatted } from '../../../utils';
import { DateRange } from '../../../components/Calendar/types';
import { IDatePickerProps, RANGE } from './types';
import moment from 'moment-jalaali';
import { dispatch, RootState, useDispatch, useSelector } from '../../../redux/store';
import { setCalendarButton, setDateRange } from '../../../redux/slices/sales';

export default function DatePicker(props: IDatePickerProps) {
  const { closeModal } = props;
  const today = useRef(moment()).current;
  const today2 = useRef(dateFormatted()).current;
  const endingDay = useSelector((state: RootState) => state.sales.dateRange.endingDay);
  const startingDay = useSelector((state: RootState) => state.sales.dateRange.startingDay);
  const selected = useSelector((state: RootState) => state.sales.calendarButton);
  const rangeRef = useRef<DateRange | undefined>();
  const [isSelected, setIsSelected] = useState(false);

  const onDateRange = (range: DateRange | undefined) => {
    setIsSelected(range === undefined ? true : false);
    rangeRef.current = range;
  };
  const onConfirm = () => {
    closeModal();
    dispatch(setCalendarButton(''));
    if (rangeRef.current === undefined) {
      rangeRef.current = {
        startingDay: today2,
        endingDay: today2,
      };
    }
    if (rangeRef.current.startingDay === today2 && rangeRef.current.endingDay === today2) {
      dispatch(setCalendarButton('today'));
    }
    if (rangeRef.current !== undefined) {
      dispatch(setDateRange(rangeRef.current));
    }
  };
  const onPressRange = (type: RANGE) => {
    closeModal();
    let start = today;
    let end = today;

    switch (type) {
      case RANGE.week:
        start = moment().subtract(7, 'days');
        break;

      case RANGE.month:
        start = moment().subtract(30, 'days');
        break;
    }

    const selected = {
      startingDay: dateFormatted(start),
      endingDay: dateFormatted(end),
    };

    dispatch(setDateRange(selected));
  };

  return (
    <Container>
      <IconWrapper>
        <Button
          minWidth={100}
          mode={selected === 'today' ? 'Filled' : 'Text'}
          size="Small"
          onPress={() => {
            dispatch(setCalendarButton('today'));
            onPressRange(RANGE.today);
          }}>
          {'امروز'}
        </Button>
        <Button
          minWidth={100}
          mode={selected === 'week' ? 'Filled' : 'Text'}
          size="Small"
          onPress={() => {
            dispatch(setCalendarButton('week'));
            onPressRange(RANGE.week);
          }}>
          {'۷ روز گذشته'}
        </Button>
        <Button
          minWidth={100}
          mode={selected === 'month' ? 'Filled' : 'Text'}
          size="Small"
          onPress={() => {
            dispatch(setCalendarButton('month'));
            onPressRange(RANGE.month);
          }}>
          {'۳۰ روز گذشته'}
        </Button>
      </IconWrapper>

      <CalendarComponent
        onParentSelected={onDateRange}
        defaultDateRange={{ startingDay, endingDay }} //redux
        maxDate={today2}
        // maxPeriod={30} // days
      />
      <ButtonContainer>
        <Button mode="Filled" size="Default" onPress={onConfirm} disabled={isSelected}>
          {'تایید بازه زمانی'}
        </Button>
      </ButtonContainer>
    </Container>
  );
}
