import { Schema,model } from "mongoose";
export interface Work{
    id:string;
    name:string;  
    description:string; 
    email:string; 
    location:String;
    bname:string;
    category:string;
    district:string;
}
export const WorkSchema = new Schema<Work>(
    {
        name:{type:String, required:true},  
        description:{type:String, required:true},  
        email:{type:String, required:true}, 
        location:{type:String, required:true}, 
        bname:{type:String, required:true}, 
        category:{type:String, required:true}, 
        district:{type:String, required:true}, 
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
export const WorkModel = model<Work>('work', WorkSchema);