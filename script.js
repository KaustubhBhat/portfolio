// Define toggleMenu function globally
function toggleMenu() {
  const menu = document.querySelector(".mobile-menu");
  const icon = document.querySelector(".nav-toggle");

  // Toggle 'open' class for both the icon and menu
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".dots");
  const dotSize = 5; // Small dot size
  const numberOfDots = 1000; // Total number of dots to cover the viewport

  function createDot(x, y) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    container.appendChild(dot);

    // Set size and initial position for each dot
    dot.style.width = `${dotSize}px`;
    dot.style.height = `${dotSize}px`;
    dot.style.top = `${y}px`;
    dot.style.left = `${x}px`;
    dot.style.zIndex = "1"; // Lower z-index for dots

    // Start animation
    animateDot(dot, x, y);
  }

  function animateDot(dot, startX, startY) {
    const speed = 0.1; // Adjust this value to control the speed
    let currentX = startX;
    let currentY = startY;

    function move() {
      currentX += speed;
      currentY -= speed;

      // Wrap around logic
      if (currentX > window.innerWidth) {
        currentX = 0; // Move to the left edge
      }
      if (currentY < 0) {
        currentY = window.innerHeight; // Move to the bottom edge
      }

      dot.style.transform = `translate(${currentX - startX}px, ${
        currentY - startY
      }px)`;
      requestAnimationFrame(move); // Continue the animation
    }

    move(); // Start the movement
  }

  // Generate dots
  for (let i = 0; i < numberOfDots; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    createDot(x, y);
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  function changeActiveLink() {
    let index = sections.length;

    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove("active"));
    navLinks[index].classList.add("active");
  }

  window.addEventListener("scroll", changeActiveLink);

  // Contact form submission handling
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevents the default form submission

      const formData = new FormData(this);

      fetch(this.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      }).then(function (response) {
        if (response.ok) {
          alert("Thank you for your message. I'll get back to you soon!");
          document.getElementById("contact-form").reset(); // Clear the form after submission
        } else {
          alert("Oops! Something went wrong. Please try again.");
        }
      });
    });

  // Ensure the menu toggle function works
  document.querySelector(".nav-toggle").addEventListener("click", toggleMenu);

  // Show Introduction section on page load
  window.onload = function () {
    const introSection = document.getElementById("introduction");
    if (introSection) {
      introSection.style.display = "block";
    }
  };
});
