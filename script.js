var myModal
var countries;
var fromList;
var india;
var mainCountriesList;
var mainCountriesList1;
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
 // code to generate list dropdown for from source;
function createFromDropdown(list) {
    countries.forEach(function(country) {
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
       
        list.appendChild(option);
    })
}
// Loading country list
$(document).ready(function() {
    $.getJSON('./assets/country-json/src/country-by-currency-code.json', function(data) {
        console.log(data);
        countries = data;
        india = data.find(function(e) {
           //  console.log('e', e);
            return e.currency_code === 'INR';
        })

        document.getElementById('from-cc-selected').innerHTML = india.country + ' (' + india.currency_code + ')';
        document.getElementById('to-cc-selected').innerHTML = india.country + ' (' + india.currency_code + ')';
        console.log(india);
        // From country dropdown code
        fromList = document.getElementById('from-country-list');
        createFromDropdown(fromList);
        toList=document.getElementById('to-country-list');
        createFromDropdown(toList);

        fromList.addEventListener('click', function(event) {
           
            document.getElementById('from-cc-selected').innerHTML = event.target.textContent;
          //  document.getElementById('from-cc-flag').classList.add('currency-flag');
            console.log(event.target.textContent);
            console.log(event.target.textContent.split(' '))
            var country = mainCountriesList.find(function(i) {
                console.log('i', i);
                return i.name === event.target.textContent.split(' ')[0];
            });
            console.log(country);
            if(country && country.currency && country.currency.symbol) {
                document.getElementById('test').innerHTML = country.currency.symbol;
            } else {
                document.getElementById('test').innerHTML = ''
            }
            
            currency_conveter();
           // document.getElementById('from-cc-flag').classList.add()
        })

        toList.addEventListener('click', function(event) {
            
            document.getElementById('to-cc-selected').innerHTML = event.target.textContent;
            console.log(event.target.textContent);
            console.log(event.target.textContent.split(' '))
            var country = mainCountriesList.find(function(i) {
                console.log('i', i);
                return i.name === event.target.textContent.split(' ')[0];
            });
            console.log(country);
            if(country && country.currency && country.currency.symbol) {
                document.getElementById('test1').innerHTML = country.currency.symbol;
            } else {
                document.getElementById('test1').innerHTML = ''
            }
            currency_conveter();
        })
        
    });

    $.getJSON('./assets/countries.json', function(data) {
        mainCountriesList = data;

        var country = mainCountriesList.find(function(i) {
            return i.name === "India";
        });
        if(country && country.currency && country.currency.symbol) {
            document.getElementById('test').innerHTML = country.currency.symbol;
        } else {
            document.getElementById('test').innerHTML = ''
        }
    })
    $.getJSON('./assets/countries.json', function(data) {
        mainCountriesList1 = data;

        var country = mainCountriesList1.find(function(i) {
            return i.name === "India";
        });
        if(country && country.currency && country.currency.symbol) {
            document.getElementById('test1').innerHTML = country.currency.symbol;
        } else {
            document.getElementById('test1').innerHTML = ''
        }
    })
})
function currency_conveter(){
    var from_country_name=document.getElementById("from-cc-selected").innerHTML;
    var to_country_name=document.getElementById("to-cc-selected").innerHTML;
    var userEnteredNumber=document.getElementById("from-amount").value;
    from_country_name = from_country_name.split(' ')[1];
    from_country_name = from_country_name.replace('(', '');
    from_country_name = from_country_name.replace(')', '');
    to_country_name = to_country_name.split(' ')[1];
    to_country_name = to_country_name.replace('(', '');
    to_country_name = to_country_name.replace(')', '');
    Promise.all([
        $.ajax({
            url: 'http://api.exchangeratesapi.io/v1/latest?access_key=299eb1c5de6da25873ebf17356274d37&symbols=' + from_country_name,
        }),
        $.ajax({
            url: 'http://api.exchangeratesapi.io/v1/latest?access_key=299eb1c5de6da25873ebf17356274d37&symbols=' + to_country_name,
        })
    ])
    .then(function(data) {
        console.log('data', data);
        var fromExRate = data[0].rates[from_country_name]
        var toExRate = data[1].rates[to_country_name]

        var baseExRate = baseCurrencyconveter(fromExRate, toExRate);
        console.log(baseExRate);
        var toAmount;
        if(userEnteredNumber) {
            toAmount = userEnteredNumber * baseExRate;
            toAmount = Math.round(toAmount);
            console.log(toAmount);
            document.getElementById('toAmount').innerHTML = toAmount;
        }
    })


}
function baseCurrencyconveter(Num1, Num2){
    var Num3 = 1/Num1 * Num2;
    return Num3;
}





