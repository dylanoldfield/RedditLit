export interface FormField{
  value: string;
  error?: FormError;
}

export interface FormError {
  errorMessage: string
}