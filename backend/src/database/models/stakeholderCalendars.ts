import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('stakeholderCalendars');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const StakeholderCalendarsSchema = new Schema(
    {
      activity: {
        type: Schema.Types.ObjectId,
        ref: 'activityList',
      },
      stakeholder: {
        type: Schema.Types.ObjectId,
        ref: 'stakeholderRegistration',
      },
      allocationStart: {
        type: String,
      },
      allocationEnds: {
        type: String,
      },
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

  StakeholderCalendarsSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  StakeholderCalendarsSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  StakeholderCalendarsSchema.set('toJSON', {
    getters: true,
  });

  StakeholderCalendarsSchema.set('toObject', {
    getters: true,
  });

  return database.model('stakeholderCalendars', StakeholderCalendarsSchema);
};
