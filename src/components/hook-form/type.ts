import type { PropsWithChildren } from 'react';
import { FieldValues, RegisterOptions, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { StyleProp, TextInputProps, TextStyle } from 'react-native';

export type FormProps = PropsWithChildren<{
  methods: UseFormReturn<{ username: string; password: string }>;
}>;
export interface IFormProvider extends TextInputProps {
  errors?: string;
  clearButton?: boolean;
  limit?: number;
  name: string;
  rules?: Pick<RegisterOptions<FieldValues>, 'maxLength' | 'minLength' | 'validate' | 'required'>;
  title: string;
  placeholder: string;
  focused?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  inputHeightState?: number;
  hasError?: boolean;
  style?: StyleProp<TextStyle>;
}
