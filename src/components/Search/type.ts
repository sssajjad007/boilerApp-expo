export interface ISearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  onSearch?: (value: string) => void;
  onBlur?: () => void;
  onClear?: () => void;
}
