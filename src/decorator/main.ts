import { Logger, TimestampDecorator, LogLevelDecorator } from "./decorator.js";
import { DecoratorBuilder } from "./decorator-builder.js";

function runBasic() {
  const logger = new Logger();
  const timestampDecorator = new TimestampDecorator(logger);
  const logLevelDecorator = new LogLevelDecorator(timestampDecorator, 'INFO');

  const logMessage = logLevelDecorator.getLogMessage('Hello, Decorator');
  console.log(logMessage);
}

function runCompound() {
  const logger = new DecoratorBuilder()
    .addDecorator(component => new TimestampDecorator(component))
    .addDecorator(component => new LogLevelDecorator(component, 'INFO'))
    .build();
  
  const logMessage = logger.getLogMessage('Hello, Compound decorator');
  console.log(logMessage);
}

function main() {
  runBasic();
  runCompound();
}

main();