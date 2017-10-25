/**
 * Created by nikhil on 13/6/17.
 */
var mongoose = require('mongoose');
var syllabus = mongoose.model('syllabus_pdf');
var multer = require('multer');
var fileUpload = require('express-fileupload')
var mkdir = require('mkdirp');
var path=require('path');
var download=require('download-file');


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
    syllabus.find({_id: "Syllabus"}, function (err, data) {
        if (!err) {
            //var items=[];
            //keys=Object.keys(data);
            res.render('syllabus/viewcourse', {course: data, layout: false});
        }
    });

}
/* ABU Created for creating Sem 7-10-2017*/
exports.createSem = function (req, res) {
    syllabus.find({_id:""}, function (err, data) {

    });
}
/*Abu Created Create Course 1-10-2017*/
exports.coursecreate = function (req, res) {
    res.render('syllabus/addcourse', {layout: false, titlecr: "Create Course"});
}
/*Abu Created Create Course 1-10-2017*/
/*modified create 11-10-2017*/
exports.docoursecreate = function (req, res) {
    var path = req.body.course;
    console.log("Iam here");
    console.log(path);
    syllabus.findOne({_id:req.body.course},function (err,data) {
        console.log(data);
        if(!data){
            CreateCourse("Syllabus", req.body.course, req, res, path);
        }
        else{
            res.send('Course Alredy Exists');
        }
    });
}
exports.editCourse = function (req, res) {
    console.log(req.params.course);
    var semsep=[];
    var brsem=[];
    syllabus.findOne({children: req.params.course}, function (err, data) {
        if (!err) {
            syllabus.findOne({_id: req.params.course}, function (err, idData) {
                var branch=idData.children[0];
                //console.log(branch)
                for(var i=0;idData.children.length>i;i++){
                    semsep[i]=idData.children[i].split("_")[1];
                }
                if (!err) {
                    syllabus.findOne({_id:branch},function (err,brData) {
                        if(!err){
                            for(var i=0;brData.children.length>i;i++){
                                brsem[i]=brData.children[i].split("_")[2];
                            }
                            res.render('syllabus/editcourse', {
                                layout: false,
                                titlecr: "Edit Course",
                                courseName: req.params.course,
                                semName:semsep,
                                brName:brsem
                            });
                        }
                    });

                }
                else {
                    console.log(req.params.course + " : _id not exist in our databse ");
                }
            })

        } else {
            console.log("course exist in our databse ")
        }
    });
}
exports.doeditCourse = function (req, res, data) {
    var courseName=req.body.newcoursename;
    syllabus.findOne({children: courseName}, function (err, data) {
        var course=req.params.course
        if (!err) {
            if (!data) {
                syllabus.findOneAndUpdate(
                    {
                        _id:req.params.course
                    },{
                        $set:{"_id":courseName}
                    }
                    ,function (err) {
                        if(!err){
                            res.send("Updated");
                        }else{
                            res.send("Error Message : "+err);
                        }
                    }
                );
            }
            else {
                res.send("Course Name Alredy Exist");
            }
        }
        else {
            res.send(err);
        }
    });

}
exports.viewSemester = function (req, res) {
    var objsem=[];
    syllabus.findOne({_id: req.params.course}, function (err, data) {
        for(var i=0;data.children.length>i;i++){
            objsem[i]=data.children[i].split("_")[1];
        }
        var objcourse=data._id;
        if (!err) {
            res.render('syllabus/viewsem', {SemDetails: objsem,Course:objcourse,layout: false});

        }
        else {
            console.log(err + " : viw Sem");
        }
    });
}
exports.addSemester = function (req, res) {
    var objParantCourse = req.params.courseparant;
    syllabus.findOne({_id: objParantCourse}, function (err, data) {
        if (!err) {
            res.render('syllabus/addsem', {layout: false, courseName: objParantCourse});
        }
    })
    console.log(objParantCourse);
}
/*modified create 11-10-2017*/
exports.doaddSemester = function (req, res) {
    //console.log("i am here");
    //console.log(req.body.course);
    //console.log(req.body.sem);
    var semNAme = req.body.course + "_" + req.body.sem
    //var path=req.body.name+"/"+req.body.sem; // under folder name same like Sem Name no extension
    var path = req.body.course + "/" + req.body.sem;
    CreateCourse(req.body.course, semNAme, req, res, path);


}
exports.viewbranch = function (req, res) {
    var br=[];
    var course=req.params.sem.split("_")[0];
    var sem=req.params.sem.split("_")[1];
    syllabus.findOne({_id: req.params.sem}, function (err, data) {
        for(var i=0;data.children.length>i;i++){
            br[i]=data.children[i].split("_")[2];
        }
        if (!err) {
            res.render("syllabus/viewbranch", {layout: false, branchDetails: br,course:course,sem:sem});
        }
        else {
            console.log(err);
        }
    })
}
exports.addbranch = function (req, res) {
    syllabus.findOne({_id: req.params.sem}, function (err1, semdata) {
        if (!err1) {
            syllabus.findOne({children: req.params.sem}, function (err, coursedata) {
                if (!err) {
                    res.render("syllabus/addbranch", {layout: false, semName: semdata._id, courseName: coursedata._id});
                }
                else {
                    console.log(err);
                }
            });

        }
        else {
            console.log(err1);
        }
    });
}
/*modified create 11-10-2017*/
exports.doaddbranch = function (req, res) {
    //console.log(req.body.course);
    //console.log(req.body.sem);
    //console.log(req.body.branch);

    var brname = req.body.course + "_" + req.body.sem + "_" + req.body.branch
    var path = req.body.course + "/" + req.body.sem + "/" + req.body.branch;
    CreateCourse(req.body.course + "_" + req.body.sem, brname, req, res, path);

}
exports.viewSubj = function (req, res) {
    var course=req.params.subj.split("_")[0];
    var sem=req.params.subj.split("_")[1];
    var branch=req.params.subj.split("_")[2];

    syllabus.findOne({_id: req.params.subj}, function (err, data) {
        if (!err) {
            res.render("syllabus/viewsubj",
                {
                    layout: false,
                    subjData: data,
                    course:course,
                    sem:sem,
                    branch:branch
                })
        } else {
            console.log(err);
        }
    })

}
exports.addSubj = function (req, res) {
    syllabus.findOne({_id: req.params.subj}, function (err, brdata) {
        if (!err) {
            syllabus.findOne({children: req.params.subj}, function (err, semdata) {
                if (!err) {
                    syllabus.findOne({children: semdata._id}, function (err, coursedata) {
                        if (!err) {
                            res.render('syllabus/addsubj', {
                                layout: false,
                                brName: brdata._id.split("_")[2],
                                semName: brdata._id.split("_")[1],
                                courseName: brdata._id.split("_")[0]
                            });
                        } else {
                            console.log(err);
                        }
                    })
                } else {
                    console.log(err);
                }
            });

        } else {
            console.log(err);
        }
    });
}

exports.doaddSubj = function (req, res) {
    if(!req.files){
        res.send("Error Message : Selected File Empty");
    }else {
        var objbr = req.params.branch;
        var objSubjName = req.body.inputsubcode+"_"+req.body.inputsub;
        var uploadingPath = objbr.split("_")[0] + "/" + objbr.split("_")[1] + "/" + objbr.split("_")[2];
        syllabus.findOne({files:objSubjName},function (err,data) {
            if(!err){
                if(!data){
                    syllabus.update({
                            _id:objbr
                    },  {
                        $addToSet: {
                            files: objSubjName
                        }

                    }, function (err, syllabus) {
                        if (!err) {
                            uploadPDF(req,res,objSubjName,uploadingPath)
                        }
                        else {
                            res.send('Error while Uploading file :'+err);
                        }
                    });

                }else {
                    res.send('Warning :Suject Name Alredy Exists');
                }
            }
            else {
                res.send('Erro :'+err);
            }
        })
    }
    //REF_
    //REF_
    //REF_
    //REF_
    //console.log(objbr.split("_").splice(-1));
    //console.log(objbr.split("_")[1]);
}
//////////////////////////////////////
///Downlod PDF
///Ceated Date  :18-10-2017
///Updated Date : 23-10-2017
///Created      :Abu
///                     not Compleated
//////////////////////////////////////
exports.dodownloadsub=function (req,res) {
    console.log("i am here");
    var course=req.query.course;
    var sem=req.query.sem;
    var branch=req.query.branch;
    var subject=req.params.subj;
    //var file="public/Syllabus/"+course+"/"+sem+"/"+branch+"/"+subject+".pdf";
    var path="public/Syllabus/"+course+"/"+sem+"/"+branch+"/"+subject+".pdf";
    //res.download("public/Syllabus/M.Tech/S1/A/123S_ABCDEFGHT.pdf","file.pdf");

    syllabus.findOne({files:subject},function (err,data) {
        if(!err){
            if(data){

                res.download(path,subject+".pdf");

                //res.header('Content-Type', 'text/event-stream');
                //res.download(path,subject+".pdf",function (err) {
                //    if(!err){
                 //       //res.status(304).send();
                //        console.log("Downloading...");
                        //next();
                //        //res.sendStatus(304);

                //    }else{
                 //       console.log("faild Download..");
                 //   }
                //});
                //res.download( path.resolve(file),subject+".pdf",function (err,datas) {
                 //   if(!err){
                  //      console.log("hello"+err)
                   // }
                 //   console.log("Me"+datas)
                    //res.render("#");
               // });
            }
        }

    });



}

exports.findsyllabus=function (req,res) {
    console.log("hello");
    syllabus.distinct('_id',function (err,data) {
        if(!err){
            res.send(data);
        }
        else{
            console.log(err);
        }
    });
}

function uploadPDF(req,res,objFileName,Path){
    var selectedFile = req.files.myfile;
    selectedFile.mv('public/Syllabus/'+Path+"/"+objFileName +'.pdf', function (err) {
        if (err) {
            console.log(err)
        } else {
            //var fileSize = req.files.myfile.size/1024;
            //var msg = "File uploaded to "+Path+" ("+(fileSize.toFixed(2)) +" kb)";
            var type="success";
            res.send('file Uploaded !');
        }
    });
}

/*Create Directory for Creating Course (Abu 2-10-2017)*/
function createDirectory(path, child) {
    mkdir('public/Syllabus/' + path, function (err) {
        if (!err)
            syllabus.create({
                _id: child
            });
        console.log("Created Succes");
    });
}


function CreateCourse(parant, child, req, res, path) {
    syllabus.findOne({_id: parant}, function (err, data) {
        if (!data) {
            syllabus.create({
                _id: parant,
                children: child
            }, function (err, syllabus) {
                if (!err) {
                    //var path=parant+"/"+child
                    createDirectory(path, child);
                    res.send('Created')
                    //res.redirect('#');
                    //return done(null, false, {message: 'syllabus Create succes'});
                    //return true;

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
                            createDirectory(path, child);
                            res.send('Course Succesflly Created')
                            //return done(null, false, {message: 'syllabus Create succes'});
                        }
                        else {
                            console.log(err);
                        }
                    });
            }
            else {
                res.send('Course Alredy Exists');
                //res.redirect('#');
                //return done(null, false, {message: 'syllabus Create succes'});
            }

        }
    });
}









