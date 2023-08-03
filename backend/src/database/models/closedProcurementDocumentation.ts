import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('closedProcurementDocumentation');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ClosedProcurementDocumentationSchema = new Schema(
    {
      providername: {
        type: String,
      },
      mainDeliveriesProject: {
        type: String,
      },
      validatorComments: {
        type: String,
      },
      supplierRepresentative: {
        type: String,
      },
      closingDate: {
        type: String,
      },
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

  ClosedProcurementDocumentationSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ClosedProcurementDocumentationSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ClosedProcurementDocumentationSchema.set('toJSON', {
    getters: true,
  });

  ClosedProcurementDocumentationSchema.set('toObject', {
    getters: true,
  });

  return database.model('closedProcurementDocumentation', ClosedProcurementDocumentationSchema);
};
