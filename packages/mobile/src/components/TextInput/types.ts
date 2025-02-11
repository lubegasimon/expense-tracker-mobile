export interface SignupFormFieldProps {
  value: string;
  onChangeText: (newValue: string) => void;
  error?: string;
  label: string;
}
