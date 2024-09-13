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

  // JavaScript to handle scrolling to the contact section when the button is clicked
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

  document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    function changeActiveLink() {
      let index = sections.length;

      while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

      navLinks.forEach((link) => link.classList.remove("active"));
      navLinks[index].classList.add("active");
    }

    changeActiveLink();
    window.addEventListener("scroll", changeActiveLink);

    document
      .getElementById("contact-form")
      .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents the default form submission

        var formData = new FormData(this);

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

    // Function to handle the display of sections
    function showSection(sectionId) {
      // Hide all sections
      document.querySelectorAll("section").forEach((section) => {
        section.style.display = "none";
      });

      // Show the selected section
      document.getElementById(sectionId).style.display = "block";
    }

    // On page load, show the introduction section by default
    window.onload = function () {
      showSection("introduction");
    };
  });
});
