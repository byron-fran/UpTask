import mongoose from "mongoose"
import bcrypt from 'bcrypt'


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,

    },
    confirm: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true })



//
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.matchPassword = async function (enteredPassword : string) {
    return await bcrypt.compare(enteredPassword, this.password)
}
const User = mongoose.model('User', UserSchema);

export default User