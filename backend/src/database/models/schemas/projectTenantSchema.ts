import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProjectTenantSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: 'project',
      required: true
    }
  },
  { timestamps: true },
);

ProjectTenantSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

ProjectTenantSchema.set('toJSON', {
  getters: true,
});

ProjectTenantSchema.set('toObject', {
  getters: true,
});

export default ProjectTenantSchema;
