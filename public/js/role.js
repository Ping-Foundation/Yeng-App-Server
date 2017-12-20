$(document).ready(function () {
    $('#btnCreateRole').on('click',function () {
        alert("Hello");
    });
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
    //for (var i = 0; i < $('#tblRole').length; i++){
    //$("#some_id")[0].checked
    //}
    var news=$('#tblRole input.subject-News:checked').val();
    var admin=$('#tblRole input.subject-admin:checked').val();
    var syllabus=$('#tblRole input.subject-syllabus:checked').val();
    var role=$('#tblRole input.subject-role:checked').val();
    if(!news){
        news="404";
    }
    if(!admin){
        admin="404";
    }
    if(!syllabus){
        syllabus="404";
    }
    if(!role){
        role="404";
    }


    //console.log(checkedElements);
    alert("news : "+news +"admin : "+admin +"syllabus : "+syllabus+"role : "+role );
}
