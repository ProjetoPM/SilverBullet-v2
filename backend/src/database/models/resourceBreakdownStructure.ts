import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('resourceBreakdownStructure');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ResourceBreakdownStructureSchema = new Schema(
    {
      name: [FileSchema],
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true
      },
      project: {
        type: Schema.Types.ObjectId,
        ref: 'project',
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

  ResourceBreakdownStructureSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ResourceBreakdownStructureSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ResourceBreakdownStructureSchema.set('toJSON', {
    getters: true,
  });

  ResourceBreakdownStructureSchema.set('toObject', {
    getters: true,
  });

  return database.model('resourceBreakdownStructure', ResourceBreakdownStructureSchema);
};
