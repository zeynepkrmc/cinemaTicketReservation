const container = document.querySelector('.container');
const  count = documnet.getElementById('count');
const amount = documnet.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');


getFromLocalStorage();
calculateTotal();

container.addEventListener('click',function(e){
    if(e.target.classList.contains('seat') && !e.target.contains('reserved')){
        e.target.classList.toggle('selected');
        calculateTotal();

    }
});

select.addEventListener('change' ,function(e){
    calculateTotal();
});

function calculateTotal(){
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArr = [];
    const seatArr = [];
    
    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function(seat){
        seatArr.push(seat);
    });

    let selectedSeatIndex = selectedSeatsArr.map(function(seat){
        return seatArr.indexOf(seat);
    });

    console.log(selectedSeatIndex);

    let selectedSeatCount = selectedSeats.length;
    //let price = select.value;
    count.innertText = selectedSeatCount;
    amount.innertText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndex);
}

function getFromLocalStorage(){
    const selectedseats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedseats != null && selectedseats.length > 0){
        seats.forEach(function(seat, index) {
            if(selectedseats.indexOf(index) > -1) 
                seat.classList.add('selected');
        });
    }

    if(selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex;
    }
}


function saveToLocalStorage(selectedSeatIndexs){
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex',select.selectedIndex);
}