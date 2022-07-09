'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const logger_1 = require('../utils/errors/logger')
const statuses_1 = __importDefault(require('statuses'))
const handleErrors = (error, req, res, next) => {
  if (error === statuses_1.default.message[404]) {
    return res.status(404).json(logError(error))
  }
  return res.status(500).json(logError(error))
}
const logError = error => {
  logger_1.logger.error(error)
  return { status: 'error', message: error }
}
exports.default = handleErrors
//# sourceMappingURL=handleErrors.js.map
