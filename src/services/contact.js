const form = document.getElementById('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fData= new FormData(form);
console.log(fData+' '+'Form submitted');


})
