/**
 * Created by nikhil on 13/6/17.
 */
var mongoose = require('mongoose');
var syllabus = mongoose.model('syllabus_pdf');
var mkdir=require('mkdirp');
//var syllabus_flow=mongoose.model('syllabus');

exports.getChildById = function (req, res) {
    syllabus.findOne({_id: req.params.path}, function (err, syllabus) {
        if (!err) {
            if (!syllabus) {
                res.json({"Error": "Syllabus not found"});
            } else {

                console.log("req data:" + syllabus);
                res.json(syllabus);
            }
        } else {
            res.json({"Error": err + ""});
            console.log(err);
        }
    })
};
/* ABU Created for viewing Course 29-9-2017*/
exports.viewcourse = function (req, res) {
    syllabus.find({_id:"Syllabus"},function (err,data) {
        if(!err){
            //var items=[];
            //keys=Object.keys(data);
            res.render('syllabus/viewcourse', {course:data,layout: false});
        }
    });

}
/*Abu Created Create Course 1-10-2017*/
exports.coursecreate = function (req, res) {
    res.render('syllabus/addcourse', {layout: false,titlecr:"Create Course"});
}
/*Abu Created Create Course 1-10-2017*/
exports.docoursecreate = function (req, res) {
    if (req.body.course.trim() == "") {

    }
    else {
        CreateCourse("Syllabus",req.body.course,req,res);
        //CreateCourse(req.body.course,"",req,res)
    }
}

exports.editCourse=function (req,res) {
    console.log(req.params.course);
    syllabus.findOne({children:req.params.course},function (err,data) {
        if(!err){
            syllabus.findOne({_id:req.params.course},function (err,idData) {
                if(!err){
                    res.render('syllabus/editcourse',{layout:false,titlecr:"Edit Course",courseName:req.params.course});
                }
                else{
                    console.log(req.params.course+" : _id not exist in our databse ");
                }
            })

        }else{
            console.log("course exist in our databse ")
        }
    });
}

exports.doeditCourse=function (req,res,data) {
    syllabus.findOne({children:req.params.course},function(err,data){
       // console.log(data);
        var test="MBA"
        if(!err){
            if(!data){
                syllabus.update({
                    _id:"Syllabus"
                },{

                        children:{
                            $set:{
                                test:req.params.course
                            }
                        }

                });
            }
            else{
                console.log("Course Name Alredy Exist");
            }
        }
        else{
            console.log("Course Name Alredy Exist");
        }
    });

}
/*Create Directory for Creating Course (Abu 2-10-2017)*/
function createDirectory(path){
    mkdir('public/Syllabus/'+path,function (err) {
        if(!err)
            syllabus.create({
                _id:path
            });
            console.log("Created Succes");
    });
}

function CreateCourse(parant,child,req,res){
    syllabus.findOne({_id: parant}, function (err, data) {
        if (!data) {
            syllabus.create({
                _id: parant,
                children: child
            }, function (err, syllabus) {
                if (!err) {
                    createDirectory(child);
                    res.redirect('/adminhome');

                }
                else {
                    console.log(err);
                }
            });
        }
        else {
            if (data.children != child) {
                syllabus.update(
                    {
                        _id: parant
                    },
                    {
                        $addToSet: {
                            children: child
                        }

                    }, function (err, syllabus) {
                        if (!err) {
                            createDirectory(child);
                            res.redirect('/adminhome');
                        }
                        else {
                            console.log(err);
                        }
                    });
            }
            else {
                console.log("Course Allredy Exists");
                res.redirect('/adminhome');
            }

        }
    });
}








