export interface ValidationExecutor {
  validate(input: string): boolean;
  getErrorMessage(): string
}