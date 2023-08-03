import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('projectCharter');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProjectCharterSchema = new Schema(
    {
      projectName: {
        type: String,
      },
      highLevelProjectDescription: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 2000,
      },
      startdate: {
        type: String,
      },
      enddate: {
        type: String,
      },
      projectPurpose: {
        type: String,
      },
      measurableProjectObjectives: {
        type: String,
        minlength: 5,
        maxlength: 2000,
      },
      keyBenefits: {
        type: String,
      },
      highlevelRequirements: {
        type: String,
        maxlength: 2000,
      },
      boundaries: {
        type: String,
        maxlength: 2000,
      },
      overallProjectRisk: {
        type: String,
        maxlength: 2000,
      },
      summaryMilestoneSchedule: {
        type: String,
        maxlength: 2000,
      },
      preapprovedFinancialResources: {
        type: String,
        maxlength: 2000,
      },
      projectApprovalRequirements: {
        type: String,
        maxlength: 2000,
      },
      successCriteria: {
        type: String,
        maxlength: 2000,
      },
      projectExitCriteria: {
        type: String,
        maxlength: 2000,
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

  ProjectCharterSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ProjectCharterSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProjectCharterSchema.set('toJSON', {
    getters: true,
  });

  ProjectCharterSchema.set('toObject', {
    getters: true,
  });

  return database.model('projectCharter', ProjectCharterSchema);
};
