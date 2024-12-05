export interface FieldProps {
  value: string;
  onChange: (newValue: string) => void;
  error?: string;
}
