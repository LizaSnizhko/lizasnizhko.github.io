// Smooth scrolling for navigation links

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `.navbar nav a[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            }

        });

    },
    {
        threshold: 0.35
    }
);


sections.forEach(section => {
    observer.observe(section);
});



// Horizontal project navigation

const projectGrid = document.querySelector(".project-grid");
const projectPrev = document.querySelector("#project-prev");
const projectNext = document.querySelector("#project-next");

projectNext.addEventListener("click", () => {
    const card = projectGrid.querySelector(".project-card");
    const gap = parseFloat(getComputedStyle(projectGrid).gap);

    projectGrid.scrollBy({
        left: card.offsetWidth + gap,
        behavior: "smooth"
    });
});

projectPrev.addEventListener("click", () => {
    const card = projectGrid.querySelector(".project-card");
    const gap = parseFloat(getComputedStyle(projectGrid).gap);

    projectGrid.scrollBy({
        left: -(card.offsetWidth + gap),
        behavior: "smooth"
    });
});