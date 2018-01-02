/**
 * Created by Abu on 19-12-2017.
 */
var mongoose = require('mongoose');
var role = mongoose.model('UserRole');
exports.viewRole=function (req,res) {
    role.find({},function (err,objRole) {
        if(!err){
            res.render('role/rolemanagment',{layout: false,heading:"Role Management",Roles:objRole});
        }
    });

}
exports.addRole=function (req,res) {
    res.render('role/addrole',{layout: false})
}
exports.doaddRole=function (req,res) {
        role.findOne({RoleName: req.body.objRoleName}, function (err, data) {
            if (!err) {
                console.log("no error");
                if (!data) {
                    role.create({
                        RoleName: req.body.objRoleName,
                        Description: req.body.objRoleDscription,
                        News_and_Updates: req.body.objnews,
                        Admin_Management: req.body.objadmin,
                        Syllabus: req.body.objSyllabus,
                        Manage_Role: req.body.objRole
                    }, function (err, role) {
                        if (!err) {
                            res.send("1");
                        }
                    });

                } else {
                    res.send("0");
                }
            } else {
                res.send("-1");
            }
        });
}