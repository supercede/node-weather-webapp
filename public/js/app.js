const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const successMessage = document.getElementById('success');
const failureMessage = document.getElementById('failure');
const query = document.getElementById('query');

// successMessage.textContent = 'Sijuade';

const getAddress = param => {
    successMessage.innerHTML = '<i>Preparing weather update...</i>'
    const url = `/weather?address=${param}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.error){
                failureMessage.textContent = data.error;
                successMessage.textContent = '';
            }else{
                successMessage.innerHTML = data.location;
                failureMessage.innerHTML = data.forecast;
                query.innerHTML = `You searched for: <b>${param}</b>`
            }
        })
}

weatherForm.addEventListener('submit', (e) =>{
    const location = search.value;

    successMessage.textContent = '';
    failureMessage.textContent = '';
    query.textContent = ``;
    if(location){
        getAddress(location);
    }else{
        successMessage.textContent = 'You must provide an address';
    }
    
    e.preventDefault();
})

