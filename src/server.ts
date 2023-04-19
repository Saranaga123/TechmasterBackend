import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors"; 
import jwt from 'jsonwebtoken';
import {  sample_users, sample_work } from "./data";
import { sample_admin_note, sample_buyer_requests } from "./simpledata"
import {dbConnect} from "./configs/database.config" ;
import asyncHandler from 'express-async-handler';
import { User, UserModel } from "./models/user.model";
import bodyParser from "body-parser";
import { Work, WorkModel} from "./models/work.model";
import { WorkImage, WorkImageModel } from "./models/workimage.model";
import { BuyerRequest, BuyerRequestModel } from "./models/buyerRequest.model"
import { AdminNote, AdminNoteModel } from "./models/adminNote.model";
import { WorkLikeRating, WorkLikeRatingRatingModel } from "./models/worklikerating.model";
import { WorkDisLikeRating, WorkDisLikeRatingRatingModel } from "./models/workdislikerating.model";
import { CusReqModel } from "./models/cusrequest.model"; 
dbConnect(); 
    
const app = express(); 
const port = process.env.PORT || 6001;
app.use(bodyParser.json({ 
    limit: '50mb'
})); 
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
}));
app.use (cors({
    credentials:true,
    origin:[ "*"]
}));
app.get("/api/users",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const users = await UserModel.find(); 
        res.send(users)
    }
)) 
app.post("/api/cusreq", asyncHandler(
    async (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*'); 
        const { cusid, workid, cusemail, cusmobile, cusname, status, providerid,providerName, workName } = req.body;
        const cusrequest = await CusReqModel.findOne({ cusid, workid });
        if (cusrequest) {
            res.send("already");
            return;
        }
        const newcusrequest = {
            cusid: cusid,
            workid: workid,
            providerid:providerid,
            providerName:providerName,
            cusemail: cusemail,
            cusmobile:cusmobile,
            cusname:cusname,
            status:status,
            workName:workName,
            id: ""
        };
        const dbUser = await CusReqModel.create(newcusrequest);
        const cusrequests = await CusReqModel.find();
        res.send(cusrequests);
    }
));
app.get("/api/cusreq/:searchTerm",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = req.params.searchTerm;
        const list =await CusReqModel.find(); 
        const serviceslist = list
        .filter(list => list.providerid.toLowerCase()
        .includes(searchTerm.toLowerCase())); 
        res.send(serviceslist) 
    } 
))
app.get("/api/myreq/:searchTerm",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = req.params.searchTerm;
        const list =await CusReqModel.find(); 
        const serviceslist = list
        .filter(list => list.cusid.toLowerCase()
        .includes(searchTerm.toLowerCase())); 
        res.send(serviceslist) 
    } 
))
app.post("/api/work/like", asyncHandler(
    async (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*'); 
        const { cusid, workid } = req.body;
        const like = await WorkLikeRatingRatingModel.findOne({ cusid, workid });
        if (like) {
            res.send("already");
            return;
        }
        const newLike = {
            cusid: cusid,
            workid: workid,
            id: ""
        };
        const dbUser = await WorkLikeRatingRatingModel.create(newLike);
        const likes = await WorkLikeRatingRatingModel.find();
        res.send(likes);
    }
));
app.post("/api/work/dislike",asyncHandler(
    async(req,res,next)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const {cusid,workid}=req.body;
        const dislike = await WorkDisLikeRatingRatingModel.findOne({cusid});
        if(dislike){
            res.send("already")
            return
        }
        const newdisLike:WorkDisLikeRating = {
             cusid:cusid,
             workid:workid,
             id:""
        }  
        const dbUser = await WorkDisLikeRatingRatingModel.create(newdisLike);
        const disLike = await WorkDisLikeRatingRatingModel.find(); 
        res.send(disLike)
    }
))
app.get("/api/work/likelist/:searchTerm",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = req.params.searchTerm;
        const likelist =await WorkLikeRatingRatingModel.find(); 
        const serviceslist = likelist
        .filter(likelist => likelist.workid.toLowerCase()
        .includes(searchTerm.toLowerCase())); 
        res.send(serviceslist) 
    } 
))
app.get("/api/work/dislikelist/:searchTerm",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = req.params.searchTerm;
        const dislikelist =await WorkDisLikeRatingRatingModel.find(); 
        const serviceslist = dislikelist
        .filter(dislikelist => dislikelist.workid.toLowerCase()
        .includes(searchTerm.toLowerCase())); 
        res.send(serviceslist) 
    } 
))
app.get("/api/work/category/:searchTerm",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = req.params.searchTerm;
        const work =await WorkModel.find(); 
        const serviceslist = work
        .filter(work => work.category.toLowerCase()
        .includes(searchTerm.toLowerCase())); 
        res.send(serviceslist) 
    } 
))
app.get("/api/work/category/:searchTerm1/:searchTerm2", asyncHandler(
    async (req, res) => {
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm1 = req.params.searchTerm1.toLowerCase();
        const searchTerm2 = req.params.searchTerm2.toLowerCase();
        console.log(searchTerm1)
        console.log(searchTerm2)
        const work = await WorkModel.find();
        const serviceslist = work.filter(work => 
            work.category.toLowerCase().includes(searchTerm1) &&
            work.district.includes(searchTerm2)
        );
        res.send(serviceslist);
    }
));
app.get("/api/user/provider/:searchTerm",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = req.params.searchTerm;
        const provider =await UserModel.find(); 
        const providerDetail = provider
        .filter(provider => provider.email.toLowerCase()
        .includes(searchTerm.toLowerCase())); 
        res.send(providerDetail) 
    } 
))
app.post("/api/users/Create", asyncHandler(
    async (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      try {
        const { add1, add2, add3, email, id, name, bname, nic, password, document, rated, role, tp, btp, type, lat, lon, cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, district } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
          res.send("already");
          return;
        }
        const newUser = {
          add1: add1,
          add2: add2,
          add3: add3,
          email: email,
          id: '',
          name: name,
          nic: nic,
          password: password,
          document: document,
          rated: rated,
          lat: lat,
          lon: lon,
          role: role,
          tp: tp,
          type: type,
          cat1: cat1,
          cat2: cat2,
          cat3: cat3,
          cat4: cat4,
          cat5: cat5,
          cat6: cat6,
          cat7: cat7,
          cat8: cat8,
          bname: bname,
          btp: btp,
          district: district
        };
        const dbUser = await UserModel.create(newUser);
        res.send("Done");
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  ));
app.post("/api/users/Update", asyncHandler(
    async(req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*'); 
      const { add1, add2, add3, email, id, name, bname, nic,  document, rated, role, tp, btp, type, lat, lon, cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8,district } = req.body;
  
      const query = { email };
      const update = {
        add1,
        add2,
        add3,
        id,
        name,
        bname,
        nic, 
        document,
        rated,
        role,
        tp,
        btp,
        type,
        lat,
        lon,
        cat1,
        cat2,
        cat3,
        cat4,
        cat5,
        cat6,
        cat7,
        cat8,
        district
      };
  
      const options = { new: true, upsert: true };
      const dbUser = await UserModel.findOneAndUpdate(query, update, options);
      if (!dbUser) {
        res.send("failed");
        return;
      }
      res.send("Done");
    }
  ));
app.post("/api/users/Updatepw", asyncHandler(
    async(req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*'); 
      const { add1, add2, add3, email, id, name, password, bname, nic,  document, rated, role, tp, btp, type, lat, lon, cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, district } = req.body;
  
      const query = { email };
      const update = {
        add1,
        add2,
        add3,
        id,
        password,
        name,
        bname,
        nic, 
        document,
        rated,
        role,
        tp,
        btp,
        type,
        lat,
        lon,
        cat1,
        cat2,
        cat3,
        cat4,
        cat5,
        cat6,
        cat7,
        cat8,
        district
      };
  
      const options = { new: true, upsert: true };
      const dbUser = await UserModel.findOneAndUpdate(query, update, options);
      if (!dbUser) {
        res.send("failed");
        return;
      }
      res.send("Done");
    }
  ));
app.get("/api/users/destro",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const users = await UserModel.deleteMany(); 
        res.send(users)
    }
)) 
app.get("/api/users/seed",asyncHandler(
    async (req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const userCount =await UserModel.countDocuments();
        if(userCount>0){
            res.send ("seed is already done");
            return;
        }
        await UserModel.create(sample_users)
        res.send("user seed is done");
    }
))
app.get("/api/work",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const works = await WorkModel.find(); 
        
        res.send(works)
    } 
))
app.get("/api/work/images",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const works = await WorkImageModel.find(); 
        res.send(works)
    } 
))
app.get("/api/workimage/search/:searchTerm",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = req.params.searchTerm;
        const workimage =await WorkImageModel.find();
        const workimages = workimage
        .filter(works => works.workid.toLowerCase()
        .includes(searchTerm.toLowerCase()));
    
        res.send(workimages)
    }
)
)
app.get("/api/work/search/:searchTerm",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = req.params.searchTerm;
        const work =await WorkModel.find(); 
        const serviceslist = work
        .filter(work => work.email.toLowerCase()
        .includes(searchTerm.toLowerCase()));
    
        res.send(serviceslist) 
    }
)
)
app.get("/api/workselect/search/:searchTerm",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = req.params.searchTerm;
        const work =await WorkModel.find(); 
        const serviceslist = work
        .filter(work => work.id.toLowerCase()
        .includes(searchTerm.toLowerCase()));
    
        res.send(serviceslist) 
    }
)
)
app.get('/api/req/delete/:id', async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*'); 
      const deletedReq = await CusReqModel.findByIdAndDelete(req.params.id);
      if (!deletedReq) {
        return res.status(404).send({ error: 'Work not found' });
      }
      res.send(deletedReq);
    } catch (error) {
        res.header('Access-Control-Allow-Origin', '*'); 
      res.status(500).send({ error: 'Internal server error' });
    } 
});
app.get('/api/work/delete/:id', async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*'); 
      const deletedWork = await WorkModel.findByIdAndDelete(req.params.id);
      if (!deletedWork) {
        return res.status(404).send({ error: 'Work not found' });
      }
      res.send(deletedWork);
    } catch (error) {
        res.header('Access-Control-Allow-Origin', '*'); 
      res.status(500).send({ error: 'Internal server error' });
    } 
});
app.get('/api/req/decline/:id', async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*'); 
        const cusReq = await CusReqModel.findByIdAndUpdate(
            req.params.id, 
            { status: 'declined' },
            { new: true } // This option returns the updated document
          );
          if (!cusReq) {
            return res.status(404).send({ error: 'Customer request not found' });
          }
          res.send(cusReq);
    } catch (error) {
        res.header('Access-Control-Allow-Origin', '*'); 
      res.status(500).send({ error: 'Internal server error' });
    } 
});
app.get('/api/req/approve/:id', async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*'); 
        const cusReq = await CusReqModel.findByIdAndUpdate(
            req.params.id, 
            { status: 'approved' },
            { new: true } // This option returns the updated document
          );
          if (!cusReq) {
            return res.status(404).send({ error: 'Customer request not found' });
          }
          res.send(cusReq);
    } catch (error) {
        res.header('Access-Control-Allow-Origin', '*'); 
      res.status(500).send({ error: 'Internal server error' });
    } 
});
app.get("/api/work/destro",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const works = await WorkModel.deleteMany(); 
        res.send(works)
    }
)) 
app.get("/api/works/destro/:searchTerm",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = req.params.searchTerm;
        await WorkModel.deleteOne({id:searchTerm}); 
        res.send(searchTerm)
    }
))
app.post("/api/works/Create",asyncHandler(
    async(req,res,next)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const {name,description, email,category,location,bname,district }=req.body; 
        const newWork:Work = {
            name: name,
            description: description,
            email: email,
            id: "",
            category: category,
            location: location,
            bname: bname,
            district:district
        }
        const dbWork = await WorkModel.create(newWork);
        res.json(dbWork);
    }
))
app.post("/api/works/image/Create",asyncHandler(
    async(req,res,next)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const {workid,photo }=req.body; 
        const newWorkImage:WorkImage = {
            workid: workid,
            photo: photo, 
            id: "", 
        }
        const dbWorkImage = await WorkImageModel.create(newWorkImage);
        res.json(dbWorkImage);
    }
))
app.get("/api/works/search/:searchTerm",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = req.params.searchTerm;
        const work =await WorkModel.find();
        const works = work
        .filter(works => works.email.toLowerCase()
        .includes(searchTerm.toLowerCase()));
    
        res.send(works)
    }
)
)
app.get("/api/users/search/:searchTerm",asyncHandler(
        async(req,res)=>{
            res.header('Access-Control-Allow-Origin', '*'); 
            const searchTerm = req.params.searchTerm;
            const user =await UserModel.find();
            const users = user
            .filter(users => users.email.toLowerCase()
            .includes(searchTerm.toLowerCase()));
        
            res.send(users)
        }
    )
)
app.listen(port,()=>{
    console.log("Website served on http://localhost:" + port);
})
app.get("/api/buyerrequest/seed",asyncHandler(
    async (req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const buyerRequestCount =await BuyerRequestModel.countDocuments();
        if(buyerRequestCount>0){
            res.send ("seed is already done");
            return;
        }
        await BuyerRequestModel.create(sample_buyer_requests)
        res.send("Buyer Request seed is done");
    }
))
app.get("/api/buyerrequest",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const buyerRequestCount = await BuyerRequestModel.find(); 
        res.send(buyerRequestCount)
    } 
))
app.get("/api/buyerrequest/destro",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const buyerRequestCount = await BuyerRequestModel.deleteMany(); 
        res.send(buyerRequestCount)
    }
)) 
app.get("/api/buyerrequest/search/:searchTerm",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = req.params.searchTerm;
        const buyerrequest =await BuyerRequestModel.find();
        const buyerrequests = buyerrequest
        .filter(buyerrequests => buyerrequests.femail.toLowerCase()
        .includes(searchTerm.toLowerCase()));
    
        res.send(buyerrequests)
    }
)
)
app.get("/api/buyerrequest/buyerbasesearch/:searchTerm",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = req.params.searchTerm;
        const buyerrequest =await BuyerRequestModel.find();
        const buyerrequests = buyerrequest
        .filter(buyerrequests => buyerrequests.bemail.toLowerCase()
        .includes(searchTerm.toLowerCase()));
    
        res.send(buyerrequests)
    }
)
)
app.get("/api/buyerrequest/destro/:searchTerm",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = req.params.searchTerm;
        await BuyerRequestModel.deleteOne({id:searchTerm}); 
        res.send(searchTerm)
    }
))
app.post("/api/buyerrequest/Create",asyncHandler(
    async(req,res,next)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const {bname,bcontact,femail,price,product,bemail,fname,fcontact}=req.body; 
        const newBuyerRequest:BuyerRequest = {
            bname: bname,
            bemail:bemail,
            bcontact: bcontact,
            price: price,
            femail:femail,
            product:product,
            fname:fname,
            fcontact:fcontact,
            id: ""
        }
        const dbBuyerRequest = await BuyerRequestModel.create(newBuyerRequest);
        res.send("Done")
    }
))
app.get("/api/users/farmers",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = "farmer";
        const user =await UserModel.find();
        const users = user
        .filter(users => users.role
        .includes(searchTerm));
    
        res.send(users)
    }
)
)
app.get("/api/users/buyers",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = "buyer";
        const user =await UserModel.find();
        const users = user
        .filter(users => users.role
        .includes(searchTerm));
    
        res.send(users)
    }
)
) 
app.get("/api/users/destro/:searchTerm",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = req.params.searchTerm;
        await UserModel.deleteOne({id:searchTerm}); 
        res.send(searchTerm)
    }
)) 
app.get("/api/destro",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const searchTerm = req.params.searchTerm;
        await UserModel.deleteMany(); 
        await WorkModel.deleteMany();
        await WorkImageModel.deleteMany();
        await AdminNoteModel.deleteMany();
        await BuyerRequestModel.deleteMany();
        res.send(" All Data Erased ! ")
    }
)) 
app.get("/api/seed",asyncHandler(
    async (req,res)=>{  
        res.header('Access-Control-Allow-Origin', '*'); 
        const userCount =await UserModel.countDocuments();
        if(userCount>0){
            await UserModel.deleteMany(); 
            await UserModel.create(sample_users)
        }else{
            await UserModel.create(sample_users)
        }   
        // const workCount =await UserModel.countDocuments();
        // if(workCount>0){
        //     await WorkModel.deleteMany(); 
        //     await WorkModel.create(sample_work)
        // }else{
        //     await WorkModel.create(sample_work)
        // }  
        res.send("Data Seeding Done ! ")

        
        
    }
)) 