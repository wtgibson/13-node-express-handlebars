$(function () {

  $(".change-devour").on("click", function (event) {
    var id = $(this).data("id");
    var newDevoured = $(this).data("newdevoured");

    var newDevouredState = {
      devoured: newDevoured
    };

    // Send PUT request
    $.ajax("api/burgers" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function () {
        console.log("Changed devoured status to", newDevoured);
        location.reload();
      }
    );
  });


  
});