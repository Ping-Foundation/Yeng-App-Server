/**
 * Created by navina on 11/10/16.
 */
var mongoose=require('mongoose');
var news=mongoose.model('news');



var collections = ['news'];

//var db = require('mongojs');


exports.add=function (req,res) {
    res.render("addnews-page")
};
exports.doAdd=function (req,res) {
    news.create({
        Tittle: req.body.Tittle,
        News:req.body.News,
        CreatedOn: Date.now(),
        DisplayDate:req.body.DisplayDate,
        EndDate:req.body.EndDate,
        ModifiedOn: Date.now()
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

    })
};
exports.view=function (req,res) {
    news.find(function(err, news) {
        keys=Object.keys(news);
        l=keys.length;
        console.log(keys);
        console.log(l);
        res.render('viewnews-page', {
            news: news,
            keys:keys
        })
    })

};
exports.getnews=function (req,res) {
    news.find(function(err, news) {
        if(!err){
            console.log(news);
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
                        "Enddate":news.EndDate
                    }
                )
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

     if (req.body._id){
         User.findByIdAndRemove(req.body._id,function (err,news) {
             if (err){
                 console.log(err);
                 return res.redirect('/news?error=deleting');
             }else {
                 console.log("news deleted");
                 res.redirect('/news/view')
             }

         })
    }
};