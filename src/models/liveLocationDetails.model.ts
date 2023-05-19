import { Schema,model } from "mongoose";
export interface goLive{
    id:string;
    providerid:string;
    lon:string; 
    lat:String;
    activated:string;

}
export const goLiveSchema = new Schema<goLive>(
    {
        providerid:{type:String, required:true},
        lon:{type:String, required:true},
        lat:{type:String, required:true},
        activated:{type:String, required:true}, 
         
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
export const goLiveModel = model<goLive>('goLive', goLiveSchema);