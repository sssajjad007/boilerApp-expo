import React, { forwardRef, Ref } from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from 'styled-components/native';
import { DelinoIcon } from '../Icon';
import { IconButton } from '../IconButton';
import { styles, SearchBarContainer } from './styles';
import { ISearchBarProps } from './type';

function SearchBarComponent(props: ISearchBarProps, ref: Ref<TextInput>) {
  const { onChangeText, value, placeholder, onBlur, onClear } = props;
  const theme = useTheme();
  function onClearPress() {
    onChangeText('');
    onClear && onClear();
  }
  return (
    <SearchBarContainer>
      <View style={styles.inputContainer}>
        <DelinoIcon name={'icon_search'} size={20} color={theme.colors.Gray[0]} />
        <TextInput
          ref={ref}
          onBlur={onBlur}
          style={[styles.input]}
          textAlign={'right'}
          value={value}
          placeholder={placeholder || 'جستجو...'}
          onChangeText={onChangeText}
          // autoFocus={true}
        />
      </View>
      <View style={styles.iconContainer}>
        {value && (
          <IconButton
            Icon={() => <DelinoIcon name={'icon_cross-circle'} size={20} color={theme.colors.Gray[0]} />}
            onPress={onClearPress}
          />
        )}
      </View>
    </SearchBarContainer>
  );
}
export const SearchBar = forwardRef(SearchBarComponent);
