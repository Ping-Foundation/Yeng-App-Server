
var mongoose=require('mongoose');
var news=mongoose.model('news');
var multer  = require('multer');
var upload = multer({ dest: 'public/news' });
var fileUpload = require('express-fileupload');
var mkdir = require('mkdirp');
var path=require('path');
var fs=require("fs");



var collections = ['news'];

//var db = require('mongojs');


exports.add=function (req,res) {

    res.render("addnews-page",{layout:false});
};
exports.doAdd=function (req,res) {
    console.log("add news");

        news.create({
            Tittle: req.body.Tittle,
            News:req.body.News,
            CreatedOn: Date.now(),
            DisplayDate:req.body.DisplayDate,
            EndDate:req.body.EndDate
        },function (err,news) {
            if (err){
                console.log(err);
            }
            else if(req.files.NewsAttachment) {
                    console.log("have file");
                    var uploadFile = req.files.NewsAttachment;
                    var fileName = news._id + ".pdf";
                    var path = "public/news";
                    console.log(path + fileName);
                    var source = path + "/" + fileName;
                    uploadFile.mv(path + "/" + fileName, function (err, data) {
                        news.AttachmentPath = source;
                        news.AttachmentName = fileName;
                        news.save(function (err, data) {
                            if (err) {
                               console.log("err on file");
                               console.log(err);
                            }
                            else {
                                res.redirect('/adminhome');
                            }
                        })
                    });
                }
                else res.redirect("/adminhome");


        })
        /*console.log(req.files.NewsAttachment);
        var uploadFile = req.files.NewsAttachment;
        var fileName = req.files.NewsAttachment.name + ".pdf";
        var path = "public/news";
        console.log(path + fileName);
        uploadFile.mv(path + "/" + fileName);
        var source = path + "/" + fileName*/

    /*else{
        news.create({

        })
    }*/
   /* news.create({
        Tittle: req.body.Tittle,
        News:req.body.News,
        CreatedOn: Date.now(),
        DisplayDate:req.body.DisplayDate,
        EndDate:req.body.EndDate,
        AttachmentPath:source,
        AttachmentName:fileName
    },function (err,news) {
        if(err){
            console.log(err);
            if(err.code===11000){
                res.redirect( '/news/add?exists=true' );
            }else{
                res.redirect('/?error=true');
            }

        }else {
            //Success
            console.log("news saved: " + news);
            res.redirect('/adminhome')
        }

    })*/
};



exports.view=function (req,res) {
    news.find({}).sort({DisplayDate:'desc'}).exec(function(err, news) {
        keys=Object.keys(news);
        l=keys.length;
        console.log(keys);
        console.log(l);
        /*for(var i=0;i<news.length;i++){
            news[i].News=news[i].News.replace(/(\r\n)/gm," ");
            if(news[i].News.length>30)
                news[i].News=news[i].News.slice(0,30)+"...";
        }*/
        res.render('viewnews-page',{
            news: news,
            keys:keys,layout:false
        });
    })

};
exports.getnews=function (req,res) {
    var now=new Date(Date.now());
    var now=now.toUTCString();
    news.find({"DisplayDate":{$lt:now},"EndDate":{$gt:now}},function(err, news) {
        if(!err){
            res.json(news);
        }else{
            console.log(err);
            res.json({"status":"error", "error":"Error finding news"});
        }
    })
};
exports.detailedview=function (req,res) {
    console.log(req.params.id);
    news.findOne({_id:req.params.id},function (err,news){
        if(!err){
            if (!news){
                console.log("no news");
                res.redirect('/news?404=error');
            }else {
                console.log("news found");
                res.render('detailed-news-view',{
                        "_id":news._id,
                        "Tittle":news.Tittle,
                        "News":news.News,
                        "Startdate":news.DisplayDate,
                        "Enddate":news.EndDate,
                        "Attachment":news.AttachmentName,
                    layout:false
                    }
                );
            }

        }else {
            console.log(err);
            res.redirect('/news?404=error');
        }
    });

};
exports.getspecificnews=function (req,res) {
    news.findOne({_id:req.params.id},function (err,news) {
        if(!err){
            console.log(news);
            res.json(news);
        }else{
            console.log(err);
            res.json({"status":"error", "error":"Error finding news"});
        }

    })
};
exports.delete=function (req,res) {
    console.log('delete function worked');
    console.log(req.params.id);
    if (req.params.id){
         console.log('Entered into if');
         console.log('paramas'+req.params.id);
         news.findByIdAndRemove(req.params.id,function (err,news) {
             if (err){
                 console.log(err);
                 return res.redirect('/news?error=deleting');
             }else {
                 if (fs.existsSync(news.AttachmentPath)) {
                     fs.unlink(news.AttachmentPath);
                 }

                 console.log("news deleted");
                 res.redirect('/adminhome');
             }

         })
    }
};
exports.edit = function(req, res){
    if (req.session.loggedIn !== true){
        res.redirect('/');
    }else{
        news.findOne({'_id':req.params.id}, function (err,news) {
            if(err){
                console.log(err);
                return res.redirect('/user?error=findingnews');
            }
            else {
                res.render('editnews', {
                    _id:news._id,
                    Tittle: news.Tittle,
                    News:news.News,
                    DisplayDate:news.DisplayDate,
                    EndDate:news.EndDate,layout:false
                });
            }
        });


    }
};
exports.doEdit=function (req,res) {
    if (req.files.NewsAttachment){
        var attachment=req.files.NewsAttachment
    }
    else
        attachment=null;
        console.log("no file");
    console.log(req.body.id);
    news.findById( req.body.id,
        function (err, news) {
            console.log(news);
            doEditSave (req, res, err, news,attachment);
        }
    );
};
var doEditSave = function(req, res, err, news,attachment) {
    if(err){
        console.log(err);
        res.redirect( '/user?error=finding');
    } else {
        news.Tittle = req.body.Tittle;
        news.News = req.body.News;
        news.modifiedOn = Date.now();
        news.DisplayDate=req.body.DisplayDate;
        news.EndDate=req.body.EndDate;
        news.save(
            function (err, news) {
                if (attachment){
                    fs.unlink(news.AttachmentPath);
                    var path="public/news/"+news._id+".pdf";
                    attachment.mv(path,function (err,data) {
                        news.AttachmentPath=path;
                        news.AttachmentName=news._id;
                        news.save(function (err,news) {
                            onEditSave (req, res, err, news);
                        })
                    })

                }

            }
        );
    }
};
var onEditSave = function (req, res, err, news) {
    if(err){
        console.log(err);
        res.redirect( '/user?error=saving');
    } else {
        console.log('news updated');
        res.redirect('/adminhome')
    }
};

exports.delAttach=function (req,res) {
    var name=req.body.Name;
    news.findOne({"AttachmentName":name},function (err,news) {
        if(err){

        }
        else{
           fs.unlink(news.AttachmentPath,function (err,done) {
               if(err){
                    console.log("file deletion failed")
               }
               else{
                   console.log("file delete");
                   news.AttachmentPath=null;
                   news.AttachmentName=null;
                   news.save(function (err,data) {
                       if (err){
                           console.log("error on deletion of file info");
                       }
                       else{
                           console.log("file info deleted");
                           res.redirect('/adminhome');
                       }
                   })


              /*    news.update({_id:news._id},
                      {$set:{"AttachmentPath":"a","AttachmentName":"b"}},function (err,data) {
                          if (err){
                              console.log("error on deletion of file info");
                          }
                          else{
                              console.log("file info deleted");
                              console.log(data);
                              res.redirect('/adminhome');
                          }
                      }
                      )*/

               }
           })
        }
    })
}

function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()){
        return next();
    }
    else
        res.redirect('/');
}
function notLoggedIn(req,res,next) {
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}



