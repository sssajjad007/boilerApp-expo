import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

export interface ICustomBackdropProps extends BottomSheetBackdropProps {
  close?: () => void;
  index: number;
}
