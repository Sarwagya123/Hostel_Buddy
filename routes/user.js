const {Router} = require("express")
const router = Router();
// const userMiddleware = require("../middlewares/user");
const {User, Room, Application} = require("../database/index")


router.get('/:regno/userDetails', async (req,res) => {    
    const userRegNo = req.params.regno;
    await User.findOne({
        regno: userRegNo
    }).then(async (data)=>{
        if(!data){
            res.status(411).json({
                msg: "Incorrect Registration Number"
            })
        }
        else{
            res.status(200).json({
                userDetails : data
            })
        }
    })
})

router.post('/createUser', async (req,res) => {    
    const userRegNo = req.body.regno;
    const userName = req.body.name;
    const userPassword = req.body.password;
    const userEmail = req.body.email;
    const userBlock = req.body.block;
    const userRoomType = req.body.roomtype;
    const userRoomNo = req.body.roomno;
    // const payLoad = req.body;
    
    const response = await User.create({
        regno: userRegNo,
        name: userName,
        password: userPassword,
        email: userEmail,
        roomtype: userRoomType,
        block : userBlock,
        roomno: userRoomNo
    })

    res.json({
        msg: "User Created Successfully",
        data : response
    })
})


router.post('/me_apply', async (req,res) => {    
    const fromRegNo = req.body.fromregno;
    const toRegNo = req.body.toregno;
    const applicationtype = req.body.applicationtype;
    const applicationReason = req.body.reason;
    await User.findOne({
        regno: fromRegNo
    }).then(async (data)=>{
        if(!data){
            res.status(411).json({
                msg: "Incorrect Registration Number"
            })
        }
        else{
            const response = await Application.create({
                fromregno : fromRegNo,
                toregno : toRegNo,
                applicationtype : applicationtype,
                reason: applicationReason
            })
            console.log(response);
            var applicationids = data.applicationids;
            applicationids = [...applicationids, response._id];
            console.log(applicationids);
            try{
                const res2 = await User.updateOne({
                    regno : fromRegNo
                },{
                    $set:{
                        applicationids : applicationids
                        }
                })
                User.findOne({
                    regno: toRegNo
                }).then(async (data2)=>{
                    if(!data2){
                        res.status(411).json({
                            msg: "Incorrect Registration Number"
                        })
                    }
                    else{
                        var toapplicationids = data2.applicationids;
                        toapplicationids = [...toapplicationids, response._id];
                        try{
                            const res2 = await User.updateOne({
                                regno : toRegNo
                            },{
                                $set:{
                                    applicationids : toapplicationids
                                    }
                            })
                            res.status(200).json({
                                msg:"Application Applied",
                                data: response
                            })
                        }
                        catch(err){
                            res.status(404).json({
                                error :err
                            })
                            // console.log(err);
                        }
                    }
                })
            }
            catch(err){
                res.status(404).json({
                    error :err
                })
                // console.log(err);
            }
            
        }
    })
})


router.post('/re_apply', async (req,res) => {    
    const fromRegNo = req.body.fromregno;
    const toBlockNo = req.body.toblock;
    const toRoomType = req.body.toroomtype;
    const applicationtype = req.body.applicationtype;
    const applicationReason = req.body.reason;
    await User.findOne({
        regno: fromRegNo
    }).then(async (data)=>{
        if(!data){
            res.status(411).json({
                msg: "Incorrect Registration Number"
            })
        }
        else{
            const response = await Application.create({
                fromregno : fromRegNo,
                toblock : toBlockNo,
                toroomtype : toRoomType,
                applicationtype : applicationtype,
                reason: applicationReason
            })
            console.log(response);
            var applicationids = data.applicationids;
            applicationids = [...applicationids, response._id];
            console.log(applicationids);
            try{
                const res2 = await User.updateOne({
                    regno : fromRegNo
                },{
                    $set:{
                        applicationids : applicationids
                        }
                })
                res.status(200).json({
                    msg:"Application Applied",
                    data: response
                })
            }
            catch(err){
                res.status(404).json({
                    error :err
                })
                // console.log(err);
            }
            
        }
    })
})

router.get('/:regno/userapplicationdetails', async (req,res) => { 
    const userRegNo = req.params.regno;   
    await User.findOne({
        regno : userRegNo
    }).then(async (data)=>{
        if(!data){
            res.status(411).json({
                msg: "Incorrect Registration Number"
            })
        }
        else{
            const applicationids = data.applicationids;
            // console.log(applicationids);
            await Application.find({
                _id : {
                    $in: applicationids
                }
            }).then((applicationdata) => {
                if(!applicationdata){
                    res.status(411).json({
                        msg: "Incorrect email and password"
                    })
                    return
                }else{
                    // console.log(applicationdata);
                    res.status(200).json({
                        application : applicationdata
                    })
                    return
                }
            })
        }
    })
})

module.exports = router