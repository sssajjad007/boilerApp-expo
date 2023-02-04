import { Image, View, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Cart from '../../../../components/Cart';
import {
  Col,
  DetailsContainer,
  ErrorText,
  ImageContainer,
  Item,
  LineHorizontal,
  Row,
  RowWeek,
  TitleCardItem,
  TitleItem,
  UploadIcon,
  WeekContainer,
} from './styles';
import { RootContainer } from '../../../../components/Container';
import { deleteImage, getFood, uploadImage } from '../../../../api/food';
import { FoodInfo } from '../../../../api/types';
import { BodyLarge, LoadingIndicatorPrimary } from '../../../../styles';
import { dispatch, RootState, useSelector } from '../../../../redux/store';
import { imageSize } from '../../../../utils/helper';
import { DelinoIcon } from '../../../../components/Icon';
import { currency } from '../../../../utils/currency';
import ImagePicker, { ImageOrVideo, Options } from 'react-native-image-crop-picker';
import { useTheme } from 'styled-components/native';
import { CustomBackdrop } from '../../../../components/CustomebackDrop';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRoute } from '@react-navigation/native';
import { FoodModalRouteProp } from './types';
import { useAppModals } from '../../../../components/AlertModal/hook';
import { emptyUploadImage } from './assets';
import { height } from '../../../../utils/deviceUi';
import { setFoodsUpdate } from '../../../../redux/slices/menu';

const PRICE = 'قیمت';
const PACKAGE_COST = 'هزینه بسته بندی';
const CATEGORY = 'دسته';
const LOCAL_CODE = 'کد لوکال';
const INGREDIENTS = 'محتویات';
const weeks = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
const CAMERA = 'گرفتن عکس با موبایل';
const GALLERY = 'انتخاب عکس از گالری';
const REMOVE = 'حذف عکس';
const NAME = 'نام محصول';
const REMOVE_IMAGE = 'حذف عکس';
const CANCEL = 'انصراف';
const CONFIRM = 'تایید';
const REMOVE_IMAGE_CONFIRM = 'آیا از حذف عکس اطمینان دارید؟';

export default function FoodModal() {
  const route = useRoute<FoodModalRouteProp>();
  const { id, image } = route.params.data;
  const [data, setData] = useState<FoodInfo | null>(null);
  const branchCode = useSelector((state: RootState) => state.branch.currentBranchId.branchCode);
  const [uri, setUri] = useState<string | null>(image);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const [indexPoint, setIndexPoint] = useState(0);
  const modal = useAppModals();

  const openAlert = () => {
    modal.show('customModal', {
      title: REMOVE_IMAGE,
      description: REMOVE_IMAGE_CONFIRM,
      buttons: [
        {
          onPress: onPressRemove,
          title: CONFIRM,
        },
        {
          onPress: () => console.log('Confirm pressed'),
          title: CANCEL,
        },
      ],
    });
  };

  const opt: Options = {
    mediaType: 'photo',
    cropping: true,
    width: 560,
    height: 350,
    includeExif: true,
    includeBase64: true,
    cropperTintColor: theme.colors.Primary.Main,
    cropperActiveWidgetColor: theme.colors.Primary.Main,
    cropperStatusBarColor: theme.colors.Primary.Main,
    cropperToolbarColor: theme.colors.Primary.Main,
    cropperToolbarWidgetColor: 'white',
    freeStyleCropEnabled: false,
    cropperToolbarTitle: 'ویرایش عکس',
    cropperCircleOverlay: false,
    loadingLabelText: 'در حال پردازش',
    forceJpg: true,
    cropperChooseText: 'انتخاب کنید',
    cropperCancelText: 'لغو',
    hideBottomControls: false,
    maxFiles: 20,
    minFiles: 1,
    showsSelectedCount: true,
    smartAlbums: ['UserLibrary', 'PhotoStream', 'Panoramas', 'Videos', 'Bursts'],
    sortOrder: 'desc',
    useFrontCamera: false,
    waitAnimationEnd: true,
    writeTempFile: true,
  };
  function snapPoint() {
    if (height < 650) {
      if (!uri) {
        return '32%';
      }
      return '46%';
    }
    if (height < 670) {
      if (!uri) {
        return '24%';
      }
      return '38%';
    } else {
      return '32%';
    }
  }

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [snapPoint(), snapPoint()], [uri]);

  const getData = async () => {
    try {
      const data = await getFood(id, branchCode);
      setData(data);
      setUri(data.image);
    } catch (e) {
      setData(null);
    }
  };
  const close = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    setIndexPoint(index);
  }, []);

  useEffect(() => {
    getData();
  }, [id]);

  const onPressRemove = async () => {
    setIsLoading(true);
    try {
      await deleteImage(id, branchCode);
      dispatch(setFoodsUpdate({ id, imageUrl: '' }));
      close();
      setUri(null);
    } catch (err) {
      console.error(JSON.stringify(err));
    }
    setIsLoading(false);
  };

  const onPressGallery = async () => {
    try {
      close();
      const image = await ImagePicker.openPicker(opt);
      await upload(image);
    } catch (err) {
      console.error(JSON.stringify(err));
      close();
    }
  };

  const onPressCamera = async () => {
    try {
      const image = await ImagePicker.openCamera(opt);
      close();
      await upload(image);
    } catch (err) {
      console.error(JSON.stringify(err));
      close();
    }
  };
  const upload = async (image: ImageOrVideo) => {
    setIsLoading(true);
    close();
    try {
      const { imageUrl, success } = await uploadImage(
        id,
        //@ts-ignore
        `data:${image.mime};base64,${image.data}`
        // currentBranchCode,
      );
      if (success) {
        setUri(image.path);
        dispatch(setFoodsUpdate({ id, imageUrl }));
      }
    } catch (e) {
      console.error(JSON.stringify(e));
    }
    setIsLoading(false);
  };

  function imageRender() {
    if (uri) {
      return (
        <ImageContainer>
          <Image source={{ uri: imageSize(uri, '560x350') }} style={{ width: '100%', height: '100%' }} />
          <UploadIcon
            onPress={() => {
              handlePresentModalPress();
            }}>
            <DelinoIcon name={'icon_camera'} size={20} color={'black'} />
          </UploadIcon>
        </ImageContainer>
      );
    }
    return (
      <ImageContainer
        onPress={() => {
          handlePresentModalPress();
        }}>
        <Image source={emptyUploadImage} style={{ width: '100%', height: '100%' }} />
        <UploadIcon
          onPress={() => {
            handlePresentModalPress();
          }}>
          <DelinoIcon name={'icon_camera'} size={20} color={'black'} />
        </UploadIcon>
      </ImageContainer>
    );
  }
  function dayRender() {
    const result: JSX.Element[] = [];
    if (data) {
      // const temp = `d${index}`;
      const d0 = data.d0;
      const d1 = data.d1;
      const d2 = data.d2;
      const d3 = data.d3;
      const d4 = data.d4;
      const d5 = data.d5;
      const d6 = data.d6;
      const temp = [d0, d1, d2, d3, d4, d5, d6];
      for (let index = 0; index < weeks.length; index++) {
        result.push(
          <RowWeek key={index}>
            <DelinoIcon
              name={'icon_tick'}
              size={16}
              color={temp[index] ? theme.colors.Gray[0] : theme.colors.Gray[60]}
              style={{ paddingLeft: 12 }}
            />
            <BodyLarge style={{ color: temp[index] ? theme.colors.Gray[0] : theme.colors.Gray[60] }}>
              {weeks[index]}
            </BodyLarge>
          </RowWeek>
        );
      }
      return result;
    }
    return null;
  }
  return (
    <>
      <RootContainer isCloseIcon>
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
          {imageRender()}
          {data ? (
            <>
              <Cart title="اطلاعات محصول">
                <DetailsContainer>
                  <Row>
                    <TitleCardItem>{NAME}</TitleCardItem>
                    <BodyLarge>{data.title || '   -'}</BodyLarge>
                  </Row>
                  <Row>
                    <TitleCardItem>{PRICE}</TitleCardItem>
                    <BodyLarge>{currency(data.price, false) || '   -'}</BodyLarge>
                  </Row>
                  <Row>
                    <TitleCardItem>{PACKAGE_COST}</TitleCardItem>
                    <BodyLarge>{currency(data.foodPackagingPrice, false) || '   -'}</BodyLarge>
                  </Row>
                  <Row>
                    <TitleCardItem>{CATEGORY}</TitleCardItem>
                    <BodyLarge>{data.categoryTitle || '   -'}</BodyLarge>
                  </Row>
                  <Row>
                    <TitleCardItem>{LOCAL_CODE}</TitleCardItem>
                    <BodyLarge>{data.clientFoodItemID || '   -'}</BodyLarge>
                  </Row>
                  <Row>
                    <Col>
                      <TitleCardItem>{`${INGREDIENTS}`}</TitleCardItem>
                      <BodyLarge style={{ textAlign: 'right', paddingTop: 8 }}>{data.ingredients}</BodyLarge>
                    </Col>
                  </Row>
                </DetailsContainer>
              </Cart>
              <Cart title="روزهای فعال">
                <WeekContainer>{dayRender()}</WeekContainer>
              </Cart>
            </>
          ) : (
            <LoadingIndicatorPrimary />
          )}
        </ScrollView>
      </RootContainer>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        index={-1}
        backdropComponent={({ animatedIndex, animatedPosition, style }) => {
          return (
            <CustomBackdrop
              animatedIndex={animatedIndex}
              animatedPosition={animatedPosition}
              style={style}
              close={close}
              index={indexPoint}
            />
          );
        }}>
        <View style={{ flex: 1 }}>
          <Item onPress={onPressGallery}>
            <DelinoIcon name={'icon_gallery'} size={20} color={'black'} />
            <TitleItem>{GALLERY}</TitleItem>
          </Item>
          <Item onPress={onPressCamera}>
            <DelinoIcon name={'icon_camera'} size={20} color={'black'} />
            <TitleItem>{CAMERA}</TitleItem>
          </Item>

          {uri ? (
            <>
              <LineHorizontal />
              <Item onPress={openAlert}>
                <DelinoIcon name={'icon_trash'} size={20} color={theme.colors.Error.Main} />
                <ErrorText style={{ color: theme.colors.Error.Main }}>{REMOVE}</ErrorText>
              </Item>
            </>
          ) : null}
        </View>
      </BottomSheet>
    </>
  );
}
