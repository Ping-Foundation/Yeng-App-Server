$(document).ready(function () {
    $('#btnCreateRole').on('click',function () {
        alert("Hello");
    });
    $("#add_roll").on('submit',function (e) {
        e.preventDefault();
        if ($(this).valid()) {
            docrRole();
        }
    })
    $("#add_roll").validate({
        rules:{
            "RollName":{
                required:true,
                minlength:4
            },
            "Discription":{
                required:true,
                minlength:6
            },
            "SubNews":{
                required:true
            },
            "SubAdmin":{
                required:true
            },
            "SubSyllabus":{
                required:true
            },
            "SubRole":{
                required:true
            }
        },
        messages:{
            "SubNews":{
                required:"Select one option"
            },
            "SubAdmin":{
                required:"Select one option"
            },
            "SubSyllabus":{
                required:"Select one option"
            },
            "SubRole":{
                required:"Select one option"
            }
        }
    })

    $(".role_del").click(function () {
        var id=$(this).val();
        alert(id);
    })
});
function fnccratenewRole() {
    //waitingDialog.show('Custom message');

    $.ajax({
        url:"/role/admin/addnew",
        method:"get",
        data:{},
        success:function (data) {
            $("#body").html(data);
        }

    });

}

function docrRole(){
    var objRoleName=document.getElementById('txtRoleName').value;
    var objRoleDscription=document.getElementById('txtescription').value;
    var objnews=$('#tblRole input.subject-News:checked').val();
    var objadmin=$('#tblRole input.subject-admin:checked').val();
    var objSyllabus=$('#tblRole input.subject-syllabus:checked').val();
    var objRole=$('#tblRole input.subject-role:checked').val();
    if(!objnews){
        objnews="-1";
    }
    if(!objadmin){
        objadmin="-1";
    }
    if(!objSyllabus){
        objSyllabus="-1";
    }
    if(!objRole){
        objRole="-1";
    }
    if(objRoleName.trim()!="") {
        $.ajax({
            url: "/role/admin/doaddRole/" + objRoleName,
            method: "post",
            data: {
                objRoleName: objRoleName,
                objRoleDscription: objRoleDscription,
                objnews: objnews,
                objadmin: objadmin,
                objSyllabus: objSyllabus,
                objRole: objRole

            }, success: function (data) {
                if (data == '1') {
                    $("#success-body").show();
                    $("#fail-body").hide();
                    $("#success").empty().text("Role " + objRoleName);
                    Resetpage();
                    //alert("Role "+objRoleName+" Succesfully Created ");
                }
                else if (data == '0') {
                    $("#success-body").hide();
                    $("#fail-body").show();
                    $("#fail").empty().text("Role " + objRoleName);
                    $("#txtRoleName").focus();
                    //alert("Role "+objRoleName+" Alredy Exists");
                }
                else if (data == '-1') {
                    alert("Error While creating Role " + objRoleName + " Please Try Again");
                }

            }
        });
    }
    else{
        $('[data-toggle="rolenameover"]').popover();
    }


    //console.log(checkedElements);
    //alert("news : "+news +"admin : "+admin +"syllabus : "+syllabus+"role : "+role );
}
function btnResetOnPress() {
    Resetpage();
    $("#success-body").hide();
    $("#fail-body").hide();
}

function Resetpage(){
    $('#txtRoleName').val("");
    $('#txtescription').val("");
    $('input[type=checkbox]').each(function () {
        this.checked=false;
    });
    $("#txtRoleName").focus();
}
