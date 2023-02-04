import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components/native';
import { add } from '../../../core/mmkv';
import { setCurrentBranch } from '../../../redux/slices/branch';
import { dispatch } from '../../../redux/store';
import { DelinoIcon } from '../../Icon';
import { Item, ItemText, LineHorizontal } from './styles';
import { IBranchItem } from './types';

export default function BranchItem(props: IBranchItem) {
  const { data, currentBranchId, close } = props;
  const theme = useTheme();
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    if (currentBranchId.id === data.id) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [currentBranchId.id]);

  return (
    <>
      <Item
        onPress={() => {
          dispatch(setCurrentBranch(data));
          add('currentBranchId', data.id);
          close();
        }}>
        <ItemText selected={selected}>
          {`${data.restaurantName}${data.branchName ? ` (${data.branchName})` : ''}`}
        </ItemText>
        {selected ? <DelinoIcon name={'icon_tick'} size={16} color={theme.colors.Primary.Main} /> : null}
      </Item>
      <LineHorizontal />
    </>
  );
}
