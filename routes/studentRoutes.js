const mongoose = require('mongoose');
const Student = mongoose.model("students");
const validateStudentInput = require("../validation/studentValidator")
const  ensureAuthentication  = require('../middlewares/ensureAuthentication'); 

module.exports = (app) =>{

// Retrieve all students
app.get('/api/allstudents',ensureAuthentication, async (req, res) => {
  try {
    const students = await Student.find().populate('_user', 'email');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve a student by ID
app.get('/api/student/:id',ensureAuthentication, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('_user', 'email');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create or update a student
app.post('/api/newstudent', ensureAuthentication, async (req, res) => {
  const { errors, isValid } = validateStudentInput(req.body);
  const { name, subjectName, mark } = req.body;

  if (!isValid) {
    if (!firstName) {
      return res.status(400).json({ message: errors.name });
    } else if (!lastName) {
      return res.status(400).json({ message: errors.subjectName });
    } else if (!email) {
      return res.status(400).json({ message: errors.mark });
    } else {
      return res.status(400).json({ message: "Inputs Invalid" });
    }
  }

  try {
    let student = await Student.findOne({ name, subjectName });
    if (student) {
      student.mark = mark;
      student = await student.save();
    } else {
      student = new Student({
        name,
        subjectName,
        mark,
        _user: req.user._id, 
      });
      student = await student.save();
    }
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update a student by ID
app.put('/api/student/:id', ensureAuthentication, async (req, res) => {
  const { errors, isValid } = validateStudentInput(req.body);
  const { id } = req.params;
  const updatedData = req.body;
  
  if (!isValid) {
    if (!firstName) {
      return res.status(400).json({ message: errors.name });
    } else if (!lastName) {
      return res.status(400).json({ message: errors.subjectName });
    } else if (!email) {
      return res.status(400).json({ message: errors.mark });
    } else {
      return res.status(400).json({ message: "Inputs Invalid" });
    }
  }

  try {
    const student = await Student.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a student by ID
app.delete('/api/student/:id', ensureAuthentication, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    await student.remove();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


}
