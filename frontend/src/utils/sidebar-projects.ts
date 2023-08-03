export const setDataHiddenProjects = (isHidden: boolean) => {
  const hidden = isHidden ? 'true' : 'false'
  document.getElementById('projects')?.setAttribute('data-hidden', hidden)
}
