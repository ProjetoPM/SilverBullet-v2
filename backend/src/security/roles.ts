class Roles {
  static get values() {
    return {
      admin: 'admin',
      student: 'student',
    };
  }

  static get projectValues(){
    return {
      admin: 'admin',
      manager: 'manager',
      developer: 'developer',
      stakeholder: 'stakeholder',
      professor: 'professor'
    }
  }
}

export default Roles;
