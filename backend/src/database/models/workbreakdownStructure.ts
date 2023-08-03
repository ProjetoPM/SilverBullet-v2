import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('workbreakdownStructure');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const WorkbreakdownStructureSchema = new Schema(
    {
      name: {
        type: String,
      },
      arquivo: [FileSchema],
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      importHash: { type: String },
    },
    { timestamps: true },
  );

  WorkbreakdownStructureSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  WorkbreakdownStructureSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  WorkbreakdownStructureSchema.set('toJSON', {
    getters: true,
  });

  WorkbreakdownStructureSchema.set('toObject', {
    getters: true,
  });

  return database.model('workbreakdownStructure', WorkbreakdownStructureSchema);
};
