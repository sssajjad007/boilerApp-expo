import React from 'react';
import moment from 'moment-jalaali';

import { Container, Day, Wrapper } from './style';
import { CalendarDayType } from './type';

const CalendarDay: CalendarDayType = ({ date, state, marking, onSelect }) => {
  const start = marking?.startingDay || false;
  const end = marking?.endingDay || false;
  const between = marking?.betweenDay || false;

  const selected = marking?.selected || false;
  const selectedText = start || end || between || selected;
  const day = moment(date.dateString, 'YYYY-MM-DD').format('jD');
  return (
    <Container onPress={state === 'disabled' ? () => {} : () => onSelect(date)}>
      <Wrapper startingDay={start} endingDay={end} betweenDay={between} single={selected}>
        <Day state={state} selected={selectedText}>
          {day}
        </Day>
      </Wrapper>
    </Container>
  );
};

export default CalendarDay;
