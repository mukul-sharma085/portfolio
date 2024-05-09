'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
//email.js setup

function SendMail(e){
  // e.preventDefault()
  // var params={
  //   from_name :document.getElementById("fullname").value ,
  //   email_id:document.getElementById('emailid').value,
  //   message: document.getElementById('message').value
  // }
  // emailjs.send("service_k780ei7","template_cda4j5i",params).then(function (res){
  //   alert('Success!');
  //   document.getElementsByClassName("form")[0].reset();
  // })
  e.preventDefault();

  // Check if any field is empty
  var fullname = $("#fullname").val().trim();
  var emailid = $("#emailid").val().trim();
  var message = $("#message").val().trim();

  if (!fullname || !emailid || !message) {
    // Show error SweetAlert if any field is empty
    Swal.fire({
      title: 'Error!',
      text: 'Please fill in all fields before sending the message.',
      icon: 'error',
      showConfirmButton: false,
      // customClass: {
      //   confirmButton: 'btn btn-danger'
      // },
      background: '#000',
      theme: 'dark',
      toast:true,
      timer:'1700',
      position:'top-end'
    });
    return;
  }

  var params = {
    from_name: fullname,
    email_id: emailid,
    message: message
  };

  emailjs.send("service_k780ei7", "template_cda4j5i", params)
    .then(function (res) {
      // Show success SweetAlert if message sent successfully
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully.',
        icon: 'success',
        showConfirmButton: false,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        background: '#1E1E1F',
        theme: 'dark',
        
        timer:'1700',
        toast:true,
        position:'top-end'
      });

      // Reset the form after successful submission
      $(".form")[0].reset();
    })
    .catch(function (error) {
      // Show error SweetAlert if message sending fails
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while sending your message. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-danger'
        },
        background: '#000',
        theme: 'dark'
      });
    });
}