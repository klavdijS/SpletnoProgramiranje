/**
 * Created by Klavdij on 25/11/2016.
 */

window.onload = function () {
    document.getElementById('file-upload').addEventListener('change', handleFileSelect, false);

    function handleFileSelect(evt) {
        var files = evt.target.files;
        var f = files[0];
        var reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                document.getElementById('list').innerHTML = ['<img src="', e.target.result,'" title="', theFile.name, '" width="19%" />'].join('');
            };
        })(f);

        reader.readAsDataURL(f);
    }
};