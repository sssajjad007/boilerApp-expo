// import React, { PropsWithChildren } from 'react';
// import { CalendarContainer } from './styles';
// import { Calendar } from 'react-native-calendars-jalali';
// import CalendarDay from './Day';
// import { CalendarBaseType, CalendarProps, DayComponent } from './types';
// import useCalendar from './useCalendar';
// // shitty library
// //@ts-expect-error
// const CalendarBase: CalendarBaseType = (props) => <Calendar {...props} />;

// export default function CalendarComponent(props: CalendarProps) {
//   const { defaultDateRange, maxDate, maxPeriod, minDate, onParentSelected } = props;
//   const { onSelect, selected, messageAnim, message, current } = useCalendar(
//     onParentSelected,
//     defaultDateRange,
//     maxPeriod
//   );
//   return (
//     <CalendarContainer>
//       <CalendarBase
//         jalali
//         minDate={minDate}
//         maxDate={maxDate}
//         current={current}
//         hideExtraDays
//         markedDates={selected}
//         dayComponent={(p: PropsWithChildren<DayComponent>) => <CalendarDay {...p} onSelect={onSelect} />}
//         theme={{
//           backgroundColor: 'transparent',
//           calendarBackground: 'transparent',
//           //   textMonthFontFamily: fontFamily.normal,
//           //   textDayHeaderFontFamily: fontFamily.normal,
//           //   textMonthFontSize: textSizeNumber.normal,
//           //   textDayHeaderFontSize: textSizeNumber.small,
//         }}
//       />
//     </CalendarContainer>
//   );
// }
