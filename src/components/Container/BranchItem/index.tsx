import React, { useEffect, useState } from 'react';
import { setCurrentBranchId } from '../../../redux/slices/branch';
import { dispatch } from '../../../redux/store';
import { Item, ItemText } from './styles';
import { IBranchItem } from './types';

export default function BranchItem(props: IBranchItem) {
  const { data, currentBranchId, close } = props;
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    if (currentBranchId.id === data.id) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [currentBranchId.id]);

  return (
    <Item
      onPress={() => {
        dispatch(setCurrentBranchId(data));
        close();
      }}>
      <ItemText selected={selected}>
        {`${data.restaurantTitle} ${data.restaurantName}${data.branchName ? ` (${data.branchName})` : ''}`}
      </ItemText>
    </Item>
  );
}
