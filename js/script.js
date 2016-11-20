window.onload = function() {
    var form = document.getElementById('register');

    form.addEventListener("click",function(event){
        event.preventDefault();
    });

    var submitButton = document.getElementById('submit_registry');
    var deleteButton = document.getElementById('delete_data');

    submitButton.onclick = function validateForm() {

        //data variable for getting input values

        var data = {};

        var elements = form.elements;

        var valid = true;

        for (var i = 0; i < elements.length; i++) {
            var item = elements.item(i);
            data[item.name] = item.value;
            if (item.value == "") {
                valid = false;
                item.classList.add("false_input");
            }
        }

        console.log(data);
        console.log(valid);


        var password = document.getElementById('password').value;
        var verifyPassword = document.getElementById('password_again').value;
        var warningMessage = document.getElementById('warning_msg');

        if ((password == verifyPassword) && valid) {
            form.submit();
        } else if ((password != verifyPassword) && valid) {
            warningMessage.className = "visible";
            warningMessage.children[0].innerHTML = "Gesli se ne ujemata!";
        } else if ((password == verifyPassword) && !valid) {
            warningMessage.className = "visible";
            warningMessage.children[0].innerHTML = "Izpolnite vsa polja!";
        }

    }

    deleteButton.onclick = function () {

        var elements = form.elements;

        for (var i = 0; i < elements.length; i++) {
            var item = elements.item(i);
            item.value = "";
        }
    }
}
