import { Schema,model } from "mongoose";
export interface AdminNote{
    id:string;
    note:string; 
     

}
export const AdminNoteRequestSchema = new Schema<AdminNote>(
    {
        note:{type:String, required:true}, 
         
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
export const AdminNoteModel = model<AdminNote>('AdminNote', AdminNoteRequestSchema);