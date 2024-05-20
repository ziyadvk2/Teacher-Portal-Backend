// models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  mark: {
    type: Number,
    required: true,
  },
 
});
module.exports = Student = mongoose.model('students', StudentSchema);
