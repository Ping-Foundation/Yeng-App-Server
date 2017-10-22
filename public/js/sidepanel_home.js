
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
//////////////////
/*add news*/

$(document).ready(function () {
    $("#news_add").click(function () {
        $(".news_items").css("background","#fff");
        $(".news_items").css("color","#cc0052");
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
/*add admin page*/
$(document).ready(function () {
    $("#admin_add").click(function () {
        $(".admin_li").css("background","#fff");
        $(".admin_li").css("color","#cc0052");

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

});











