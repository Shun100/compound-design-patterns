import { ValidationBuilder } from "./validation/builder/ValidationBuilder.js";
import { AlphabetValidationExecutor } from "./validation/executor/alphabet-validation-executor.js";
import { BlankValidationExecutor } from "./validation/executor/blank-validation-executor.js";
import { LengthValidationExecutor } from "./validation/executor/length-validation-executor.js";

function main() {
  const validationHandler = new ValidationBuilder()
    .addExecutor(new BlankValidationExecutor())
    .addExecutor(new AlphabetValidationExecutor())
    .addExecutor(new LengthValidationExecutor())
    .build();
  
  const input = 'password';

  const result = validationHandler.validate(input);
  const isValid = result.isValid;

  console.log(isValid);
  
  if (!isValid) {
    console.log(result.errorMessage);
  }
}

main();