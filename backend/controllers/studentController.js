const Student = require("../models/Student");

// Create a new student
const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all students with search, filter and pagination
const getAllStudents = async (req, res) => {
  try{
    const{
      search,
      course,
      department,
      page = 1,
      limit = 5
    } = req.query;

    // Build filter
    const filter = {};

    // Search by name, email or student ID
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i"} },
        { email: { $regex: search, $options: "i"} },
        { studentId: { $regex: search, $options: "i"} }
      ];  
    }

    // Filter by course
    if (course) {
      filter.department = department;
    }

    // Pagination
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    // Get students
    const students = await Student.find(filter)
        .sort({ createdAt: -1})
        .skip(skip)
        .limit(limitNumber);

    // Total student matching filter
    const totalStudents = await Student.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: students.length,
      totalStudents,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalStudents / limitNumber),
      students
    });

  }catch(error){
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single student
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get student statistics
const getStudentStats = async (req, res) => {
  try{
    const totalStudents = await Student.countDocuments();

    const maleStudents = await Student.countDocuments({
      gender: "Male"
    });

    const femaleStudents = await Student.countDocuments({
      gender: "Female"
    });

    const OtherStudents = await Student.countDocuments({
      gender: "Other"
    });

    const totalCourse = await Student.distinct("course");

    const totalDepartments = await Student.distinct("department");

    res.status(200).json({
      success: true,
      statistics: {
        totalStudents,
        maleStudents,
        femaleStudents,
        OtherStudents,
        totalCourse: totalCourse.length,
        totalDepartments: totalDepartments.length
      }
    });

  }catch(error){
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}



module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentStats
};
