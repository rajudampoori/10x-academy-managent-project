const mongoose = require("mongoose")

const ClassSchema = new mongoose.Schema({
    class: {type : String,required : true , unique : true},
    studentCount : {type : Number, required : true}
})

const Class = mongoose.model("Class",ClassSchema)

module.exports = Class;
