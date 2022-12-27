import React, { useEffect, useState, useRef } from 'react';
import { BodyRegular } from '../../styles';
import { ITimerProps } from './type';

export function Timer(props: ITimerProps) {
  const { minute, second, onTimerEnd } = props;
  const [timer, setTimer] = useState<number>(minute * 60 + second);
  const interval = useRef<number>();
  useEffect(() => {
    interval.current = setTimeout(nextTime, 1000);
    if (timer === 0) {
      clearTimeout(interval.current);
      if (onTimerEnd) {
        onTimerEnd();
      }
    }
    return () => {
      if (interval.current) {
        clearTimeout(interval.current);
      }
    };
  }, [timer]);
  useEffect(() => {
    return () => {
      if (interval.current) {
        clearTimeout(interval.current);
      }
    };
  }, []);
  function nextTime() {
    return setTimer(timer - 1);
  }
  function formattedTime() {
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    if (second < 10) {
      return `${min / 10 < 1 ? 0 : ''}${min}:${0}${sec}`;
    }
    return `${min / 10 < 1 ? 0 : ''}${min}:${sec}`;
  }
  return <BodyRegular {...props}>{formattedTime()}</BodyRegular>;
}
