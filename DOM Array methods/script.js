const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = new Array();

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser(){
    const response = await fetch(`https://randomuser.me/api`);
    responseData = await response.json();

    const user = responseData.results[0];
    
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()* 10000000)
    }
    addData(newUser)
}

function addData(user){
    data.push(user);
    updateDOM();
}

function updateDOM(providedData = data){
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

    providedData.forEach((person) => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`
        main.appendChild(element);
    });
}


function formatMoney(number){
    return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney(){
    data = data.map((user) => {
        return { ...user, money: user.money * 2 }
    })

    updateDOM();
}

function sortRichest(){
    data.sort((a,b) => b.money - a.money)
    updateDOM();
}

function filterMuchMoney(){
    data = data.filter((user) => {
        return user.money > 5000000
    })
    updateDOM();
}

function calculateWealth(){
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthElement);

}
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortRichest);
showMillionairesBtn.addEventListener('click', filterMuchMoney);
calculateWealthBtn.addEventListener('click', calculateWealth);