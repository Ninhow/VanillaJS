const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}

//Show Input error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Check email is valid
function isEmailValid(email){
    const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    
    return regex.test(String(email).toLowerCase());
}

//Event Listeners
form.addEventListener('submit', function(event){
    event.preventDefault();
    if(username.value === ''){
        showError(username, 'Username is required');
    }else{
        showSuccess(username)
    }
    if(email.value === ''){
        showError(email, 'Email is required');
    }else if(!isEmailValid(email.value)){
        showError(email, 'Email is not valid');
    }else{
        showSuccess(email)
    }
    if(password.value === ''){
        showError(password, 'Password is required');
    }else{
        showSuccess(password)
    }
    if(password2.value === ''){
        showError(password2, 'Confirm password is required');
    }else{
        showSuccess(password2)
    }
})