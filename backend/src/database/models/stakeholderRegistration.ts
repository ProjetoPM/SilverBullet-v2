import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('stakeholderRegistration');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const StakeholderRegistrationSchema = new Schema(
    {
      nome: {
        type: String,
      },
      tipo: {
        type: String,
        enum: [
          "External",
          "Internal",
          null
        ],
      },
      mainRoleintheProject: {
        type: String,
        enum: [
          "Stakeholder",
          "Team",
          "Provider",
          "Project manager",
          "Sponsor",
          "Others",
          null
        ],
      },
      organization: {
        type: String,
      },
      positioninOrganization: {
        type: String,
      },
      email: {
        type: String,
      },
      mainProjectResponsibility: {
        type: String,
      },
      phone: {
        type: String,
      },
      workplace: {
        type: String,
      },
      essentialRequirements: {
        type: String,
      },
      mainExpectations: {
        type: String,
      },
      phaseofGreaterInterest: {
        type: String,
      },
      observations: {
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

  StakeholderRegistrationSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  StakeholderRegistrationSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  StakeholderRegistrationSchema.set('toJSON', {
    getters: true,
  });

  StakeholderRegistrationSchema.set('toObject', {
    getters: true,
  });

  return database.model('stakeholderRegistration', StakeholderRegistrationSchema);
};
