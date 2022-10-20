import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

export type Proliferate = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  aliasId: Types.ObjectId; // User who proliferated
  contentId: Types.ObjectId; // Content that was proliferated
};

const ProliferateSchema = new Schema({
  aliasId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  contentId: {
    type: String,
    required: true
  }
});

const ProliferateModel = model<Proliferate>('Proliferate', ProliferateSchema);
export default ProliferateModel;
