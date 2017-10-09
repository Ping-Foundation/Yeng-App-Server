/**
 * Created by nikhil on 13/6/17.
 */
var mongoose = require('mongoose');
var syllabus = mongoose.model('syllabus_pdf');
//var fileUpload=require('express-fileupload')
var mkdir=require('mkdirp');

//var fs=require('fs-extra');
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
/* ABU Created for creating Sem 7-10-2017*/
exports.createSem=function (req,res) {
    syllabus.find({_id:""},function (err,data) {

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
        var path=req.body.course;
        console.log(path);
        CreateCourse("Syllabus",req.body.course,req,res,path);
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
       //console.log(data);
        //var test="MBA"
        if(!err){
            if(!data){
                syllabus.update({
                    _id:"Syllabus"
                },{
                        $set: {

                                "MBA": req.params.course

                        }


                },function (err,data) {
                    console.log(err);
                    console.log(data);
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

exports.viewSemester=function (req,res) {
    syllabus.findOne({_id:req.params.course},function (err,data) {
        if(!err) {
            res.render('syllabus/viewsem',{SemDetails:data,layout:false});

        }
        else {
            console.log(err +" : viw Sem");
        }
    });
}
exports.addSemester=function (req,res) {
    var objParantCourse=req.params.courseparant;
    syllabus.findOne({_id:objParantCourse},function (err,data) {
        if(!err){
            res.render('syllabus/addsem',{layout:false,courseName:objParantCourse});
        }
    })
    console.log(objParantCourse);
}
exports.doaddSemester=function (req,res) {
    //console.log("i am here");
    //console.log(req.body.name);
    //console.log(req.body.sem);
    var semNAme=req.body.name+"_"+req.body.sem
    //var path=req.body.name+"/"+req.body.sem; // under folder name same like Sem Name no extension
    var path=req.body.name+"/"+semNAme;
    CreateCourse(req.body.name,semNAme,req,res,path);


}
exports.viewbranch=function (req,res) {
    syllabus.findOne({_id:req.params.sem},function (err,data) {
        if(!err){
            res.render("syllabus/viewbranch",{layout:false,branchDetails:data});
        }
        else{
            console.log(err);
        }
    })
}
exports.addbranch=function (req,res) {
    syllabus.findOne({_id:req.params.sem},function (err1,semdata) {
        if(!err1){
            syllabus.findOne({children:req.params.sem},function (err,coursedata) {
                if(!err) {
                    res.render("syllabus/addbranch", {layout: false,semName: semdata._id,courseName:coursedata._id});
                }
                else{
                    console.log(err);
                }
            });

        }
        else{
            console.log(err1);
        }
    });
}
exports.doaddbranch=function (req,res) {
    console.log(req.body.course);
    console.log(req.body.sem);
    console.log(req.body.branch);
    var brname=req.body.sem+"_"+req.body.branch
    var path=req.body.course+"/"+req.body.sem+"/"+brname;
    CreateCourse(req.body.sem,brname,req,res,path);

}
exports.viewSubj=function (req,res) {
    //console.log(req.params.subj);
    syllabus.findOne({_id:req.params.subj},function (err,data) {
        if(!err){
            res.render("syllabus/viewsubj",{layout:false,subjData:data})
        }else{
            console.log(err);
        }
    })

}
exports.addSubj=function (req,res) {
    syllabus.findOne({_id:req.params.subj},function (err,brdata) {
        if(!err){
            syllabus.findOne({children:req.params.subj},function (err,semdata) {
                if(!err){
                    syllabus.findOne({children:semdata._id},function (err,coursedata) {
                        if(!err){
                            res.render('syllabus/addsubj',{layout:false,brName:brdata._id,semName:semdata._id,courseName:coursedata._id});
                        }else{
                            console.log(err);
                        }
                    })
                }else{
                    console.log(err);
                }
            });

        }else{
            console.log(err);
        }
    });
}
exports.doaddSubj=function (req,res) {
    //var objSub=req.body.inputsub;
    //var objbr=req.body.inputbr;
    //var objsem=req.body.inputsm;
    //var objCourse=req.body.inputcrs;
    //var sujID=objbr+"_"+objSub;
    //var strlocation=objCourse+"/"+objsem+"/"+objbr+"/"+objSub;
    //console.log(objSub);
    //console.log(objbr);
    //console.log(objsem);
    //console.log(objCourse);
    console.log("file Upload");
    //var filename=req.body.pdf.files[0];
    console.log(req.files);


}
/*Create Directory for Creating Course (Abu 2-10-2017)*/
function createDirectory(path,child){
    mkdir('public/Syllabus/'+path,function (err) {
        if(!err)
            syllabus.create({
                _id:child
            });
            console.log("Created Succes");
    });
}


function CreateCourse(parant,child,req,res,path){
    syllabus.findOne({_id: parant}, function (err, data) {
        if (!data) {
            syllabus.create({
                _id: parant,
                children: child
            }, function (err, syllabus) {
                if (!err) {
                    //var path=parant+"/"+child
                    createDirectory(path,child);
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
                            createDirectory(path,child);
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








