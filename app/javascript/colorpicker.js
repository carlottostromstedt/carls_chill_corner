const formField = document.getElementById('form-field');
const updateButton = document.getElementById('update-button');
const colorInput = document.getElementById('color-input');

updateButton.addEventListener('click', function() {
    colorInput.textContent = document.getElementById('colorInput1').jscolor.toHEXString();
    console.log("hello");
});

function setDefaultColor() {
    var colorInput = document.getElementById("colorInput1");
    colorInput.jscolor.fromString("A0C0BF");
    colorInput.textContent = document.getElementById('colorInput1').jscolor.toHEXString();
}

window.addEventListener("load", setDefaultColor);