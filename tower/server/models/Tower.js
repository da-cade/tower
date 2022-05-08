import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TowerSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    coverImg: { type: String },
    description: { type: String },
    isPrivate: { type: Boolean, default: false },
    isCanceled: { type: Boolean, default: false, required: true },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TowerSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
