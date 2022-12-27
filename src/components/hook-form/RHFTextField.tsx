import React from 'react';
import { useFormContext, Controller, UseFormReturn } from 'react-hook-form';
import { TextError } from '../../styles';
import Input from '../Input';
import { IFormProvider } from './type';

// interface IFormProvider extends Omit<UseFormReturn, 'watch'> {
//   //without watch
//   name: string;
//   rules: { [key: string]: string }; //todo
// }

export default function RHFTextField({ name, rules = {}, title, placeholder, ...porps }: IFormProvider) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error, isTouched } }) => {
        const { onChange, value } = field;
        return (
          <>
            <Input
              mode="flat"
              title={title}
              value={value}
              onChangeText={onChange}
              // placeholder={placeholder}
              {...porps}
            />
          </>
        );
      }}
    />
  );
}
