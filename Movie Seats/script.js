const container = document.querySelector('.container'); //Väljer en
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); //Väljer alla och lägger i en lista
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    
    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat)
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * parseInt(movieSelect.value);
    console.log("SelectedSeats: " + selectedSeatsCount + " Price: " + parseInt(movieSelect.value))
}

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1 ){
                seat.classList.add('selected')
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Movie selector
movieSelect.addEventListener('change', (event) =>{
    ticketPrice = event.target.value;
    setMovieData(event.target.selectedIndex, event.target.value)
    updateSelectedCount();
})


//Seat selector
container.addEventListener('click', (event) => {
    if(event.target.classList.contains('seat') && !event.target.classList.contains('occupied')){
        event.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

updateSelectedCount();