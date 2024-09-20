// TaskSchema.js
export const TaskSchema = {
  name: 'Task',
  properties: {
    _id: 'int',
    name: 'string',
    isComplete: 'bool',
  },
  primaryKey: '_id',
};

export const userSchema = {
  name: 'User',
  properties: {
    _id: 'int',
    name: 'string',
    phoneNo: 'string',
    address: 'string',
  },
  primaryKey: '_id',
};
