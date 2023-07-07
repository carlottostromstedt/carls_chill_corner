(() => {
  // app/javascript/colorpicker.js
  var formField = document.getElementById("form-field");
  var updateButton = document.getElementById("update-button");
  var colorInput = document.getElementById("color-input");
  updateButton.addEventListener("click", function() {
    colorInput.textContent = document.getElementById("colorInput1").jscolor.toHEXString();
    console.log("hello");
  });
  function setDefaultColor() {
    var colorInput2 = document.getElementById("colorInput1");
    colorInput2.jscolor.fromString("A0C0BF");
    colorInput2.textContent = document.getElementById("colorInput1").jscolor.toHEXString();
  }
  window.addEventListener("load", setDefaultColor);
})();
//# sourceMappingURL=/assets/colorpicker.js.map
