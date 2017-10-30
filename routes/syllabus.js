/**
 * Created by nikhil on 13/6/17.
 */
var mongoose=require('mongoose');
var syllabus=mongoose.model('syllabus_pdf');

exports.getChildById= function (req,res) {
    syllabus.findOne({_id:req.params.path},function(err,syllabus){
        if (!err) {
        if (!syllabus) {
            res.json({"Error":"Syllabus not found"});
        } else {

            console.log("req data:" + syllabus);
            res.json(syllabus);
        }
    }else{
            res.json({"Error":err+""});
            console.log(err);
        }})
    };






