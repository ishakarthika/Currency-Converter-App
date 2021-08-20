var myModal
var countries;
var fromList;
// load cities
window.onload = function() {
    myModal = new bootstrap.Modal(document.getElementById('loginModal'))
    var logInUser=localStorage.getItem('user');
 
    if(!logInUser || logInUser == '') {
        myModal.show();
        
    } else{
        document.getElementById("notlogin").style.display="none";
        document.getElementById("login-text").innerHTML="Hi "+logInUser+ ", welcome back to Currency Converter";
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
    document.getElementById("notlogin").style.display="none";
    document.getElementById("login-text").innerHTML="Hi "+user+ ", welcome back to Currency Converter";
}
 // code to generate list dropdown;
function createFromDropdown(list) {
    countries.forEach(function(country) {
        console.log(country);
        var code;
        var option = document.createElement('li');
        var flag = document.createElement('span');
        option.value=country.currency_code;
        flag.classList.add('currency-flag')
        if(country.currency_code) {
         code = 'currency-flag-'+country.currency_code.toLowerCase();
        } else {
         code = 'currency-flag-'+country.currency_code;
        }
        flag.classList.add(code);
        option.innerHTML = country.country + ' ('+ country.currency_code+')';
        option.prepend(flag);
       
        fromList.appendChild(option);
    })
}
// loading country list
$(document).ready(function() {
    $.getJSON('./assets/country-json/src/country-by-currency-code.json', function(data) {
        console.log(data);
        countries = data;
        // from country dropdown code
        fromList = document.getElementById('from-country-list');
        createFromDropdown(fromList);

        fromList.addEventListener('click', function(event) {
            console.log('e', event);
            document.getElementById('from-cc-selected').innerHTML = event.target.textContent;
        })

        // to country dropdown code;

    });
})




