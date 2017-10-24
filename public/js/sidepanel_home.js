/*add news&updates*/
$(document).ready(function(){

    $('#add-news').on('click', function(){
        $("loading_gif").show();
        $.ajax({
            url: "/news/add",
            method: "GET",
            data: {

            },

            success: function(data, textStatus, jqXHR) {
                $("#loading_gif").hide();
                console.log("succes");
                console.log(data);
                $("#body").html(data);
                $("#items li").css("background-color","transparent");
               $("#add-news").css("background-color","#18a39c");

               $("#items a").css("color","black");
                $("#add-news a").css("color","#fff");


            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("error");
            }
        });

    });
});


/*view news&updates*/
$(document).ready(function(){

    $('#view-news').on('click', function(){
        $("#loading_gif").show();
        $.ajax({
            url: "/news/view",
            method: "GET",
            data: {

            },

            success: function(data, textStatus, jqXHR) {
                console.log("succes");
                console.log(data);
                $("#loading_gif").hide();
                $("#body").html(data);
                $("#items li").css("background-color","transparent");
                $("#view-news").css("background-color","#18a39c");

                $("#items a").css("color","black");
                $("#view-news a").css("color","#fff");


            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("error");
            }
        });

    });
});

/*view admin details*/
$(document).ready(function(){

    $('#view-admin').on('click', function(){
        $("#loading_gif").show();
        $.ajax({
            url: "/admin/view",
            method: "GET",
            data: {

            },

            success: function(data, textStatus, jqXHR) {
                console.log("succes");
                console.log(data);
                $("#loading_gif").hide();
                $("#body").html(data);
                $("#items li").css("background-color","transparent");
                $("#view-admin").css("background-color","#18a39c");

                $("#items a").css("color","black");
                $("#view-admin a").css("color","#fff");


            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("error");
            }
        });

    });
});
/*add new admin*/
$(document).ready(function(){

    $('#add-admin').on('click', function(){
        $("#loading_gif").show();
        $.ajax({
            url: "/admin/new",
            method: "GET",
            data: {

            },

            success: function(data, textStatus, jqXHR) {
                console.log("succes");
                console.log(data);
                $("#loading_gif").hide();
                $("#body").html(data);
                $("#items li").css("background-color","transparent");
                $("#add-admin").css("background-color","#18a39c");

                $("#items a").css("color","black");
                $("#add-admin a").css("color","#fff");


            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("error");
            }
        });

    });
});

/*cancel edit news*/
$(document).ready(function () {
    $("#cancel_edit").click(function () {
        $("#news-details").hide();
        console.log("success");
    });
});
/*cancel change password*/
$(document).ready(function () {
    $("#cancel_change").click(function () {
        $("#change_pswd").hide();
        console.log("success");
    });
});
function delet() {
    confirm("Confirm Delete?");
}

//////////////////////////////////////
///View Child of Course
///Ceated Date  :
///Updated Date : 20-10-2017
///Created      :Abu
//////////////////////////////////////
function parantCourse(objCourse){
    //console.log(objCourse.value);
    $("#loading_gif").show();
    $.ajax({
        url:"/syllabus/course/sem/"+objCourse.value,
        method:"get",
        data:{

        },
        success:function (data,txtStataus,jqXHR) {
            console.log(objCourse.value+" Viw page enterd");
            $("#loading_gif").hide();
            $("#body").html(data);
        }

    });

}
///////////////////////////////////////
//        OnClick Function          //
/////////////////////////////////////

$(document).ready(function () {
    //////////////////////////////////////
    ///Enter Add Subject Page
    ///Ceated Date  :
    ///Updated Date : 20-10-2017
    ///Created      :Abu
    //////////////////////////////////////
    $('#add-subject').on('click',function () {
        $("#loading_gif").show();
        var objSubParant=document.getElementById('subjectParant').value;
        $.ajax({
            url:"/syllabus/course/sem/branch/addsubj/"+objSubParant,
            method:"get",
            data:{

            },
            success:function (data,txtStataus,jqXHR) {
                console.log(objSubParant.value+" view page enterd");
                $("#loading_gif").hide();
                $("#body").html(data);
            }
        });
    });
    //////////////////////////////////////
    ///entr Add Course
    ///Ceated Date  :
    ///Updated Date : 20-10-2017
    ///Created      :Abu
    //////////////////////////////////////
    $('#add-course').on('click',function () {
        $('#loading_gif').show();
        $.ajax({
            url:"/syllabus/course/new",
            method:"get",
            data:{

            },
            success:function (data,txtStataus,jqXHR) {
                console.log("create page enterd");
                //console.log(data);
                $("#loading_gif").hide();
                $("#body").html(data);
                $("#items li").css("background-color","transparent");
                $("#view-syllabus").css("background-color","#18a39c");

                $("#items a").css("color","black");
                $("#view-syllabus a").css("color","#fff");
            }
        });

    });
    //////////////////////////////////////
    ///View Syllabus
    ///Ceated Date  :
    ///Updated Date : 20-10-2017
    ///Created      :Abu
    //////////////////////////////////////
    $('#view-syllabus').on('click',function () {
        $("#loading_gif").show();
        $.ajax({
            url:"/syllabus/course/view",
            method:"GET",
            data:{

            },
            success:function (data,txtStataus,jqXHR) {
                console.log("succes");
                console.log(data);
                $("#loading_gif").hide();
                $("#body").html(data);
                $("#items li").css("background-color","transparent");
                $("#view-syllabus").css("background-color","#18a39c");

                $("#items a").css("color","black");
                $("#view-syllabus a").css("color","#fff");
            }
            //$("#items li").css("background-color","transparent");
            //$("#view-syllabus").css("background-color","#18a39c");
        });

    });

});
//////////////////////////////////////
///View Child of Sem
///Ceated Date  :
///Updated Date : 20-10-2017
///Created      :Abu
//////////////////////////////////////
function parantSem(objSem) {
    var course=document.getElementById('ParantCourse').value;
    $("#loading_gif").show();
    $.ajax({
        url:"/syllabus/course/sem/branch/"+course+"_"+objSem.value,
        method:"get",
        data:{

        },
        success:function (data,txtStataus,jqXHR) {
            console.log(objSem.value+" view page enterd");
            $("#loading_gif").hide();
            $("#body").html(data);
        }

    });
}
//////////////////////////////////////
///View Child of Branch
///Ceated Date  :
///Updated Date : 20-10-2017
///Created      :Abu
//////////////////////////////////////
function parantbranch(objBranch) {
    var brancch=document.getElementById('branchParant').value;
    $("#loading_gif").show();
    $.ajax({
        url:"/syllabus/course/sem/branch/subj/"+brancch+"_"+objBranch.value,
        method:"get",
        data:{

        },
        success:function (data,txtStataus,jqXHR) {
            console.log(objBranch.value+" view page enterd");
            $("#loading_gif").hide();
            $("#body").html(data);
        }

    });
}
//////////////////////////////////////
///Entering Edit Course
///Ceated Date  :
///Updated Date : 20-10-2017
///Created      :Abu
//////////////////////////////////////
function editCourse(objButton) {
    console.log(objButton.value);
    $("#loading_gif").show();
    $.ajax({
        url:"/syllabus/course/"+objButton.value,
        type: "get",
        data: {
            //date:$('button').val()
        },
        success:function (data,txtStataus,jqXHR) {
            console.log("Edit page enterd");
            //console.log(data);
            $("#loading_gif").hide();
            $("#body").html(data);
            $("#items li").css("background-color","transparent");
            $("#view-syllabus").css("background-color","#18a39c");

            $("#items a").css("color","black");
            $("#view-syllabus a").css("color","#fff");
        }

    });
}
//////////////////////////////////////
///Update Course Name
///Ceated Date  :
///Updated Date : 20-10-2017
///Created      :Abu
///Updated      :Abu
//////////////////////////////////////
function doeditCourse(){
    $("#loading_gif").show();
    var objCourse=document.getElementById('hiddencourse').value;
    var editedCourse=document.getElementById('txtCourse').value;
    //console.log(coursename);
    $.ajax({
        url:"/syllabus/course/"+objCourse,
        method:"POST",
        data: {
            newcoursename:editedCourse
        },
        success:function(data,txtStataus,jqXHR){
            $("#status").empty().text(data);
        }
    });

}
//////////////////////////////////////
///Downlod PDF
///Ceated Date  :
///Updated Date : 20-10-2017
///Created      :Abu
///                     not Compleated
//////////////////////////////////////
function dnldpdf(SubjectName) {
    $("#loading_gif").show();
    var course=document.getElementById('course').innerHTML;
    //console.log(course);
    var sem=document.getElementById('sem').innerHTML;
    var branch=document.getElementById('branch').innerHTML;
    var subject=SubjectName.value;
    $.ajax({
        url:"/syllabus/course/sem/branch/subj/download/"+subject,
        type:'get',
        data:{
            course:course,
            sem:sem,
            branch:branch,
            subject:subject
        },
        success:function (data) {
            $("#loading_gif").hide();
            console.log(data);
            window.open(data);









































            //window.open("/")

        }
    });

}
//////////////////////////////////////
///Button Rest
///Ceated Date  :
///Updated Date : 20-10-2017
///Created      :Abu
//////////////////////////////////////
function btnReset() {
    alert("Reset All Course Details");
    clearCourse();
}
//////////////////////////////////////
///PDF Uploading Loader For CLient Side
///Ceated Date  :
///Updated Date : 20-10-2017
///Created      :Abu
//////////////////////////////////////
function pdfloader(pesnt) {
    var objloder = document.getElementById("myBar");
    var width = pesnt;
    var id = setInterval(frame,0);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            console.log(width);
            objloder.style.width = pesnt + '%';
            objloder.innerHTML = pesnt * 1  + '%';
        }
    }
}
//////////////////////////////////////
///Create Course (add course /add semester/add Branch/
///Ceated Date  :10-10-2017
///Updated Date : 20-10-2017
///Created      :Abu
//////////////////////////////////////
function docr() {
    $("#loading_gif").show();
    //var i,x,y;
    /* Loader not working */
    //debugger
    $("#status").empty().text("Course Creating...");
    var objCourse=document.getElementById('txtCourse').value;
    $.ajax({
        url:"/syllabus/course/new",
        method:"post",
        data:{
            course:objCourse

        },success:function (data) {
            if(data!='Course Alredy Exists') {
                for (var i = 0; i < $('#semTable input.semobj').length; i++) {
                    var sem = $('#semTable input.semobj')[i].value;
                    $.ajax({
                        url: "/syllabus/course/sem/new",
                        method: "post",
                        data: {
                            course: objCourse,
                            sem: sem
                        },
                        success: function (data) {
                            debugger;
                            for (var x = 0; x < $('#semTable input.semobj').length; x++) {
                                var objsem = $('#semTable input.semobj')[x].value;
                                //debugger;
                                for ( var y = 0; y < $('#brTable input.semobj').length; y++) {
                                    var br = $('#brTable input.semobj')[y].value;
                                    //alert(br);
                                    $.ajax({
                                        url: "/syllabus/course/sem/branch/new",
                                        method: "post",
                                        data: {
                                            course: objCourse,
                                            sem: objsem,
                                            branch: br
                                        },
                                        success: function (respone, txtStataus, jqXHR) {
                                        }

                                    });

                                }

                            }

                            if($('#semTable input.semobj').length==x&&$('#brTable input.semobj').length==y){
                                clearCourse();
                            }
                       }

                    });
                }
                $("#status").empty().text(data);
                alert("Course Created Succesfully");
            }
            else{
                $("#status").empty().text(data);
            }

        }
    });
}
//////////////////////////////////////
///Function For All Text Field and Table
///Ceated Date  :10-10-2017
///Updated Date : 20-10-2017
///Created      :Abu
//////////////////////////////////////
function clearCourse(){
    $('#txtCourse').val("");
    $("#loading_gif").hide();
    $('#sem-first-tahbleRow').val("");
    $('#semTable tr.classgenrow').remove();
    $('#brTable tr.classgenrow').remove();
    $('#br-first-tahbleRow').val("");
}







