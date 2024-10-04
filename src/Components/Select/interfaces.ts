export interface SelectComponentItem {
  value: string;
  label: string;
}

export interface SelectComponentProps {
  options: SelectComponentItem[];
  onChange: (value: SelectComponentItem) => void;
  clearValue?: () => void;
  label: string;
  placeholder?: string;
  onInputChange?: (value: string) => void;
  isLoading?: boolean;
  selectedOption?: SelectComponentItem | null;
}
