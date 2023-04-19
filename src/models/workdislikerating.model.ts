import { Schema,model } from "mongoose";
export interface WorkDisLikeRating{
    id:string;
    workid:string;  
    cusid:string;  
}
export const WorkDisLikeRatingSchema = new Schema<WorkDisLikeRating>(
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
export const WorkDisLikeRatingRatingModel = model<WorkDisLikeRating>('WorkDisLikeRating', WorkDisLikeRatingSchema);