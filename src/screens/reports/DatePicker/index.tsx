// import React, { useRef, useState } from 'react';
// import { Container, IconWrapper } from './styles';
// import { Button } from '../../../components/Button';
// import CalendarComponent from '../../../components/Calendar';
// import { dateFormatted } from '../../../utils';
// import { DateRange } from '../../../components/Calendar/types';

// export default function DatePicker() {
//   const today = useRef(dateFormatted()).current;
//   const rangeRef = useRef<DateRange | undefined>();
//   const [isSelected, setIsSelected] = useState(false);
//   const onDateRange = (range: DateRange | undefined) => {
//     setIsSelected(range === undefined ? true : false);
//     rangeRef.current = range;
//   };
//   return (
//     <Container>
//       <IconWrapper>
//         <Button minWidth={120} mode="Filled" size="Small" onPress={() => {}}>
//           {'امروز'}
//         </Button>
//         <Button minWidth={120} mode="Filled" size="Small" onPress={() => {}}>
//           {'۷ روز گذشته'}
//         </Button>
//         <Button minWidth={120} mode="Filled" size="Small" onPress={() => {}}>
//           {'۳۰ روز گذشته'}
//         </Button>
//       </IconWrapper>

//       <CalendarComponent
//         onParentSelected={onDateRange}
//         // defaultDateRange={{ startingDay, endingDay }}
//         maxDate={today}
//         // maxPeriod={30} // days
//       />

//       {/* <Button mode="Filled" size="Default" onPress={() => {}} /> */}
//     </Container>
//   );
// }
