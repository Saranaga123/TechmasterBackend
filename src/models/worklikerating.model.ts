import { Schema,model } from "mongoose";
export interface WorkLikeRating{
    id:string;
    workid:string;  
    cusid:string;  
}
export const WorkLikeRatingSchema = new Schema<WorkLikeRating>(
    {
        workid:{type:String, required:true},   
        cusid:{type:String, required:true},  
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
export const WorkLikeRatingRatingModel = model<WorkLikeRating>('WorkLikeRating', WorkLikeRatingSchema);