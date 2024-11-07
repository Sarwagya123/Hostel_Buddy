const {Router} = require("express")
const router = Router();
// const userMiddleware = require("../middlewares/user");
const {User, Room, Application} = require("../database/index")

router.get('/applicationList', async (req,res) => {    
    Application.find().then(async (data)=>{
        if(!data){
            res.status(411).json({
                msg: "Incorrect Registration Number"
            })
        }
        else{
            res.status(200).json({
                applicationList : data
            })
        }
    })
})

router.put('/approve', async (req,res) => {
    const applicationId = req.body.applicationid;    
    Application.updateOne({
        _id : applicationId
    },{
        $set:{
            status : 1
            }
    }).then(async (data)=>{
        if(!data){
            res.status(411).json({
                msg: "Incorrect Application"
            })
        }
        else{
            await Application.findOne({
                _id : applicationId
            }).then(async (data2)=>{
                if(!data2){
                    res.status(411).json({
                        msg: "Error Received"
                    })
                }
                else{
                    res.status(200).json({
                        data : data2
                    })
                }
            })
        }
    })
})

router.put('/reject', async (req,res) => {
    const applicationId = req.body.applicationid;    
    Application.updateOne({
        _id : applicationId
    },{
        $set:{
            status : 2
            }
    }).then(async (data)=>{
        if(!data){
            res.status(411).json({
                msg: "Incorrect Application"
            })
        }
        else{
            await Application.findOne({
                _id : applicationId
            }).then(async (data2)=>{
                if(!data2){
                    res.status(411).json({
                        msg: "Error Received"
                    })
                }
                else{
                    res.status(200).json({
                        data : data2
                    })
                }
            })
        }
    })
})
module.exports = router