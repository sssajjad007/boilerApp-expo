import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Body } from '../../styles';

export const SearchBarContainer = styled.View`
  width: 100%;
  height: 48px;
  flex-direction: row-reverse;
  background-color: ${(p) => p.theme.colors.Gray[100]};
  border-radius: 16px;
`;
export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    flexDirection: 'row-reverse',
    backgroundColor: 'white',
    borderRadius: 16,
  },
  iconContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 11,
    alignItems: 'center',
    flexDirection: 'row-reverse',
    marginLeft: 16,
  },
  input: {
    flex: 1,
    ...Body.Regular,
    lineHeight: 18,
    paddingRight: 16,
  },
});
