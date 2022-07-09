import { logger } from "./logger";
import bunyan from "bunyan";
import { BaseError } from "./BaseError";

export class ErrorHandler {
  logger: bunyan;

  constructor(logger: bunyan) {
    this.logger = logger;
  }

  public async handleError(err: Error): Promise<void> {
    logger.error(err);
  }

  public isTrustedError(error: Error) {
    return error instanceof BaseError && error.isOperational;
  }
}
