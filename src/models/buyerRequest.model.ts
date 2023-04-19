import { Schema,model } from "mongoose";
export interface BuyerRequest{
    id:string;
    bname:string; 
    fname:string; 
    bcontact:string;
    fcontact:string;
    price:string;
    femail:string;
    product:string;
    bemail:string; 

}
export const BuyerRequestSchema = new Schema<BuyerRequest>(
    {
        bname:{type:String, required:true}, 
        bcontact:{type:String, required:true},
        fname:{type:String, required:true}, 
        fcontact:{type:String, required:true},
        price:{type:String, required:true},
        femail:{type:String, required:true},
        product:{type:String, required:true},
        bemail:{type:String, required:true} 
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
export const BuyerRequestModel = model<BuyerRequest>('BuyerRequest', BuyerRequestSchema);