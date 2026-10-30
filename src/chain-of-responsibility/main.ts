import { ValidationBuilder } from "./validation-builder.js";
import { AlphabetValidationHandler, MinLengthValidationHandler, NotNullValidationHandler, type ValidationHandler } from "./validation-handler.js";

function runBasic(input: string) {
  const notNullValidationHandler = new NotNullValidationHandler();
  const alphabetValidationHandler = new AlphabetValidationHandler();
  const minLengthValidationHandler = new MinLengthValidationHandler();

  notNullValidationHandler.setNext(alphabetValidationHandler);
  alphabetValidationHandler.setNext(minLengthValidationHandler);

  const result = notNullValidationHandler.validate(input);
  console.log(`Validationの結果: ${result}`);
}

function runCompound(input: string) {
  const validationHandler: ValidationHandler = new ValidationBuilder()
    .addHandler(new NotNullValidationHandler())
    .addHandler(new AlphabetValidationHandler())
    .addHandler(new MinLengthValidationHandler())
    .build();
  
    const result = validationHandler.validate(input);
    console.log(`Validationの結果: ${result}`);
}

function main() {
  const input = 'Hello';
  runBasic(input);
  console.log('\n');
  runCompound(input);
}

main();