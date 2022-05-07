import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TicketSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Tower' },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TicketSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
TicketSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'Tower'
})
