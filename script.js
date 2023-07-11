const container = document.querySelector('.container');
const  count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');


getFromLocalStorage();
calculateTotal();

container.addEventListener('click',function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected');
        calculateTotal();

    }
});

select.addEventListener('change' ,function(e){
    calculateTotal();
});

function calculateTotal(){
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArr = []; /*list elements*/
    const seatArr = [];
    
    selectedSeats.forEach(function(seat){ /*go over every element*/
        selectedSeatsArr.push(seat);/*push elements*/
    });

    seats.forEach(function(seat){/*travel seats list*/ 
        seatArr.push(seat);
    });
    /*list creating -index list which will be stored in local storage */
    /**map method will give the list of choosen elements */
    let selectedSeatsIndexs = selectedSeatsArr.map(function(seat){
        return seatArr.indexOf(seat);/*indexx nu iligili liste üz. getir, selectedSeatsIndex içine kopyalanır*/
    });
    /**print that list */
    console.log(selectedSeatsIndexs);
    
    let selectedSeatCount = selectedSeats.length;
    //let price = select.value;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    /**ouşturulan elemanları local storage a kaydetmek (save the generated elements to the local storage)*/
    saveToLocalStorage(selectedSeatsIndexs);
}

/**gather info from local storage */
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


function saveToLocalStorage(indexs){
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));/**gönderilen index nu. kaydet */
    localStorage.setItem('selectedMovieIndex',select.selectedIndex);/**which film choosen */
}
