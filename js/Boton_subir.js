document.addEventListener("DOMContentLoaded", () => {
    const btnSubir = document.getElementById("btnSubir");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100 && window.scrollY < 2180) {
            btnSubir.style.display = "block";
        } else {
            btnSubir.style.display = "none";
        }
    });

    btnSubir.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});