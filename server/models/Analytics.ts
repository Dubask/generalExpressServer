import { Schema, model, Types } from 'mongoose'

const AnalyticsSchema = new Schema({
  id: Types.ObjectId,
  date_added: Date,
  date_started: Date,
  date_finished: Date,
  time_to_finish: String,
  book: Types.ObjectId,
})

module.exports = model('Analytics', AnalyticsSchema)
