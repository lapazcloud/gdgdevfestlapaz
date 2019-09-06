document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }

  function countdown(endDate) {
    let days, hours, minutes, seconds;
    
    endDate = new Date(endDate).getTime();
    
    if (isNaN(endDate)) {
    return;
    }
    
    setInterval(calculate, 1000);
    
    function calculate() {
      let startDate = new Date();
      startDate = startDate.getTime();
      
      let timeRemaining = parseInt((endDate - startDate) / 1000);
      
      if (timeRemaining >= 0) {
        days = parseInt(timeRemaining / 86400);
        timeRemaining = (timeRemaining % 86400);
        
        hours = parseInt(timeRemaining / 3600);
        timeRemaining = (timeRemaining % 3600);
        
        minutes = parseInt(timeRemaining / 60);
        timeRemaining = (timeRemaining % 60);
        
        seconds = parseInt(timeRemaining);
        
        document.getElementById("days").innerHTML = parseInt(days, 10);
        document.getElementById("hours").innerHTML = ("0" + hours).slice(-2);
        document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
        document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);
      } else {
        return;
      }
    }
  }

  (function () { 
    countdown('10/11/2019 03:00:00 PM'); 
  }());

});

