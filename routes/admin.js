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
exports.create= function (req,res) {
    res.render('addadmin', {
        title: 'Create admin',
        buttonText: "Add"
    });
};
exports.doCreate=function (req,res) {
    admin.create({
        Email: req.body.Email,
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
            keys:keys
        })

    })

};

exports.changepassword= function (req,res) {
    res.render('changepassword',{
        name:req.params.id
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
                            admin.update(
                                {_id:admin._id},
                                { $set: {Password:req.body.Password } },
                            function(){
                                res.redirect( '/adminhome' );
                            }
                            )
                        }

                    }
                })
        }else {
            res.redirect('/changepassword?404=error');
        }


    }
};