import { Schema,model } from "mongoose";
export interface WorkImage{
    id:string;
    workid:string; 
    photo:string; 
}
export const WorkImageSchema = new Schema<WorkImage>(
    {
        workid:{type:String, required:true}, 
        photo:{type:String, required:true} 
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:false
        },
        timestamps:true
    }
);
export const WorkImageModel = model<WorkImage>('workimage', WorkImageSchema);