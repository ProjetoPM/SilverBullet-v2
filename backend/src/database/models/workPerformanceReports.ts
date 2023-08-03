import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('workPerformanceReports');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const WorkPerformanceReportsSchema = new Schema(
    {
      responsible: {
        type: String,
      },
      mainActivitiesExecution: {
        type: String,
      },
      upcomingActivitiesPerform: {
        type: String,
      },
      generalComments: {
        type: String,
      },
      issues: {
        type: String,
      },
      changes: {
        type: String,
      },
      risks: {
        type: String,
      },
      attentionPoints: {
        type: String,
      },
      date: {
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

  WorkPerformanceReportsSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  WorkPerformanceReportsSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  WorkPerformanceReportsSchema.set('toJSON', {
    getters: true,
  });

  WorkPerformanceReportsSchema.set('toObject', {
    getters: true,
  });

  return database.model('workPerformanceReports', WorkPerformanceReportsSchema);
};
