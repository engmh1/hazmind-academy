// =========================
// Mobile Menu
// =========================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("open");

    });

}


// =========================
// Close Menu After Clicking
// =========================

document.querySelectorAll("#mainNav a").forEach(link => {

    link.addEventListener("click", () => {

        if (mainNav) {
            mainNav.classList.remove("open");
        }

    });

});


// =========================
// Placeholder Links
// =========================

document
    .querySelectorAll("[data-placeholder]")
    .forEach(link => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            alert(
                "سيتم إضافة رابط الملف أو الصفحة هنا قريبًا."
            );

        });

    });


// =========================
// Current Year
// =========================

const yearElement =
    document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


// =========================
// Header Shadow on Scroll
// =========================

const header =
    document.querySelector(".site-header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 10) {

        header.style.boxShadow =
            "0 5px 20px rgba(16, 32, 51, 0.08)";

    } else {

        header.style.boxShadow =
            "none";

    }

});


// =========================
// Smooth Navigation
// =========================

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });
