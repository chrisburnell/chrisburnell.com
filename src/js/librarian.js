let shelvers = document.querySelectorAll("[data-sort]");
let shelfItems = document.querySelectorAll(".shelf article");

if (shelvers.length > 0) {
    let sortingStyles = {
        "chronological": [...shelfItems],
        "alphabetical": [...shelfItems].sort((a, b) => {
            return a.innerText.localeCompare(b.innerText);
        }),
        "release": [...shelfItems].sort((a, b) => {
            return b.querySelector(".release").dateTime.localeCompare(a.querySelector(".release").dateTime);
        }),
        "rating": [...shelfItems].sort((a, b) => {
            return a.innerText.localeCompare(b.innerText);
        }).sort((a, b) => {
            return (b.querySelector(".rating") ? b.querySelector(".rating").value : 0) - (a.querySelector(".rating") ? a.querySelector(".rating").value : 0);
        }),
        "author": [...shelfItems].sort((a, b) => {
            return b.querySelector(".release").dateTime.localeCompare(a.querySelector(".release").dateTime);
        }).sort((a, b) => {
            return (a.querySelector(".h-cite") ? a.querySelector(".h-cite").innerText : 0).localeCompare(b.querySelector(".h-cite") ? b.querySelector(".h-cite").innerText : 0);
        })
    };

    for (let button of shelvers) {
        button.addEventListener("click", () => {
            let set = sortingStyles[button.dataset.sort];
            if (button.getAttribute("aria-current")) {
                set = set.reverse();
            }
            button.dataset.direction = (button.dataset.direction == "descending" ? "ascending" : "descending");
            for (let i in set) {
                set[i].style.order = i;
            }
            document.querySelector("[data-sort][aria-current]").removeAttribute("aria-current");
            button.setAttribute("aria-current", "true");
        });
    }
}
