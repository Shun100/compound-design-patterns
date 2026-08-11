import { LoggerFactory } from "./api.js";

function main() {
  const { infoLogger } = LoggerFactory.getLogger();
  const message = 'This is a sample log message.';
  infoLogger.log(message);
}

main();