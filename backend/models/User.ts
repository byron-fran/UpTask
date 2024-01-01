import { prop, getModelForClass, DocumentType } from '@typegoose/typegoose';
import bcrypt from 'bcrypt';

class User {
    @prop({
        required: true,
        trim: true
    })
    name!: string;

    @prop({
        required: true,
        trim: true,
        unique : true
    })
    email!: string;

    @prop({
        required: true,
        minlength: 6,
    })
    password!: string;

    @prop({
        default: false
    })
    confirm!: boolean;

    @prop()
    token!: string;
}

const UserModel = getModelForClass(User);


// function to compare password
UserModel.schema.method('matchPassword', async function (enteredPassword: string): Promise<boolean> {
    const doc = this as DocumentType<User>;
    return await bcrypt.compare(enteredPassword, doc.password);
});


export default UserModel;

