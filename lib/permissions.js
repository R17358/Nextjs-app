
export const roleHierarchy = {
  admin: ["school","management","principal", "teacher", "parents", "student"],
  school: ["management","principal", "teacher","parents", "student"],
  management: ["principal", "teacher","parents", "student"],
  principal: ["teacher","parents", "student"],
  teacher: ["parents","student"],
  parents: [],
  student: []
};

// CRUD permissions per role
export const permissions = {
  admin: {
    create: ["school","management","principal", "teacher","parents", "student", "self"],
    read: ["school","management","principal", "teacher","parents", "student", "self"],
    update: ["school","management","principal", "teacher","parents", "student", "self"],
    delete: ["school","management","principal", "teacher","parents", "student"],
  },
  school:{
    create: ["management","principal", "teacher","parents", "student"],
    read: ["management","principal", "teacher","parents", "student"],
    update: ["management","principal", "teacher","parents", "student"],
    delete: ["management","principal", "teacher","parents", "student"],
  },
  management:{
    create: ["principal", "teacher","parents", "student"],
    read: ["principal", "teacher","parents", "student"],
    update: ["principal", "teacher","parents", "student"],
    delete: ["principal", "teacher","parents", "student"],
  },
  principal: {
    create: ["teacher","parents", "student"],
    read: ["teacher","parents", "student"],
    update: ["teacher","parents", "student"],
    delete: ["teacher","parents", "student"],
  },
  teacher: {
    create: ["parents","student"],
    read: ["parents","student"],
    update: ["parents","student"],
    delete: ["parents","student"],
  },
  parents: {
    create: [],
    read: ["student","self"],   // sirf apna data read
    update: ["self"], // sirf apna data update
    delete: []        // apna bhi delete nahi kar sakta
  },
  student: {
    create: [],
    read: ["self"],   // sirf apna data read
    update: ["self"], // sirf apna data update
    delete: []        // apna bhi delete nahi kar sakta
  }
};
