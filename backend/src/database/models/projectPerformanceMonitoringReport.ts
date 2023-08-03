import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('projectPerformanceMonitoringReport');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProjectPerformanceMonitoringReportSchema = new Schema(
    {
      currentPerformanceAnalysis: {
        type: String,
      },
      forecastsAsPlanned: {
        type: String,
      },
      forecastsConsideringCurrentlyPerformance: {
        type: String,
      },
      currentRiskSituation: {
        type: String,
      },
      currentStatusIssues: {
        type: String,
      },
      workCompletedDuringPeriod: {
        type: String,
      },
      workToBeCompletedNextPeriod: {
        type: String,
      },
      summaryChangesApprovedInThePeriod: {
        type: String,
      },
      earnedValueManagement: {
        type: String,
      },
      otherRelevantInformation: {
        type: String,
      },
      dateReport: {
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

  ProjectPerformanceMonitoringReportSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ProjectPerformanceMonitoringReportSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProjectPerformanceMonitoringReportSchema.set('toJSON', {
    getters: true,
  });

  ProjectPerformanceMonitoringReportSchema.set('toObject', {
    getters: true,
  });

  return database.model('projectPerformanceMonitoringReport', ProjectPerformanceMonitoringReportSchema);
};
