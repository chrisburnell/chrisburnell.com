const notificationElement = document.querySelector(".notification");

let updateNotification = (text, type = "positive") => {
    notificationElement.innerHTML = text;
    notificationElement.classList.add(`notification--${type}`);
    notificationElement.classList.remove("hidden");
    setTimeout(() => {
        notificationElement.classList.add("hidden");
        notificationElement.classList.remove(`notification--${type}`);
    }, 1000);
};

let updateNetwork = (event) => {
    if (navigator.onLine) {
        console.log("You have regained your network connection.");
        notificationElement.innerHTML = "👍 You have regained your network connection.";
        notificationElement.classList.add("notification--positive");
    } else {
        console.log("You have lost your network connection.");
        notificationElement.innerHTML = "👎 You have lost your network connection.";
        notificationElement.classList.add("notification--negative");
    }
    notificationElement.classList.remove("hidden");
    setTimeout(() => {
        notificationElement.classList.add("hidden");
        notificationElement.classList.remove("notification--positive", "notification--negative");
    }, 1000);
};
