import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('issueLog');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const IssueLogSchema = new Schema(
    {
      responsibleIdentifying: {
        type: String,
      },
      identificationDate: {
        type: String,
      },
      issueDescription: {
        type: String,
      },
      issueType: {
        type: String,
      },
      issueResponsible: {
        type: String,
      },
      situation: {
        type: String,
      },
      requiredAction: {
        type: String,
      },
      comments: {
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

  IssueLogSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  IssueLogSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  IssueLogSchema.set('toJSON', {
    getters: true,
  });

  IssueLogSchema.set('toObject', {
    getters: true,
  });

  return database.model('issueLog', IssueLogSchema);
};
