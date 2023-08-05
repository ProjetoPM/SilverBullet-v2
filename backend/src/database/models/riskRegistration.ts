import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('riskRegistration');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const RiskRegistrationSchema = new Schema(
    {
      impactedObjective: {
        type: String,
      },
      priority: {
        type: String,
        enum: [
          "Low",
          "Medium",
          "High",
          null
        ],
      },
      currentRiskStatus: {
        type: String,
      },
      event: {
        type: String,
      },
      identificationDate: {
        type: String,
      },
      identifier: {
        type: String,
      },
      riskType: {
        type: String,
      },
      lessonsLearned: {
        type: String,
      },
      riskCategory: {
        type: String,
      },
      fallbackPlans: {
        type: String,
      },
      contingencyPlansOwners: {
        type: String,
      },
      contingencyPlans: {
        type: String,
      },
      secondaryRisks: {
        type: String,
      },
      residualRisks: {
        type: String,
      },
      timingInformation: {
        type: String,
      },
      potentialRiskOwners: {
        type: String,
      },
      listPotentialRiskResponses: {
        type: String,
      },
      riskTriggers: {
        type: String,
      },
      oneOrMoreCauses: {
        type: String,
      },
      riskStrategy: {
        type: String,
      },
      oneMoreEffectsObjectives: {
        type: String,
      },
      riskScore: {
        type: String,
      },
      impact: {
        type: String,
      },
      probability: {
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

  RiskRegistrationSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  RiskRegistrationSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  RiskRegistrationSchema.set('toJSON', {
    getters: true,
  });

  RiskRegistrationSchema.set('toObject', {
    getters: true,
  });

  return database.model('riskRegistration', RiskRegistrationSchema);
};
