import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
    },
    IsAdmin: {
        type: Boolean,
        default: false
    },
    Info:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Info'
    },
})

const User = mongoose.model('User', userSchema); 

export default User