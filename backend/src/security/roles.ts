class Roles {
  static get values() {
    return {
      admin: 'admin',
      student: 'student',
    };
  }

  static get projectValues(){
    return {
      admin: 'Admin',
      manager: 'Manager',
      developer: 'Developer',
      stakeholder: 'Stakeholder',
      professor: 'Professor'
    }
  }
}

export default Roles;
