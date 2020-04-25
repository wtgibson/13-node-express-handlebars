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

  $(".create-form").on("submit", function (event) {
    event.preventDefault();

    var newBurger = {
      burger_name: $("#burger").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim()
    };
    console.log(newBurger);

    // Send POST request
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        location.reload();
      }
    );
  });
});