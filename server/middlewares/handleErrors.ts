import { logger } from "../utils/errors/logger";
import status from "statuses";

const handleErrors = (error, req, res, next) => {
  if (error === status.message[404]) {
    return res.status(404).json(logError(error));
  }

  return res.status(500).json(logError(error));
};

const logError = (error) => {
  logger.error(error);
  return { status: "error", message: error };
};

export default handleErrors;
