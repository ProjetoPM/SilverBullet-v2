import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('changeRequest');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ChangeRequestSchema = new Schema(
    {
      requester: {
        type: String,
      },
      requestIdentificationNumber: {
        type: String,
      },
      typeChange: {
        type: String,
        enum: [
          "CorrectiveAction",
          "Preventive Action",
          "Defect Repair",
          "Update",
          null
        ],
      },
      statusSituation: {
        type: String,
        enum: [
          "Under Analysis",
          "Approved",
          "Rejected",
          "Canceled",
          "Suspended",
          null
        ],
      },
      requestDate: {
        type: String,
      },
      dateCCB: {
        type: String,
      },
      descriptionChange: {
        type: String,
      },
      impactedKnowledgeAreas: {
        type: String,
      },
      impactedDeliveriesDocuments: {
        type: String,
      },
      justification: {
        type: String,
      },
      additionalComments: {
        type: String,
      },
      opinionCCB: {
        type: String,
      },
      opinionProjectManager: {
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

  ChangeRequestSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ChangeRequestSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ChangeRequestSchema.set('toJSON', {
    getters: true,
  });

  ChangeRequestSchema.set('toObject', {
    getters: true,
  });

  return database.model('changeRequest', ChangeRequestSchema);
};
