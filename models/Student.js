import mongoose from 'mongoose';

const { Schema } = mongoose;

const StudentSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
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
},{ timestamps: true });

const Student = mongoose.model('students', StudentSchema);

export default Student;
