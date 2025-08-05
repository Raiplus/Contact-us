import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    quarry:
    {
        type: String,
        required: true
    }
});


const User = mongoose.model("User", userSchema);
export { User }
