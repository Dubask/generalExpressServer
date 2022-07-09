'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = require('mongoose')
const AnalyticsSchema = new mongoose_1.Schema({
  id: mongoose_1.Types.ObjectId,
  date_added: Date,
  date_started: Date,
  date_finished: Date,
  time_to_finish: String,
  book: mongoose_1.Types.ObjectId,
})
module.exports = (0, mongoose_1.model)('Analytics', AnalyticsSchema)
//# sourceMappingURL=Analytics.js.map
