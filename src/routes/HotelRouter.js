var express = require('express');
var hotelRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017";
var url = "mongodb+srv://Sanjaymurmu:Dumka12345@firstmongo.djx5e.mongodb.net/SanjayMurmu?retryWrites=true&w=majority"
// var url = "mongodb+srv://dev:mongo123@cluster0.f8vmc.mongodb.net/aryabhat?retryWrites=true&w=majority";


 
function router(menu){   // --> converting into function
 
  hotelRouter.route('/')
      .get(function(req, res){
        //creating connection
        mongodb.connect(url,(err,connection)=>{
          if(err){
            res.status(500).send("Error while connecting")
          }else{
            //connection got created and pass db name
            const dbo = connection.db('SanjayMurmu');
            //make find query to collection
             dbo.collection('Hotels').find({}).toArray((err,data)=>{
              if(err){
                res.status(501).send("Error while fetching")
              }else{
                res.render('hotel',{title:"Hotel Page", hoteldata:data,menu})
              }
            })
          }
        })
          // res.send(hotels)
          // res.render('hotel',{title: "Hotel Page",hoteldata:hotels,menu}) //desructuring (memu:menu) if both the side are same;
      });

      hotelRouter.route('/details/:id')
          .get(function(req,res){
            // var id=req.params.id
            var{id}=req.params
            mongodb.connect(url,(err,connection)=>{
              if(err){
                res.status(500).send("Error while connecting")
              }else{
                const dbo=connection.db('SanjayMurmu')
                dbo.collection("Hotels").findOne({_id:id},(err,data)=>{
                  if(err){
                    res.status(501).send("Error while fetching")
                  }else{
                    res.render('hotelDetails',{title:"Hotel Details Page",hoteldata:data,menu})
                  }
                })
              }
            })
          })

  return hotelRouter;
}
module.exports = router;