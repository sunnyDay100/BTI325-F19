/* $(document).ready(function(){
    console.log("doc ready");
});
 */
/* jQuery(function(){
    console.log("short version - doc ready");
}); */

/* $(function(){
    console.log("short version - doc ready");
}); 
console.log("file loaded"); */

 $(function(){
    // jQuery Selectors: fast way to access DOM elements
    //access the selected elements
    
    // event handling
    $("#b1").click(function(){
        $("#b1").css("color","red");
        $("#p1").hide();
       // $("#b1").css("color","red");
    });
    $(".c2").css("color", "blue");
    $("#b2").click(function(){
        $("p").hide();
    });

    $("#b3").click(function(){
        $("p").show();
    });

    $("h3").on("click", function(){
        $(this).css("font-size","30px");
    });

    $("#p3").on({
        mouseenter: function(){
            $(this).css("background-color", "red");
        },
        mouseleave: function(){
            $(this).css("background-color", "green");
        },
        click: function(){
            $(this).css("color", "yellow");
        }
    });

    //DOM modification
    // create element
    $("<div> <p> added by jQuery </p> </div>").appendTo("body");
    $("#b4").click(function(){
        $("<div> <p> added to div by jQuery </p> </div>").appendTo("#container");
    });
   // click +
   /*
   $("#add").click(function(){
    $("<div> <p> add a new para </p> </div>").appendTo("#addHere");
});*/
    
    $( "<h2>", {
            text: "Click me!",
            click: function() {
              $( this ).css( "color", "green" );
            }
          })
            .appendTo( "#container" );


});// all in this function


 