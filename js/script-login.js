/**
 * Created by Klavdij on 26/11/2016.
 */
window.onload = function() {

    var usernameCoded = "admin";
    var passwordCoded = "admin123";

    var form = document.getElementById('login');

    form.addEventListener("click",function(event){
        event.preventDefault();
    });

    var loginButton = document.getElementById('login-btn');


    loginButton.onclick = function checkLoginParams () {
        var elements = form.elements;

        var valid = true;

        for (var i = 0; i < elements.length; i++) {
            var item = elements.item(i);
            if (item.value == "") {
                valid = false;
                item.classList.add("false_input");
            }
        }

        var password = document.getElementById('password').value;
        var username = document.getElementById('username').value;
        var warningMessage = document.getElementById('warning_msg');

        if ((username == usernameCoded) && (password == passwordCoded) && valid) {
            form.submit();
        } else if (!valid) {
            warningMessage.className = 'visible';
            warningMessage.children[0].innerHTML = "Izpolnite vsa polja!";
        } else {
            warningMessage.className = 'visible';
            warningMessage.children[0].innerHTML = "Uporabniško ime in geslo se ne ujemata!";
        }
    };
};
