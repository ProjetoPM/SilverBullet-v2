import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('lessonLearnedRegister');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const LessonLearnedRegisterSchema = new Schema(
    {
      stakeholderWhoIdentified: {
        type: String,
      },
      identificationDate: {
        type: String,
      },
      situationDescription: {
        type: String,
      },
      category: {
        type: String,
      },
      whoCouldBeInterested: {
        type: String,
      },
      status: {
        type: String,
      },
      impact: {
        type: String,
      },
      recommendations: {
        type: String,
      },
      associatedLifeCycleStage: {
        type: String,
      },
      associatedKnowledgeArea: {
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

  LessonLearnedRegisterSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  LessonLearnedRegisterSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  LessonLearnedRegisterSchema.set('toJSON', {
    getters: true,
  });

  LessonLearnedRegisterSchema.set('toObject', {
    getters: true,
  });

  return database.model('lessonLearnedRegister', LessonLearnedRegisterSchema);
};
