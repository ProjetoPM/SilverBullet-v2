import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProjectUserSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: 'project',
      required: true
    }
  },
  { timestamps: true },
);

ProjectUserSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

ProjectUserSchema.set('toJSON', {
  getters: true,
});

ProjectUserSchema.set('toObject', {
  getters: true,
});

export default ProjectUserSchema;
