export function isUserInProject(user, projectId: String) {
  if (!user) {
    return false;
  }

  return user.projects.some(
    (projectUser) =>
      String(projectUser.project.id) === String(projectId)
  );
}
