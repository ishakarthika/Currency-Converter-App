var myModal
window.onload = function() {
    myModal = new bootstrap.Modal(document.getElementById('loginModal'))
    var logInUser=localStorage.getItem('user');
 
    if(!logInUser || logInUser == '') {
        myModal.show();
    }
    var userNameField = document.getElementById("formGroupExampleInput2");

    userNameField.addEventListener('keyup', function(event){
        var regx= /^[0-9a-zA-Z]+$/;
        if(event && event.target && event.target.value == '' ||!event.target.value.match(regx)) {
            userNameField.classList.add('is-invalid')
        } else {
            userNameField.classList.remove('is-invalid');
            userNameField.classList.add('is-valid');
        }
    });
}
function login() {
    var user=document.getElementById("formGroupExampleInput2").value;
    if(user){
        localStorage.setItem('user', user);
        myModal.hide();
    }
}
