// get elements
const form = document.querySelector('.top-banner form');
const msg = document.querySelector('.message');
const list = document.querySelector('ul');
// define empty arr for holding, for checking if a city is already on the page
var dataArr = []


form.addEventListener('submit', el => {
    // prevent form from submitting
    el.preventDefault();
    const usrInput = document.querySelector('#userInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${usrInput}&appid=${KEY}&units=metric`;
    fetch(url)
      .then(res => res.json())
        .then(data=>{
            // data from api 
            const {main, name, sys, weather} = data;
            const icon = `https://openweathermap.org/img/wn/${weather[0]['icon']}@2x.png`;
            // markup for weather card
            const markup = `
            <li class="city card">
                <h2 class="city-name card-title">
                    ${name}, ${sys.country}
                </h2>
                <h3 class="city-temp display-4">${Math.round(main.temp)}<sup>°C</sup></h3>
                <figure>
                    <img src="${icon}" alt="${weather[0]['main']}" class="city-icon">
                    <figcaption class="card-text">${weather[0]['description']}</figcaption>
                </figure>
                <button class='btn btn-danger delete-card' onclick='deleteCard(this)'>Remove</button>
            </li>`;
            // check if requested city is already on the page
            if (dataArr.length>0){
                if(checkID(data)){
                    // if card not on page
                    const li = document.createElement('li');
                    li.classList.add('city');
                    li.innerHTML = markup;
                    list.appendChild(li);
                    dataArr.unshift(data);
                }
            }
            else{
                // if no cards on page
                const li = document.createElement('li');
                li.classList.add('city');
                li.innerHTML = markup;
                list.appendChild(li);
                dataArr.unshift(data);
            }
        })
        .catch((err) => {
            // catch errors 
            console.log(err);
            msg.textContent = 'Requested city was not found';
            msg.style.display = 'block';
            
        });
    //reset alert banner and form value
    msg.style.display = 'none';
    msg.classList.remove('alert-warning');
    msg.classList.add('alert-danger');
    form.reset();  
});


function checkID(resdata){
    for(let i=0; i<dataArr.length; i++){
        // if the requested card's data is in the dataArr, then the card is already on the page
        if(dataArr[i].id === resdata.id){
            // change alert banner styles
            msg.classList.remove('alert-danger');
            msg.classList.add('alert-warning');
            // alert banner text 
            msg.textContent = `${resdata.name}, ${resdata.sys.country} is already on your page...`;
            msg.style.display = 'block';
            return false;
        }
    }
    // returns true if card is NOT on page
    return true;
}


function deleteCard(el){
    // delete child of the parent of el's parent element
    el.parentElement.parentElement.removeChild(el.parentElement);
    let title = el.previousSibling.previousSibling.previousSibling.textContent;
    dataArr.pop(checkTitle(title));
};


function checkTitle(title){
    for(let i=0; i<dataArr.length; i++){
        if(title == dataArr[i].name){
            // if the title of the card is equal to the title of any data object in the dataArr, return it's index in dataArr
            return i
        }
    }
}