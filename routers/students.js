const Student = require("../models/students");
const Class = require("../models/classes")
const express = require("express")

const studentrouter = express.Router();

studentrouter.post("/v1/myClass/:myClassId/students", async (req, res) => {
    try {
        const classId = req.params.myClassId;
        const classExists = await Class.findById(classId)
        if (!classExists) {
            return res.status(404).json({ error: "Class not found" })
        }
        const student = new Student({
            name : req.body.name,
            classId : classId
        })
        const myStudent = await student.save()
        // classExists.students.push(Student)
        // await classExists.save()
        res.status(201).json({
            status: "Success",
            myStudent
        })
    } catch (err) {
        res.status(400).json({
            status: "Failure",
            message: err.message
        })
    }
})


studentrouter.get("/v1/myClass/:classId/students", async (req, res) => {
    try {
        const classId = req.params.classId;
        const classExists = await Class.findById(classId)
        if (!classExists) {
            return res.status(404).json({ error: "Class not found" })
        }
        // const myStudents = classExists.students.find()
        const myStudents = await Student.find() 
        //see again
        res.status(201).json({
            status: "Success",
            myStudents
        })
    } catch (err) {
        res.status(400).json({
            status: "Failure",
            message: err.message
        })
    }
})

studentrouter.get("/v1/myClass/:classId/students/:studentId", async (req, res) => {
    try {
        const { classId, studentId } = req.params;
        const classExists = await Class.findById(classId)
        if (!classExists) {
            return res.status(404).json({ error: "Class not found" })
        }
        const studentExists = await Student.findById(studentId)
        if (!studentExists) {
            return res.status(404).json({ error: "Student not found" })
        }
        const mySudent = await Student.findOne({ _id: studentId })
        res.status(201).json({
            status: "Success",
            mySudent
        })
    } catch (err) {
        res.status(400).json({
            status: "Failure",
            message: "There is no student of that id"
        })
    }
})

studentrouter.put("/v1/myClass/:classId/students/:studentId", async (req, res) => {
    try {
        const { classId, studentId } = req.params;
        const { name } = req.body;
        const classExists = await Class.findById(classId)
        if (!classExists) {
            return res.status(404).json({ error: "Class not found" })
        }
        const studentExists = await Student.findById(studentId)
        if (!studentExists) {
            return res.status(404).json({ error: "Student not found" })
        }
        studentExists.name = name;
        await studentExists.save()
        res.status(201).json({
            status: "Success",
            studentExists
        })
    } catch (err) {
        res.status(400).json({
            status: "Failure",
            message: "There is no student of that id"
        })
    }
})

studentrouter.delete("/v1/myClass/:classId/students/:studentId", async (req, res) => {
    try {
        // const { classId, studentId } = req.params;
        const classId = req.params.classId;
        const studentId = req.params.studentId;
        const classExists = await Class.findById(classId)
        if (!classExists) {
            return res.status(404).json({ error: "Class not found" })
        }
        const studentExists = await Student.findById(studentId)
        if (!studentExists) {
            return res.status(404).json({ error: "Student not found" })
        }
        // classExists.students.pull({ _id: studentId })
        // await classExists.save()
        const myclass = await Student.deleteOne({ _id: req.params.studentId })
        res.status(201).json({
            status: "Success",
            message: "Student deleted  successfully"
        })
    } catch (err) {
        res.status(400).json({
            status: "Failure",
            message: "There is no student of that id"
        })
    }
})

module.exports = studentrouter




