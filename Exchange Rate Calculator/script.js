const currency1 = document.getElementById('currency-one');
const currency2 = document.getElementById('currency-two');
const amount1 = document.getElementById('amount-one');
const amount2 = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');


function calculate(){
    const currency_one = currency1.value;
    const currency_two = currency2.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(
        response => response.json()
    ).then(data =>{
        const rate = data.rates[currency_two]
        rateElement.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;
        amount2.value = (amount1.value * rate).toFixed(2);
    })
}

currency1.addEventListener('change', calculate)
amount1.addEventListener('input', calculate)
currency2.addEventListener('change', calculate)
amount2.addEventListener('input', calculate)

swap.addEventListener('click', () => {
    const temp = currency1.value;
    currency1.value = currency2.value;
    currency2.value = temp;
    calculate();
})
calculate();