var express= require('express');
var cityRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var cityurl = "mongodb+srv://admin:admin@cluster0.ka8dm.mongodb.net/aryabhatt?retryWrites=true&w=majority"


function router(menu){  //---> rape them into function

  cityRouter.route('/')
      .get(function(req, res){
          mongodb.connect(cityurl,(err,connection)=>{
              if(err){
                  res.status(500).send("Error while connecting")
              }else{
                  const dbo = connection.db('aryabhatt')

                  dbo.collection('city').find({}).toArray((err,data)=>{
                      if(err){
                          res.status(501).send("Error while fetching")
                      }else{
                          res.render('city',{title:"City Page",citydata:data,menu})
                      }
                  })
              }
          }) 
          // res.send(city)
          res.render('city',{title:"City Page",cityData: city, menu})
      })

  cityRouter.route('/details/:id')
      .get(function(req,res){
          var id=req.params.id    //-----> To receive the params; 
          var name = req.query.name  //----> TO receive the query params;
          res.send(`Hi this is from city details ${id} & ${name}`)
      })

    return cityRouter

}
module.exports = router;