import { Prop, getModelForClass, Ref } from "@typegoose/typegoose";
import User from "./User";

class Proyect  {

    @Prop({
        required : true,
        trim : true
    })
    name! : string

    @Prop({
        required : true,
        trim : true
    })
    description! : string

    @Prop({
        required : true,
        default : Date.now()
    })
    deadline! : Date

    @Prop({
        trim : true
    })
    client! : string

    @Prop({ ref : () => User })
    creator! : Ref<typeof User>


    @Prop({
        ref : () => User
    })
    colaborators! : Ref<typeof User>[]
}


const ProyectModel = getModelForClass(Proyect);
export default ProyectModel
