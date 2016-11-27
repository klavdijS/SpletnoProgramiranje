/**
 * Created by Klavdij on 27/11/2016.
 */
window.onload = function () {

    document.getElementById('file-upload').addEventListener('change', handleFileSelect, false);

    function handleFileSelect(evt) {
        var files = evt.target.files;
        var f = files[0];
        var reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                document.getElementById('list').innerHTML = ['<img src="', e.target.result,'" title="', theFile.name, '" width="150" style="margin-top: 2rem" />'].join('');
            };
        })(f);

        reader.readAsDataURL(f);
    }

    var formContainer = document.getElementsByClassName('change-password')[0];
    var checkBox = document.getElementById('distance-checkbox');

    resizeMe();

    window.onresize = function() {
        resizeMe();
    };

    function resizeMe() {
        var width = screen.width;
        if (width < 800) {
            formContainer.className = "change-password small-screen-container";
            checkBox.className = "checkbox-responsive";
        }
        else {
            formContainer.className = "change-password";
            checkBox.className = "";
        }
    }


    var form = document.getElementById('settings');

    form.addEventListener("click",function(event){
        event.preventDefault();
    });

    var saveButton = document.getElementById('save-btn');

    saveButton.onclick = function changeParams () {
        var elements = form.elements;

        var password = document.getElementById('change-password').value;
        var passwordAgain = document.getElementById('change-password-again').value;
        var warningMessage = document.getElementById('warning_msg');

        if (password == passwordAgain) {
            form.submit();
            warningMessage.className = 'hidden';
        } else {
            warningMessage.className = 'visible';
        }
    }
};