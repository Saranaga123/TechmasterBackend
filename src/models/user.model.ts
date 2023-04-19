import { Schema,model } from "mongoose";
export interface User{
    id:string;
    name:string;
    bname:string;
    nic:string;
    type:string;
    email:string;
    role:string;
    password:string;
    tp:string;
    btp:string;
    add1:string;
    add2:string;
    add3:string;
    cat1:String;
    cat2:String;
    cat3:String;
    cat4:String;
    cat5:String;
    cat6:String;
    cat7:String;
    cat8:String;
    document:string;
    lat:string;
    lon:string;
    rated:string;
    district:string;
}
export const UserSchema = new Schema<User>(
    {
        name:{type:String, required:true},
        bname:{type:String, required:true},
        nic:{type:String, required:true},
        type:{type:String, required:true}, 
        email:{type:String, required:true},
        role:{type:String, required:true},
        password:{type:String, required:false},
        tp:{type:String, required:true},
        btp:{type:String, required:true},
        add1:{type:String, required:true},
        add2:{type:String, required:true},
        add3:{type:String, required:true},
        cat1:{type:String, required:true},
        cat2:{type:String, required:true},
        cat3:{type:String, required:true},
        cat4:{type:String, required:true},
        cat5:{type:String, required:true},
        cat6:{type:String, required:true},
        cat7:{type:String, required:true},
        cat8:{type:String, required:true},
        document:{type:String, required:false},
        lat:{type:String, required:false},
        lon:{type:String, required:false},
        rated:{type:String, required:false},
        district:{type:String, required:false},

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
export const UserModel = model<User>('user', UserSchema);