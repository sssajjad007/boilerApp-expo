import React from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { Button } from '../../../components/Button';
import FormProvider from '../../../components/hook-form/FormProvider';
import RHFTextField from '../../../components/hook-form/RHFTextField';
import { login } from '../../../redux/slices/user';
import { BodyRegular, Container, Headline5, Logo, ScrollViewContainer } from '../../../styles';
import { InputContainer, TitleContainer, ButtonContainer, Header } from './styles';

type FormValues = {
  username: string;
  password: string;
};
const WELCOME = 'خوش آمدید';
const ENTER_DATA = 'اطلاعات ورود به سیستم مدیریت دلینو را وارد کنید';

export default function LoginScreen() {
  console.log('LoginScreen');
  const methods = useForm<FormValues>({
    defaultValues: {
      username: 'shila',
      password: 'sHILA-dELINO',
    },
  });
  // setTimeout(() => {
  //   onSubmit({ username: 'shila', password: 'sHILA-dELINO' });
  // }, 2000);
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async ({ username, password }: FormValues) => {
    console.log('fetch user ');
    const { success, errorMessage } = await login(username, password);
    if (!success) {
      setError('password', { type: 'custom', message: errorMessage });
    }
    Keyboard.dismiss();
  };

  return (
    <Container>
      <Header>
        <Logo />
      </Header>
      <ScrollViewContainer>
        <TitleContainer>
          <Headline5>{WELCOME}</Headline5>
          <BodyRegular>{ENTER_DATA}</BodyRegular>
        </TitleContainer>
        <InputContainer>
          <FormProvider methods={methods}>
            <RHFTextField
              name="username"
              title={'نام کاربری'}
              placeholder={'نام کاربری خود را وارد کنید.'}
              rules={{
                required: 'رمز عبور الزامی است',
              }}
            />
          </FormProvider>
        </InputContainer>
        <InputContainer>
          <FormProvider methods={methods}>
            <RHFTextField
              secureTextEntry
              name="password"
              title={'رمز عبور'}
              placeholder={'رمز عبور خود را وارد کنید.'}
              rules={{
                required: 'رمز عبور الزامی است',
              }}
              errors={errors.password?.message ? errors.password?.message : ''}
            />
          </FormProvider>
        </InputContainer>
      </ScrollViewContainer>
      <ButtonContainer>
        <Button
          // IconRight
          // iconName="icon_alert"
          loading={isSubmitting}
          mode="Filled"
          size="Large"
          onPress={handleSubmit(onSubmit)}>
          {'ورود'}
        </Button>
      </ButtonContainer>
    </Container>
  );
}
