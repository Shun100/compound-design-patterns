import { Logger, TimestampDecorator, LogLevelDecorator } from "./basic/decorator.js";
import { DecoratorBuilder } from "./compound/decorator-builder.js";

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