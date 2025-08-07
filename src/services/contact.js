function submitHandler(event) {
  event.preventDefault();
  let form = event.target;

  let data = new FormData(form);
  

  for (let dato of data.entries()) {
    console.log(dato[0] + ": " + dato[1]);
     console.log("-------------------------------");
  }
  form.reset();
}

document.addEventListener("submit", function (event) {
  if (event.target && event.target.id==='form') {
    submitHandler(event);
    console.log("Form submitted successfully.");
  }
});
