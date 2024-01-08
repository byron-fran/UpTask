import {Prop, getModelForClass, Ref, } from '@typegoose/typegoose';
import  Proyect from './Proyects';

class Task {
 
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
        default : false
    })
    status! : boolean

    @Prop({
        default : Date.now()
    })
    deadline! : Date

    @Prop({
        
        enum : ['Low', 'Medium', 'High']
    })
    priority! : string

    @Prop({
        ref : () => Proyect
    })
    proyect! : Ref<typeof Proyect>
  

}

const TaskModel = getModelForClass(Task);
export default TaskModel