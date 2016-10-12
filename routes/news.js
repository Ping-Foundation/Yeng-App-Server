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
        res.render('viewnews-page', {
            news: news
            // Tittle:news.Tittle,
            // Content:news.News

        })
    })

};