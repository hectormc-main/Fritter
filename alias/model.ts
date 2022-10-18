import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

export type Alias = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  aliasname: string;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Aliases stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const AliasSchema = new Schema({
  // The alias's name
  aliasname: {
    type: String,
    required: true
  }
});

const AliasModel = model<Alias>('Alias', AliasSchema);
export default AliasModel;
