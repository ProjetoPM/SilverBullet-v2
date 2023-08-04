import ProjectService from '../services/projectService';

export async function projectMiddleware(
  req,
  res,
  next,
  value,
  name,
) {
  try {
    const project = await new ProjectService(req).findById(
      value,
    );
    req.currentProject = project;
    next();
  } catch (error) {
    next(error);
  }
}
