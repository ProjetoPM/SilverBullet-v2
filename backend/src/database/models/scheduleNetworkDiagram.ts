import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('scheduleNetworkDiagram');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ScheduleNetworkDiagramSchema = new Schema(
    {
      activityName: {
        type: String,
      },
      predecessorActivity: {
        type: String,
        enum: [
          "Finish-to-Start(FS)",
          "Finish-to-Finish(FF)",
          "Start-to-Start(SS)",
          "Start-to-Finish(SF)",
          null
        ],
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

  ScheduleNetworkDiagramSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ScheduleNetworkDiagramSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ScheduleNetworkDiagramSchema.set('toJSON', {
    getters: true,
  });

  ScheduleNetworkDiagramSchema.set('toObject', {
    getters: true,
  });

  return database.model('scheduleNetworkDiagram', ScheduleNetworkDiagramSchema);
};
