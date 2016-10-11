/**
 * Created by navina on 11/10/16.
 */
var mongoose=require('mongoose');
var admin=mongoose.model('admin');




// GET login page
exports.login = function (req, res) {
    res.render('login-page', {title: 'Log in'});
};
exports.doLogin=function (req,res) {
    console.log("entered into doLogin");
    if(req.body.Email){
        admin.findOne(
            {'Email' : req.body.Email,'Password':req.body.Password},
            function (err,admin) {
                if (!err) {
                    if (!admin){
                        console.log("admin null");
                        res.redirect('/login?404=admin');
                    }else{
                        console.log("found admin");
                        req.session.admin = {
                            "email": admin.Email,
                            "_id": admin._id
                        };
                        req.session.loggedIn=true;
                        console.log('Logged in admin: ' + admin);
                        admin.update(
                            {_id:admin._id},
                            { $set: {lastLogin: Date.now()} },
                            function(){
                                res.redirect( '/adminhome' );
                            });
                    }

                }else {
                    console.log(err);
                    res.redirect('/login?404=error');
                }

            }
        )

    }else{
        res.redirect('/login?404=error');
    }

};
exports.index = function (req, res,next) {
    if(req.session.loggedIn){
        res.render('adminhome-page', {
            title: req.session.admin.email,
            email: req.session.admin.email,
            adminID: req.session.admin._id
        })
    }else{
        res.redirect('/');
    }
};

