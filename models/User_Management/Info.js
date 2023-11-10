import mongoose from "mongoose";

const InfoSchema = new mongoose.Schema({
    User:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Address: {
        type: String,
        require: true
    },
    Phone: {
        type: String,
        require: true
    },
    Gender: {
        type: String,
        enum: ['Nam', 'Nữ'],
        required: true
    }
})

const Info = mongoose.model('Info', InfoSchema); 

export default Info
