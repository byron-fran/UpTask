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

//function to encrypt password
// UserModel.schema.pre('save', async function (next) {
//     // 'this' here refers to the document being saved
//     const doc = this as User & { isModified: (field: string) => boolean };
    
//     if (doc.isModified('password')) {
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(doc.password, salt);
//         doc.password = hash;
//     }
//     next();
// });

// function to compare password
UserModel.schema.method('matchPassword', async function (enteredPassword: string): Promise<boolean> {
    const doc = this as DocumentType<User>;
    return await bcrypt.compare(enteredPassword, doc.password);
});


export default UserModel;

