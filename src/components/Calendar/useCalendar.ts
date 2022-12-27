// import { useCallback, useEffect, useRef, useState } from 'react';
// import moment from 'moment';

// import { DateObject, MarketDates, useCalendarType } from './types';
// import { TCalendarDate } from 'react-native-calendars';
// import { enumerateDaysBetweenDates } from '../../utils/helper';
// import { Animated } from 'react-native';

// const useCalendar: useCalendarType = (
//   eventListenerSelected = () => {},
//   defaultDateRange = undefined,
//   maxPeriod = null
// ) => {
//   const [selected, setSelected] = useState<MarketDates>({});
//   const [message, setMessage] = useState<string | null>(null);
//   const [current, setCurrent] = useState<TCalendarDate | undefined>();

//   const startingDay = useRef<string>('');
//   const endingDay = useRef<string>('');
//   const messageAnim = useRef(new Animated.Value(0.2)).current;
//   const currentTimer = useRef<ReturnType<typeof setTimeout>>();
//   const messageTimer = useRef<ReturnType<typeof setTimeout>>();

//   useEffect(() => {
//     if (defaultDateRange !== undefined) {
//       let newSelected: MarketDates = {};
//       const { startingDay: start, endingDay: end } = defaultDateRange;

//       if (start === end) {
//         startingDay.current = start;
//         newSelected[start] = { selected: true };
//       } else {
//         startingDay.current = start;
//         endingDay.current = end;

//         newSelected[start] = { startingDay: true };
//         newSelected[end] = { endingDay: true };

//         const betweenDays = enumerateDaysBetweenDates(start, end);
//         betweenDays.forEach((betweenDay: string) => {
//           newSelected[betweenDay] = { betweenDay: true };
//         });
//       }

//       setSelected(newSelected);

//       setCurrent(startingDay.current);
//       currentTimer.current = setTimeout(() => {
//         setCurrent(undefined);
//       }, 100);
//     }

//     return () => {
//       currentTimer.current && clearTimeout(currentTimer.current);
//       messageTimer.current && clearTimeout(messageTimer.current);
//     };
//   }, []);

//   const onSelect = useCallback(
//     ({ dateString }: DateObject) => {
//       const keys = Object.keys(selected);

//       if (startingDay.current === dateString && endingDay.current === '') {
//         // startingDay.current = endingDay.current;
//         startingDay.current = '';
//       }
//       // Starting day pressed again
//       else if (startingDay.current === dateString) {
//         // startingDay.current = endingDay.current;
//         endingDay.current = '';
//       }
//       // Ending day pressed again
//       else if (endingDay.current === dateString) {
//         startingDay.current = endingDay.current;
//         endingDay.current = '';
//       }
//       // First day pressed
//       else if (keys.length === 0) {
//         startingDay.current = dateString;
//       }
//       // Second day pressed
//       else if (keys.length === 1) {
//         const prevDateString = keys[0];
//         const diff = moment(dateString).diff(moment(prevDateString), 'days');

//         if (maxPeriod && Math.abs(diff) > maxPeriod) {
//           showMessage(`بازه زمانی انتخابی نمی‌تواند بیشتر از ${maxPeriod} روز باشد`);
//           return;
//         }

//         if (diff > 0) {
//           startingDay.current = prevDateString;
//           endingDay.current = dateString;
//         } else {
//           startingDay.current = dateString;
//           endingDay.current = prevDateString;
//         }
//       }
//       // Starting day or ending day will change
//       else if (keys.length >= 2) {
//         const startDiff = moment(dateString).diff(moment(startingDay.current), 'days');
//         const endDiff = moment(dateString).diff(moment(endingDay.current), 'days');

//         if (maxPeriod && Math.max(Math.abs(startDiff), Math.abs(endDiff)) > maxPeriod) {
//           showMessage(`بازه زمانی انتخابی نمی‌تواند بیشتر از ${maxPeriod} روز باشد`);
//           return;
//         }

//         if (startDiff < 0) {
//           startingDay.current = dateString;
//         } else if (endDiff > 0) {
//           endingDay.current = dateString;
//         } else if (startDiff < Math.abs(endDiff)) {
//           startingDay.current = dateString;
//         } else {
//           endingDay.current = dateString;
//         }
//       }

//       let newSelected: MarketDates = {};

//       // Select days between dates
//       if (startingDay.current && endingDay.current) {
//         newSelected[startingDay.current] = { startingDay: true };
//         newSelected[endingDay.current] = { endingDay: true };

//         eventListenerSelected({
//           startingDay: startingDay.current,
//           endingDay: endingDay.current,
//         });

//         const betweenDays = enumerateDaysBetweenDates(startingDay.current, endingDay.current);
//         betweenDays.forEach((betweenDay: string) => {
//           newSelected[betweenDay] = { betweenDay: true };
//         });
//       }
//       // Select starting day
//       else if (startingDay.current) {
//         newSelected[startingDay.current] = { selected: true };

//         eventListenerSelected({
//           startingDay: startingDay.current,
//           endingDay: startingDay.current,
//         });
//       } else {
//         eventListenerSelected(undefined);
//       }

//       setSelected(newSelected);
//     },
//     [selected]
//   );

//   const showMessage = useCallback((text: string, timer: number = 2000) => {
//     setMessage(text);

//     Animated.timing(messageAnim, {
//       toValue: 1,
//       duration: 150,
//       useNativeDriver: true,
//     }).start(() => {
//       messageTimer.current = setTimeout(() => {
//         Animated.timing(messageAnim, {
//           toValue: 0,
//           duration: 200,
//           useNativeDriver: true,
//         }).start(() => {
//           setMessage(null);
//         });
//       }, timer);
//     });
//   }, []);

//   return {
//     onSelect,
//     selected,
//     messageAnim,
//     message,
//     current,
//   };
// };

// export default useCalendar;
