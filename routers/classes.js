const Class = require("../models/classes")
const express = require("express")
const studentrouter = require("./students")

const classrouter = express.Router()


classrouter.post("/v1/myClass", async (req, res) => {
    try {
        const newClass = new Class({
            class: req.body.class,
            studentCount: req.body.studentCount
        })
        const savedClass = await newClass.save()
        res.status(201).json({
            status: "Success",
            savedClass
        })
    } catch (err) {
        res.status(500).json({
            status: "Failure",
            message: err.message
        })
    }
})

classrouter.get("/v1/myClass", async (req, res) => {
    try {
        const myclass = await Class.find()
        res.status(201).json({
            status: "Success",
            myclass
        })
    } catch (err) {
        res.status(400).json({
            status: "Failure",
            message: err.message
        })
    }
})

classrouter.get("/v1/myClass/:classId", async (req, res) => {
    try {
        const myclass = await Class.findById(req.params.classId)
        res.status(201).json({
            status: "Success",
            myclass
        })
    } catch (err) {
        res.status(400).json({
            status: "Failure",
            message: err.message
        })
    }
})

// classrouter.get("/api/v1/classes/:classid", async (req, res) => {
//     try {
//         console.log(req.body)
//         const myclass = await Classes.findOne({ _id: req.params.id })
//         console.log(myclass)
//         res.status(201).json({
//             status: "Success",
//             myclass
//         })
//     } catch (err) {
//         res.status(400).json({
//             ststus: "Failure",
//             message: err.message
//         })
//     }
// })


// classrouter.get("/api/v1/classes/:classid/students", async (req, res) => {
//     try {
//         const myclass = await Classes.find()
//         res.status(201).json({
//             status: "Success",
//             myclass
//         })
//     } catch (err) {
//         res.status(400).json({
//             ststus: "Failure",
//             message: "There are no students at the class"
//         })
//     }
// })


// classrouter.get("/api/v1/classes/:classid", async (req, res) => {
//     try {
//         console.log(req.body)
//         const myclass = await Classes.findOne({ _id: req.params.id })
//         console.log(myclass)
//         res.status(201).json({
//             status: "Success",
//             myclass
//         })
//     } catch (err) {
//         res.status(400).json({
//             ststus: "Failure",
//             message: err.message
//         })
//     }
// })


classrouter.delete("/v1/myClass/:classId", async (req, res) => {
    try {
        const classId = req.params.classId;
        const classExists = await Class.findById(classId)
        if (!classExists) {
            res.status(401).json({ error: "Class not found" })
        }
        const myclass = await Class.deleteOne({ _id: classId })
        res.status(201).json({
            status: "Success",
            myclass
        })
    } catch (err) {
        res.status(400).json({
            status: "Failure",
            message: err.message
        })
    }
})


module.exports = classrouter