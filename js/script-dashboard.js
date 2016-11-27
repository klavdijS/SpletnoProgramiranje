/**
 * Created by Klavdij on 26/11/2016.
 */

window.onload = function () {
    //Get modal

    var modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal

    var span = document.getElementsByClassName("close")[0];

    var editButtons = document.getElementsByClassName('edit-td');

    var cancelButton = document.getElementById('cancel-btn');

    var saveButton = document.getElementById('save-btn');

    //Initialize event listener

    for (var i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click',openModal,false);
    }

    //Function that the event listener adds so that it opens modal

    function openModal () {
        console.log("Test");
        modal.style.display = 'block';
    }

    //Click span to close the modal

    span.onclick = function() {
        modal.style.display = "none";
    };

    cancelButton.onclick = function () {
        modal.style.display = "none";
    };

    //Close the modal if there is a click outside of it.

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
};
