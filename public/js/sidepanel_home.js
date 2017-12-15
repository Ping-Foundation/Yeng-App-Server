
// side navigation menu
//////////////////////////////////

$(document).ready(function(){

    $('.side_menu').on('click', function(){
        var value=$(this).val();
        console.log(value);
        $(".side_menu").css("background-color","transparent");
        $(".side_menu").css("color","black");
        $(this).css("background-color","#18a39c");
        $(this).css("color","#fff");
        $("loading_gif").show();
        $.ajax({
            url: value,
            method: "GET",
            data: {

            },

            success: function(data, textStatus, jqXHR) {
                $("#loading_gif").hide();
                console.log("succes");

                $("#body").html(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("error");
            }
        });

    });
});

/*add-news page view*/
$(document).ready(function () {
    $("#news_add").click(function () {
        $(".news_items").css("background","#fff");
        $(".news_items").css("color","#23527c");
        $.ajax({
            url: '/news/add',
            method: "GET",
            data: {

            },

            success: function(data, textStatus, jqXHR) {
                $("#loading_gif").hide();
                console.log("succes");

                $("#news_details").html(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("error");
            }
        });
    })
})
//////////////////////////
/*add_admin page view*/
$(document).ready(function () {
    $("#admin_add").click(function () {
        $(".admin_li").css("background","#fff");
        $(".admin_li").css("color","#23527c");

        $.ajax({
            url: '/admin/new',
            method: "GET",
            data: {

            },

            success: function(data, textStatus, jqXHR) {
                $("#loading_gif").hide();
                console.log("succes");

                $("#admin_details").html(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("error");
            }
        });
    })
})



/*search news*/

$(document).ready(function () {
    $("#news_sear_btn").click(function () {
        var value=$("#news_sear").val();
        alert(value);

        $.ajax({
            url: "/news/search",
            method: "GET",
            data: {
                "news-title":value
            },

            success: function(data, textStatus, jqXHR) {
                $("#loading_gif").hide();
                console.log("succes");

                $("#body").html(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("error");
            }
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

});
/*refresh page on browser back button*/
if(!!window.performance && window.performance.navigation.type == 2)
{
    window.location.reload();
}

$(document).on('click', '.browse', function(){
    var file = $(this).parent().parent().parent().find('.file');
    file.trigger('click');
});
$(document).on('change', '.file', function(){
    $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
});

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





