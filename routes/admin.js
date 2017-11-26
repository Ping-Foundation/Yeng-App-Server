
var mongoose=require('mongoose');
var admin=mongoose.model('admin');
var passport=require('passport');




// GET login page
exports.login = function (req, res,next) {
    var messages=req.flash('error');
    res.render('login-page', {title: 'Log in',msg:messages});
};
/*exports.doLogin=function (req,res, next) {
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
                            "_id": admin._id,
                            "Password":admin.Password
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

};*/

/*passport authentication*/
exports.doLogin=passport.authenticate('local.signin',{
    failureRedirect:'/',
    successRedirect:'/adminhome',
    failureFlash:true
})



exports.index =function (req, res, next) {

    if(req.session.loggedIn){
        res.render('adminhome-page', {
            title: req.session.admin.email,
            email: req.session.admin.email,
            adminID:
            req.session.admin._id,login:"true"
        })
    }else{
        res.redirect('/');
    }
};
exports.create= function (req,res) {
    res.render('addadmin', {
        title: 'Create admin',
        buttonText: "Add",layout:false
    });
};
exports.doCreate=function (req,res) {
    admin.create({
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        Email: req.body.Email,
        Mobile:req.body.Mobile,
        Password:req.body.Password,
        ModifiedOn: Date.now(),
        LastLogin: Date.now()
    },function (err,admin) {
        if (err){
            console.log(err);
            if(err.code===11000){
                res.redirect( '/admin/new?exists=true' );
            }else{
                res.redirect('/?error=true');
            }
        }else {
            //sucess
            console.log("admin created and saved: " + admin);
            res.redirect( '/adminhome' );
        }

    })

};
exports.view=function (req,res) {
    admin.find(function (err,admin) {
        keys=Object.keys(admin);
        console.log(keys);

        res.render('viewadmin-page', {
            admin: admin,

            keys:keys,layout:false
        });

    })

};

exports.changepassword= function (req,res) {
    res.render('changepassword',{
        name:req.params.id,layout:false
    });
};
exports.dochangepassword=function (req,res) {
    console.log("entered into changepassword");
    if (req.body.upassword==req.session.admin.Password){
        console.log("entered into loop");
        console.log(req.body.id);
        if(req.body.id){
            admin.findOne({'Email' : req.body.id},
                function (err,admin) {
                    if(!err){
                        if (!admin){
                            console.log("admin null");
                            res.redirect('/login?404=admin');
                        }else{
                            console.log("found admin");
                            console.log(admin);
                            console.log(req.body.Password);
                            var id=admin._id;

                            admin.update(
                                {Email:req.body.id},
                                {$set:{Password:"5555" }},
                            function(err,data){
                                    if(!err)
                                    console.log("password changed");
                                    console.log(data);
                                res.redirect( '/adminhome' );
                            });


                        }

                    }
                })
        }else {
            res.redirect('/changepassword?404=error');
        }


    }
    else
        res.redirect('/changepassword?404=error');
};
exports.delete=function (req,res) {
    console.log(req.params.id);
    admin.remove({_id:req.params.id}, function(err,removed) {
          if (!err){
              console.log(removed);
              res.redirect( '/adminhome' );
          }
    });


};
exports.details=function (req,res,next) {
    console.log(req.params.id);
    admin.findById(req.params.id,function (err,admin) {
        if(!err){
            console.log(admin);
            res.render('detailed-admin-view',{'admin':admin,layout:false});
        }
        console.log(err);


    })
}
exports.logout=function (req,res,next) {
    req.session.destroy();
    req.logout();
    res.redirect('/');
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