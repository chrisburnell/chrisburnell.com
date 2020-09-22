let buttons = document.querySelectorAll("[class*='sort-']");
let buttonChronological = document.querySelector(".sort-chronological");
let buttonAlphabetical = document.querySelector(".sort-alphabetical");
let buttonRelease = document.querySelector(".sort-release");
let buttonRating = document.querySelector(".sort-rating");

let shelfItems = document.querySelectorAll(".shelf article");

function activateFilter(target) {
    for (let button of buttons) {
        button.disabled = false;
        button.removeAttribute("aria-current");
    }
    target.disabled = true;
    target.setAttribute("aria-current", "true");
}

buttonChronological.addEventListener("click", event => {
    for (let item of shelfItems) {
        item.style.order = 0;
    }
    activateFilter(buttonChronological);
});

buttonAlphabetical.addEventListener("click", event => {
    let alphabetical = [...shelfItems].sort((a, b) => {
        return a.innerText.localeCompare(b.innerText);
    });
    for (let i in alphabetical) {
        alphabetical[i].style.order = i;
    }
    activateFilter(buttonAlphabetical);
});

buttonRelease.addEventListener("click", event => {
    let release = [...shelfItems].sort((a, b) => {
        return b.querySelector(".release").dateTime.localeCompare(a.querySelector(".release").dateTime);
    });
    for (let i in release) {
        release[i].style.order = i;
    }
    activateFilter(buttonRelease);
});

buttonRating.addEventListener("click", event => {
    let rating = [...shelfItems].sort((a, b) => {
        return a.innerText.localeCompare(b.innerText);
    }).sort((a, b) => {
        return (b.querySelector(".rating") ? b.querySelector(".rating").value : 0) - (a.querySelector(".rating") ? a.querySelector(".rating").value : 0);
    });
    for (let i in rating) {
        rating[i].style.order = i;
    }
    activateFilter(buttonRating);
});
