// ================== toggle color changer ======================

document.addEventListener("DOMContentLoaded", () => {
    const colorChanger = document.querySelector(".color-changer");
    const toggler = document.querySelector(".color-changer-toggler");
  
    // Guard: stop if the required elements don't exist
    if (!colorChanger || !toggler) return;
  
    // Toggle open/close when the toggler is clicked
    toggler.addEventListener("click", (event) => {
      // Stop the click from immediately triggering the document listener
      event.stopPropagation();
      colorChanger.classList.toggle("open");
    });
  
    // Close when clicking outside
    document.addEventListener("click", (event) => {
      // If the click is NOT inside the colour changer AND NOT on the toggler, close it
      if (
        !colorChanger.contains(event.target) &&
        event.target !== toggler
      ) {
        colorChanger.classList.remove("open");
      }
    });
  
    // Close on scroll
    window.addEventListener("scroll", () => {
      if (colorChanger.classList.contains("open")) {
        colorChanger.classList.remove("open");
      }
    });
  });


// ================== theme colors ======================

const alternateColors = document.querySelectorAll(".alternate-color");
function setActiveColor(color) 
{
    alternateColors.forEach((style) => {
        if(color === style.getAttribute("title")) 
        {
            style.removeAttribute("disabled");
        }
        else {
            style.setAttribute("disabled","true");

        }
    })
}


// ================== light and dark mode ======================
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark")
})
window.addEventListener("load", () => {
    if(document.body.classList.contains("dark")) {
        dayNight.querySelector("i").classList.add("fa-sun");
    }
    else {
        dayNight.querySelector("i").classList.add("fa-moon");
    }
})
