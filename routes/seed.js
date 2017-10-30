/**
 * Created by nikhil on 19/6/17.
 */
var mongoose=require('mongoose');
var seed=mongoose.model('test');


exports.getChild= function (req,res) {

   /* seed.create({"idd":"hello","files":["hey","hoy"],"children":["hooi","hhh"]},function (err,seed) {
        if(err){
            res.send("error");
        }else{
            res.send("Success");
        }
    });*/
    seed.findOne({'_id':"hello"},function (err,seed) {
        if(!err){
            if (!seed) {
                console.log("syllabus not defined");
                //console.log("params:"+req.params.path);
                console.log("req data:" + seed);
                res.json({"Error":"Syllabus not found"});
            } else {

                console.log("req data:" + seed);
                res.json(seed);
            }
        }else{
            res.send(err);
        }
    })
    
};

