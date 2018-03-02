var mongoose = require('mongoose');
var admin = mongoose.model('admin');
var role = mongoose.model('UserRole');
var passport = require('passport');


// GET login page
exports.login = function (req, res, next) {
    admin.find({},function(err,objAdmin) {
        //console.log('Hello :'+objAdmin);
        if (objAdmin=="") {
            role.create({
                RoleName: 'Admin',
                Description: 'Full Access',
                News_and_Updates: '2',
                Admin_Management: '2',
                Syllabus: '2',
                Manage_Role: '2'
            }, function (err, role) {
                if (!err) {
                    res.render('inadmin', {title: 'Admin Registration'});
                }
            });
        }
        else {
            console.log('Hello');
            var messages = req.flash('error');
            res.render('login-page', {title: 'Log in', msg: messages});
        }
    });

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
exports.doLogin = passport.authenticate('local.signin', {
    failureRedirect: '/',
    successRedirect: '/adminhome',
    failureFlash: true
})


exports.index = function (req, res, next) {

    if (req.session.loggedIn) {
            res.render('adminhome-page', {
                title: req.session.admin.email,
                email: req.session.admin.email,
                adminID:
                req.session.admin._id, login: "true",
                rlNews: req.session.role.News,
                rlAdmin: req.session.role.Admin,
                rlSyllabus: req.session.role.Syllabus,
                rlRole: req.session.role.Role,
            });
    } else {
        res.redirect('/');
    }
};
exports.create = function (req, res) {
    role.find({}, function (err, dbRole) {
        if (!err) {
            res.render('addadmin', {
                title: 'Create admin',
                buttonText: "Add", layout: false,
                role: dbRole
            });
        }
    });


};
exports.inDoCreate=function(req,res){
    role.findOne({RoleName:'Admin'},function(err,objRole){
        if(!err){
            if(objRole){
                admin.create({
                    FirstName: req.body.FirstName,
                    LastName: req.body.LastName,
                    Email: req.body.Email,
                    Mobile: req.body.Mobile,
                    UserRole_id: objRole._id,
                    Password: req.body.Password,
                    ModifiedOn: Date.now(),
                    LastLogin: Date.now()
                },function(err,admindata){
                    if(!err){
                        req.session.admin = {
                            "email": admindata.Email,
                            "_id": admindata._id,
                            "Password":admindata.Password
                        };
                        req.session.role={
                            "News":objRole.News_and_Updates,
                            "Admin":objRole.Admin_Management,
                            "Syllabus":objRole.Syllabus,
                            "Role":objRole.Manage_Role
                        };
                        res.render('adminhome-page', {
                            title: req.session.admin.email,
                            email: req.session.admin.email,
                            adminID:
                            req.session.admin._id, login: "true",
                            rlNews: req.session.role.News,
                            rlAdmin: req.session.role.Admin,
                            rlSyllabus: req.session.role.Syllabus,
                            rlRole: req.session.role.Role,
                        });
                    }

                });

            }

        }else{
            res.redirect(err);
        }

    });
}
exports.doCreate = function (req, res) {
    admin.create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Mobile: req.body.Mobile,
        UserRole_id: req.body.ddlRole,
        Password: req.body.Password,
        ModifiedOn: Date.now(),
        LastLogin: Date.now()
    }, function (err, admin) {
        if (err) {
            console.log(err);
            if (err.code === 11000) {
                res.redirect('/admin/new?exists=true');
            } else {
                res.redirect('/?error=true');
            }
        } else {
            //sucess
            console.log("admin created and saved: " + admin);
            res.redirect('/adminhome');
        }

    })

};
exports.view = function (req, res) {
    admin.find(function (err, admin) {
        keys = Object.keys(admin);
        //console.log(keys);

        res.render('viewadmin-page', {
            admin: admin,

            keys: keys, layout: false
        });

    });

};

exports.changepassword = function (req, res) {
    res.render('changepassword', {
        name: req.params.id, layout: false
    });
};
exports.dochangepassword = function (req, res) {
    console.log("entered into changepassword");
    if (req.body.upassword == req.session.admin.Password) {
        console.log("entered into loop");
        console.log(req.body.id);
        if (req.body.id) {
            admin.findOne({'Email': req.body.id},
                function (err, admin) {
                    if (!err) {
                        if (!admin) {
                            console.log("admin null");
                            res.redirect('/login?404=admin');
                        } else {
                            console.log("found admin");
                            console.log(admin);
                            console.log(req.body.Password);
                            var id = admin._id;

                            admin.update(
                                {Email: req.body.id},
                                {$set: {Password: "5555"}},
                                function (err, data) {
                                    if (!err)
                                        console.log("password changed");
                                    console.log(data);
                                    res.redirect('/adminhome');
                                });


                        }

                    }
                })
        } else {
            res.redirect('/changepassword?404=error');
        }


    }
    else
        res.redirect('/changepassword?404=error');
};
exports.delete = function (req, res) {
    console.log(req.params.id);
    admin.remove({_id: req.params.id}, function (err, removed) {
        if (!err) {
            console.log(removed);
            res.redirect('/adminhome');
        }
    });


};
exports.details = function (req, res, next) {
    admin.findById(req.params.id, function (err, admin) {
        var objAdminRoleName;
        role.findOne({_id:admin.UserRole_id},function (err,adminRole) {
            if(!err) {

                if(adminRole){
                    objAdminRoleName = adminRole.RoleName;
                }
                else{
                    objAdminRoleName="Undefind";
                }

            }
        });
        role.find({}, function (errrole, dbRole) {
            if (!err) {
                res.render('detailed-admin-view', {'admin': admin, layout: false,role:dbRole,RoleName:objAdminRoleName});
            }
            else {
                console.log(err);
            }
        });
    });
}
exports.logout = function (req, res, next) {
    req.session.destroy();
    req.logout();
    res.redirect('/');
}


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else
        res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}