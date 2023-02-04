import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import type { CreateActionCallback, RenderableComponent } from 'react-native-unicorn-modals';
import { CustomModalData } from './types';
import { BodyRegular, TitleXLarge } from '../../styles';
import { Button } from '../Button';
import { ButtonContainer } from './styles';

export const CustomModal: RenderableComponent<CustomModalData> = ({ WrapperComponent }) => {
  const preventTwice = useRef(true);
  function autoDismiss(onPress: () => void, actionCallback: any) {
    if (preventTwice.current) {
      setTimeout(() => {
        onPress();
        actionCallback()();
        console.log('loggg');
      }, 2000);
    }
    preventTwice.current = false;
  }
  return (
    <WrapperComponent style={styles.wrapper}>
      {({ title, description, buttons, autoHide }, actionCallback) => (
        <>
          {autoHide && autoDismiss(buttons[0].onPress, actionCallback)}
          <View style={{ height: '100%' }}>
            {title && <TitleXLarge style={styles.title}>{title}</TitleXLarge>}
            {description && (
              <BodyRegular style={{ textAlign: 'center', marginHorizontal: 24 }}>{description}</BodyRegular>
            )}
            {!autoHide && (
              <ButtonContainer>
                <Button
                  mode="Filled"
                  size="Default"
                  gestureDisabled
                  onPress={() => {
                    buttons[0].onPress();
                    //@ts-ignore
                    actionCallback()();
                  }}
                  minWidth={100}>
                  {buttons[0].title}
                </Button>
                {buttons[1] && (
                  //@ts-ignore
                  <Button mode="Text" size="Default" onPress={actionCallback()} minWidth={100} gestureDisabled>
                    {buttons[1].title}
                  </Button>
                )}
              </ButtonContainer>
            )}
          </View>
        </>
      )}
    </WrapperComponent>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    width: '80%',
    height: 196,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 18,
  },
  title: {
    paddingTop: 32,
    paddingBottom: 16,
    textAlign: 'center',
  },
});
