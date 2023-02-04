import React, { useEffect, useRef, useState } from 'react';
import { RootContainer } from '../../../components/Container';
import { RootState, useSelector } from '../../../redux/store';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { CategoryItem } from '../../../api/types';
import { BodyLarge, CenterView, LoadingIndicatorPrimary, RefreshLoading } from '../../../styles';
import { debounced } from '../../../utils';
import { sortCategory } from '../../../api/category';
import { ICategoryItemComponentProps } from './types';
import { CategoryItem as CategoryItemStyles, IconContainer } from './styles';
import { DelinoIcon } from '../../../components/Icon';
import { getCategoryListData } from '../../../redux/slices/menu';
import { View } from 'react-native';
import { useAppModals } from '../../../components/AlertModal/hook';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const SUCCESS = 'تغییرات با موفقیت انجام شد!';
const FAILED = 'متاسفانه تغییرات انجام نشد!';

export default function Category() {
  const branchId = useSelector((state: RootState) => state.branch.currentBranchId);
  const [list, setList] = useState<CategoryItem[] | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const modal = useAppModals();

  const openSuccessAlert = () => {
    modal.show('customModal', {
      title: '',
      description: SUCCESS,
      autoHide: true,
      buttons: [
        {
          onPress: () => {
            // navigation.goBack();
          },
          title: 'متوجه شدم',
        },
      ],
    });
  };
  const openFailedAlert = () => {
    modal.show('customModal', {
      title: '',
      description: FAILED,
      autoHide: true,
      buttons: [
        {
          onPress: () => {
            // navigation.goBack();
          },
          title: 'متوجه شدم',
        },
      ],
    });
  };

  const refresh = async () => {
    setIsRefreshing(true);
    const data = await fetchData();
    setIsRefreshing(false);
  };
  async function fetchData() {
    setLoading(true);
    const data = await getCategoryListData(branchId.id, branchId.branchCode);
    if (data) {
      setList(data);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, [branchId]);

  const onDragEnd = ({ data }: { data: CategoryItem[] }) => {
    setList(data);
    sortData(data.map((d) => d.id));
  };
  const sortData = useRef(
    debounced(async (ids: number[]) => {
      try {
        await sortCategory(ids, branchId.branchCode);
        openSuccessAlert();
      } catch (e) {
        openFailedAlert();
      }
    })
  ).current;

  return (
    <RootContainer isBackIcon branchListAction>
      <View style={{ flex: 1, paddingVertical: 8 }}>
        {(loading && !isRefreshing) || !list ? (
          <CenterView>
            <LoadingIndicatorPrimary />
          </CenterView>
        ) : (
          <DraggableFlatList
            onDragEnd={onDragEnd}
            keyExtractor={(item: CategoryItem) => `draggable-item-${item.id}`}
            refreshControl={<RefreshLoading refreshing={isRefreshing} onRefresh={refresh} />}
            data={list}
            renderItem={({ item, drag, getIndex, isActive }) => {
              return <CategoryItemComponent onDrag={drag} isDragActive={isActive} data={item} />;
            }}
          />
        )}
      </View>
    </RootContainer>
  );
}

function CategoryItemComponent(props: ICategoryItemComponentProps) {
  const { data, onDrag, isDragActive } = props;
  const { title, isEnable } = data;
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isDragActive) {
      scale.value = 1.05;
    } else {
      scale.value = 1;
    }
  }, [isDragActive]);

  const activeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(scale.value, { duration: 200, easing: Easing.ease }) }],
    };
  });
  return (
    <CategoryItemStyles isDragActive={isDragActive} isVisible={isEnable} style={activeStyle}>
      <IconContainer onLongPress={onDrag}>
        <DelinoIcon name={'icon_drag'} size={16} color={'black'} />
      </IconContainer>
      <BodyLarge>{title}</BodyLarge>
    </CategoryItemStyles>
  );
}
