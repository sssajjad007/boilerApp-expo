import React from 'react';
import { FormProvider as Form } from 'react-hook-form';
import { FormProps } from './type';

export default function FormProvider({ children, methods }: FormProps) {
  return <Form {...methods}>{children}</Form>;
}
