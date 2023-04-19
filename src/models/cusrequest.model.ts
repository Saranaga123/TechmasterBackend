import { Schema,model } from "mongoose";
export interface CusReq{
    id:string;
  cusid:string;
  cusemail:string;
  cusmobile:string;
  cusname:string;
  workid:string;
  providerid:string;
  providerName:string;
  workName:string;
  status:string;
}
export const CusReqSchema = new Schema<CusReq>(
    {
        cusid:{type:String, required:true},  
        cusemail:{type:String, required:true},  
        cusmobile:{type:String, required:true}, 
        cusname:{type:String, required:true}, 
        workid:{type:String, required:true}, 
        workName:{type:String, required:true}, 
        providerid:{type:String, required:true}, 
        providerName:{type:String, required:true}, 
        status:{type:String, required:true}, 
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
export const CusReqModel = model<CusReq>('CusReq', CusReqSchema);