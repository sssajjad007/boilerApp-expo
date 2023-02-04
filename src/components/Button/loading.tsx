import React from 'react';
import { LoadingIndicator } from '../../styles';
import { IActivityProps } from './types';

export function Loading(props: IActivityProps) {
  const { size, activityColor, hasIcon } = props;
  return <LoadingIndicator color={activityColor} style={{ zIndex: 10 }} />;
}
