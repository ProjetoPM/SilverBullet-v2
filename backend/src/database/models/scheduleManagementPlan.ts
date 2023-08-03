import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('scheduleManagementPlan');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ScheduleManagementPlanSchema = new Schema(
    {
      projectScheduleModelDevelopment: {
        type: String,
      },
      levelAccuracy: {
        type: String,
      },
      organizationalProceduresLinks: {
        type: String,
      },
      projectScheduleModelMaintenance: {
        type: String,
      },
      performanceMeasurementRules: {
        type: String,
      },
      reportingFormats: {
        type: String,
      },
      releaseIterationLength: {
        type: String,
      },
      controlThresholds: {
        type: String,
      },
      unitsMeasure: {
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

  ScheduleManagementPlanSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ScheduleManagementPlanSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ScheduleManagementPlanSchema.set('toJSON', {
    getters: true,
  });

  ScheduleManagementPlanSchema.set('toObject', {
    getters: true,
  });

  return database.model('scheduleManagementPlan', ScheduleManagementPlanSchema);
};
