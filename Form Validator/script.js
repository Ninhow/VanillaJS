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
    
    if(regex.test(email.value.trim())){
        showSuccess(email)
    }else{
        showError(email, 'Email is not valid')
    }
}

function getFieldName(htmlElement){
    return htmlElement.id.charAt(0).toUpperCase() + htmlElement.id.slice(1);
}

function checkRequired(input){

    input.forEach(function(element) {
        if(element.value.trim() === ''){
            showError(element, `${getFieldName(element)} is required`);
        }else{
            showSuccess(element);
        }
    })
}

function checkLength(htmlElement, min, max){
    
    if(htmlElement.value.length <= min ){
        showError(htmlElement, `${getFieldName(htmlElement)} must be at least ${min}`)
        
    }else if(htmlElement.value.length >= max){
        showError(htmlElement, `${getFieldName(htmlElement)} must less than ${max}`)
    }else{
        showSuccess(htmlElement)
    }
}

function passwordMatch(password1, password2){
    if( password1.value === password2){
        showSuccess(password1);
        showSuccess(password2);
    }else{
        showError(password1);
        showError(password2);
    }
}

//Event Listeners
form.addEventListener('submit', function(event){
    event.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 5, 15);
    checkLength(password, 6, 25);
    isEmailValid(email)
})