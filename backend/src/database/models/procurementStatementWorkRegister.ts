import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('procurementStatementWorkRegister');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProcurementStatementWorkRegisterSchema = new Schema(
    {
      descriptionItemPurchased: {
        type: String,
      },
      associatedContractTypes: {
        type: String,
      },
      vendorSelectionCriteria: {
        type: String,
      },
      restrictions: {
        type: String,
      },
      premises: {
        type: String,
      },
      mainDeliveriesSchedule: {
        type: String,
      },
      additionalInformation: {
        type: String,
      },
      procurementManagement: {
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

  ProcurementStatementWorkRegisterSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ProcurementStatementWorkRegisterSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProcurementStatementWorkRegisterSchema.set('toJSON', {
    getters: true,
  });

  ProcurementStatementWorkRegisterSchema.set('toObject', {
    getters: true,
  });

  return database.model('procurementStatementWorkRegister', ProcurementStatementWorkRegisterSchema);
};
