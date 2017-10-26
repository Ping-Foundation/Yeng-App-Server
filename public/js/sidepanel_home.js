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

///////////////////////////////////////
//        OnClick Function          //
/////////////////////////////////////
$(document).ready(function () {
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





