const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({
    name : {type : String,required : true },
    classId : {type : mongoose.Schema.Types.ObjectId, ref : "Class"}
})

const Student = mongoose.model("Student",StudentSchema);
module.exports = Student;

