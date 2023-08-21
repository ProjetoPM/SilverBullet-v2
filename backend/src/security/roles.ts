class Roles {
  static get values() {
    return {
      admin: 'admin',
      student: 'student',
    };
  }

  static get projectValues(){
    return {
      projectAdmin: 'projectAdmin',
      projectManager: 'projectManager',
      projectDeveloper: 'projectDeveloper',
      projectStakeholder: 'projectStakeholder',
      projectProfessor: 'projectProfessor'
    }
  }
}

export default Roles;
