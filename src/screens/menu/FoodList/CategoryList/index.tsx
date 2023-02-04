import React, { useCallback, useEffect, useState } from 'react';
import { dispatch, RootState, useSelector } from '../../../../redux/store';
import { Chips } from '../../../../components/chips';
import { getCategoryListData } from '../../../../redux/slices/menu';
import shareData from '../shareData';
import { ListScrollHorizontal } from '../../../../components/chips/styles';

export default function CategoryList() {
  const branchId = useSelector((state: RootState) => state.branch.currentBranchId);
  const categories = useSelector((state: RootState) => state.menu.category);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      await getCategoryListData(branchId.id, branchId.branchCode);
    }
    fetchData();
  }, [branchId]);

  const onPressHandler = useCallback(
    (index: number) => () => {
      setActiveIndex(index);
      setTimeout(() => {
        shareData.categoryId.activateId(index);
      }, 30);
    },
    []
  );

  return (
    <ListScrollHorizontal>
      {categories.map(({ id, title }, index) => (
        <CatItem
          key={index}
          index={index}
          id={id}
          title={title}
          activeIndex={activeIndex}
          onPress={onPressHandler(index)}
        />
      ))}
    </ListScrollHorizontal>
  );
}

function CatItem(props: any) {
  const { index, id, activeIndex, title, onPress } = props;
  return (
    <Chips IconRight={false} selected={index === activeIndex} id={id} index={index} onPress={onPress}>
      {title}
    </Chips>
  );
}
