const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskShema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: Object,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

const Task = mongoose.model("tasks", TaskShema);
module.exports = Task;
