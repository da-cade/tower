import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TowerSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Profile' },
    name: { type: String, required: true },
    description: { type: String },
    coverImg: { type: String },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    startDate: { type: Date, required: true },
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
  ref: 'Profile'
})
