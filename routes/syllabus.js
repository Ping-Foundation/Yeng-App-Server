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
var rmdir = require('rimraf');


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
//////////////////////////////////////
///View Course Details
///Created Date  :
///Updated Date : 29-09-2017
///Created      :Abu
//////////////////////////////////////
exports.viewcourse = function (req, res) {
    syllabus.find({_id: "Syllabus"}, function (err, data) {
        if (!err) {
            //var items=[];
            //keys=Object.keys(data);
            res.render('syllabus/viewcourse', {course: data, layout: false});
        }
    });

}
//////////////////////////////////////
///Create Semester
///Created Date  :07-10-2017
///Updated Date : 26-10-2017
///Created      :Abu
//////////////////////////////////////
exports.createSem = function (req, res) {
    syllabus.find({_id:""}, function (err, data) {

    });
}
//////////////////////////////////////
///Enter Create Course Page
///Created Date  :1-10-2017
///Updated Date : 26-10-2017
///Created      :Abu
//////////////////////////////////////
exports.coursecreate = function (req, res) {
    res.render('syllabus/addcourse', {layout: false, titlecr: "Create Course"});
}
//////////////////////////////////////
///Create Course
///Created Date  :1-10-2017
///Updated Date : 11-10-2017
///Created      :Abu
//////////////////////////////////////
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
//////////////////////////////////////
///Enter Edit Course Page
///Created Date  :1-10-2017
///Updated Date : 11-10-2017
///Created      :Abu
//////////////////////////////////////
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
//////////////////////////////////////
///Do Edit Course
///Created Date  :1-10-2017
///Updated Date : 26-10-2017
///Created      :Abu
///                         Not Finished
//////////////////////////////////////
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
//////////////////////////////////////
///View Semester
///Created Date  :1-10-2017
///Updated Date : 10-10-2017
///Created      :Abu
//////////////////////////////////////
exports.viewSemester = function (req, res) {
    console.log("Hello")
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
//////////////////////////////////////
///enter Create Semester page
///Created Date  :1-10-2017
///Updated Date : 10-10-2017
///Created      :Abu
///      This Removed From Our Project
//////////////////////////////////////
exports.addSemester = function (req, res) {
    var objParantCourse = req.params.courseparant;
    syllabus.findOne({_id: objParantCourse}, function (err, data) {
        if (!err) {
            res.render('syllabus/addsem', {layout: false, courseName: objParantCourse});
        }
    })
    console.log(objParantCourse);
}
//////////////////////////////////////
///Create Semester
///Created Date  :1-10-2017
///Updated Date : 11-10-2017
///Created      :Abu
//////////////////////////////////////
exports.doaddSemester = function (req, res) {
    //console.log("i am here");
    //console.log(req.body.course);
    //console.log(req.body.sem);
    var semNAme = req.body.course + "_" + req.body.sem
    //var path=req.body.name+"/"+req.body.sem; // under folder name same like Sem Name no extension
    var path = req.body.course + "/" + req.body.sem;
    CreateCourse(req.body.course, semNAme, req, res, path);


}
//////////////////////////////////////
///View Branch
///Ceated Date  :1-10-2017
///Updated Date : 11-10-2017
///Created      :Abu
//////////////////////////////////////
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
//////////////////////////////////////
///Enter Create Branch page
///Created Date  :10-10-2017
///Updated Date : 16-10-2017
///Created      :Abu
//////////////////////////////////////
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
//////////////////////////////////////
///Create Branch
///Created Date  :6-10-2017
///Updated Date : 11-10-2017
///Created      :Abu
//////////////////////////////////////
exports.doaddbranch = function (req, res) {
    var brname = req.body.course + "_" + req.body.sem + "_" + req.body.branch
    var path = req.body.course + "/" + req.body.sem + "/" + req.body.branch;
    CreateCourse(req.body.course + "_" + req.body.sem, brname, req, res, path);

}
//////////////////////////////////////
///View Subject
///Created Date  :15-10-2017
///Updated Date : 24-10-2017
///Created      :Abu
//////////////////////////////////////
exports.viewSubj = function (req, res) {
    var course=req.params.subj.split("_")[0];
    var sem=req.params.subj.split("_")[1];
    var branch=req.params.subj.split("_")[2];

    syllabus.findOne({_id: req.params.subj}, function (err, data) {
        console.log(req.params.subj);
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
//////////////////////////////////////
///Enter Create Subject Page
///Created Date  :6-10-2017
///Updated Date : 20-10-2017
///Created      :Abu
//////////////////////////////////////
exports.addSubj = function (req, res) {
    syllabus.findOne({_id: req.params.subj}, function (err, brdata) {
        if (!err) {
            syllabus.findOne({children: req.params.subj}, function (err, semdata) {
                if (!err) {
                    // syllabus.findOne({children: semdata._id}, function (err, coursedata) {
                    //  if (!err) {
                    res.render('syllabus/addsubj', {
                        layout: false,
                        brName: brdata._id.split("_")[2],
                        semName: brdata._id.split("_")[1],
                        courseName: brdata._id.split("_")[0]
                        //  });
                        //  } else {
                        //      console.log(err)}
                        //})
                    });

                } else {
                    console.log(err);
                }
            });

        } else {
            console.log(err);
        }
    });
}
//////////////////////////////////////
///Create Subject
///Created Date  :6-10-2017
///Updated Date : 20-10-2017
///Created      :Abu
//////////////////////////////////////
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
///Download PDF
///Created Date  :18-10-2017
///Updated Date : 23-10-2017
///Created      :Abu
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
//////////////////////////////////////
///Search All _id
///Created Date  :18-10-2017
///Updated Date : 25-10-2017
///Created      :Abu
//////////////////////////////////////
exports.findsyllabus=function (req,res) {
    var serch=[];
    syllabus.distinct('_id',function (err,data) {
        if(!err){
            //  console.log(data);
            //for(var i=0;data.length>i;i++){
                //console.log(data[i].split("_"));
              //  serch[i]=data[i].split("_");
            //}
            res.send(data);
        }
        else{
            console.log(err);
        }
    });
}
//////////////////////////////////////
///Course Delete
///Created Date  :24-11-2017
///Updated Date : 25-11-2017
///Created      :Abu
//////////////////////////////////////
exports.doDelete=function (req,res) {
    var objCourse=req.params.id;
    var myquery = {_id: {"$regex":objCourse,"$options":"i"}};
    syllabus.deleteMany(myquery,function (err,data) {
        if (err) throw err;
        console.log(data.result.n + " document(s) deleted");
        syllabus.update(
            {
                _id:"Syllabus"
            },
            {
                $pull:{
                    children:{
                        $in:[objCourse]
                    }
                }
            },function (err,obj) {
                if(!err){
                    console.log(obj.result);
                    var path="public/Syllabus/"+objCourse
                    removeDirectory(path,objCourse,res)
                }else{
                    console.log(err)
                }
            }

        );
    });
}
//////////////////////////////////////
///Function for upload pdf
///Created Date  :18-10-2017
///Updated Date : 20-10-2017
///Created      :Abu
//////////////////////////////////////
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
//////////////////////////////////////
///Function Create Directory
///Created Date  :2-10-2017
///Updated Date : 10-10-2017
///Created      :Abu
//////////////////////////////////////
function createDirectory(path, child) {
    mkdir('public/Syllabus/' + path, function (err) {
        if (!err)
            syllabus.create({
                _id: child
            });
        console.log("Created Succes");
    });
}
//////////////////////////////////////
///Function for create Course
///Created Date  :18-10-2017
///Updated Date : 25-10-2017
///Created      :Abu
//////////////////////////////////////
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
//////////////////////////////////////
///Function for Remove Directory
///Created Date  :25-11-2017
///Updated Date : 25-11-2017
///Created      :Abu
//////////////////////////////////////
function removeDirectory(path,corsename,res) {
    rmdir(path,function (err) {
        if(!err){
            res.send("Succesfully Deleted Course "+corsename);
        }else{
            res.send(err+":  Removing "+corsename);
        }
    });
}









