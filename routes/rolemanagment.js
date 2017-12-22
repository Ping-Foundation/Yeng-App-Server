/**
 * Created by Abu on 19-12-2017.
 */
var mongoose = require('mongoose');
var role = mongoose.model('UserRole');
exports.viewRole=function (req,res) {
    res.render('role/rolemanagment',{layout: false,heading:"Role Management"});
}
exports.addRole=function (req,res) {
    res.render('role/addrole',{layout: false})
}
reports.doaddRole=function (req,res) {
    //var RoleName=req.body.objRoleName;
    //var RoleDescription=req.body.objRoleDscription;
    //var news=req.body.objnews;
    //var admin=req.body.objadmin;
    //var syllabus=req.body.objSyllabus;
    //var role=req.body.objRole;
    role.findOne({RoleName:req.body.objRoleName},function (err,data) {
        if(!err){
            if(!data){
                role.create({
                    RoleName:req.body.objRoleName,
                    Description:req.body.objRoleDscription,
                    News_and_Updates:req.body.objnews,
                    Admin_Management:req.body.objadmin,
                    Syllabus:req.body.objSyllabus,
                    Manage_Role:req.body.objRole
                },function (err,role) {
                    if(!err) {
                        res.send("Role Created Succesfully");
                    }
                });

            }else{
                res.send("Role Name Alredy exist");
            }
        }else{
            res.send("Error");
        }
    })
}