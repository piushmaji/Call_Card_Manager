let showForm = document.querySelector(".modal");
let addCardBtn = document.querySelector("#addCardBtn");

let closeBtn = document.querySelector(".closeBtn");
let reminderForm = document.querySelector("#reminderForm");
const title = document.getElementById('title');
const imgUrl = document.getElementById('imgUrl');
const hometown = document.getElementById('hometown');
const purpose = document.getElementById('purpose');
const category = document.getElementById("category");
const cancelBtn = document.querySelector('.cancelBtn');
const saveBtn = document.querySelector('.save-btn');


let cardStack = document.querySelector(".card-stack");
let upBtn = document.querySelector("#upBtn");
let downBtn = document.querySelector("#downBtn");

let dotBlack = document.querySelector(".dot-black");
let dotPurple = document.querySelector(".dot-purple");
let dotBlue = document.querySelector(".dot-blue");
let dotTeal = document.querySelector(".dot-teal");

window.addEventListener("DOMContentLoaded", () => {
    let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // If no cards in localStorage, add a default card
    if (allTasks.length === 0) {
        const defaultCard = {
            name: "Olivia Chen",
            imgUrl: "https://i.pinimg.com/736x/ff/83/1a/ff831a233c72dfa3f51f5ed3c55efcc4.jpg",
            hometown: "San Francisco",
            purpose: "Marketing Lead at Innovate Inc",
            category: "Default"
        };

        allTasks.push(defaultCard);
        localStorage.setItem("tasks", JSON.stringify(allTasks));
    }

    showCards();
});



//save to Local Storage
function saveToLocalStorage(obj) {
    if (localStorage.getItem("tasks") === null) {
        let oldTask = [];
        oldTask.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTask));
    }
    else {
        oldTask = localStorage.getItem("tasks");
        oldTask = JSON.parse(oldTask);
        oldTask.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTask));
    }
}

//Form validation
reminderForm.addEventListener("submit", function (dets) {
    dets.preventDefault();

    // Get form values
    const nameValue = title.value.trim();
    const imgUrlValue = imgUrl.value.trim();
    const hometownValue = hometown.value.trim();
    const purposeValue = purpose.value.trim();
    const selected = category.value;

    if (nameValue === "") {
        alert("Enter Your name ");
        return;
    }
    if (imgUrlValue === "") {
        alert("Enter img Url ");
        return;
    }
    if (hometownValue === "") {
        alert("Enter hometown");
        return;
    }
    if (purposeValue === "") {
        alert("Enter purpose ");
        return;
    }
    if (selected === "select") {
        alert("Please select a category");
        return;
    }

    saveToLocalStorage({
        name: nameValue,
        imgUrl: imgUrlValue,
        hometown: hometownValue,
        purpose: purposeValue,
        category: selected
    })

    reminderForm.reset();
    showForm.classList.remove("show");

    // re-render cards
    document.querySelector(".card-stack").innerHTML = "";
    showCards();

    const notification = document.getElementById('saveNotification');
    notification.classList.add('show');
    notificationTimeout = setTimeout(() => {
        notification.classList.remove('show');
        notificationTimeout = null;
    }, 3000);
});

//background change btns 
dotBlack.addEventListener("click", function () {
    document.body.style.background = "linear-gradient(135deg, #0f0c29, #302b63, #24243e)";
})
dotPurple.addEventListener("click", function () {
    document.body.style.background = " linear-gradient(135deg, #134E5E, #71B280)";
})
dotBlue.addEventListener("click", function () {
    document.body.style.background = " linear-gradient(135deg, #c31432, #240b36)";
})
dotTeal.addEventListener("click", function () {
    document.body.style.background = "linear-gradient(135deg, #1D2B64, #2C3E50)";
})

//form cancel btns 
addCardBtn.addEventListener("click", function () {
    showForm.classList.add("show");
})
closeBtn.addEventListener("click", function () {
    showForm.classList.remove("show");
})
cancelBtn.addEventListener("click", function () {
    showForm.classList.remove("show");
})


function showCards() {
    let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    allTasks.forEach(function (task) {
        const mainCard = document.createElement("div");
        mainCard.classList.add("main-card");

        // profile pic 
        const profilePic = document.createElement("div");
        profilePic.classList.add("profile-pic");
        if (task.imgUrl) {
            profilePic.style.backgroundImage = `url(${task.imgUrl})`;
            profilePic.style.backgroundSize = "cover";
            profilePic.style.backgroundPosition = "center";
        }

        // profile name
        const profileName = document.createElement("div");
        profileName.classList.add("profile-name");
        profileName.textContent = task.name || "Unknown";

        // Profile info container
        const profileInfo = document.createElement("div");
        profileInfo.classList.add("profile-info");

        // Info item 1 - Home town
        const infoItem1 = document.createElement("div");
        infoItem1.classList.add("info-item");

        const infoLabel1 = document.createElement("div");
        infoLabel1.classList.add("info-label");
        infoLabel1.textContent = "Home town";

        const infoValue1 = document.createElement("div");
        infoValue1.classList.add("info-value");
        infoValue1.textContent = task.hometown || "N/A";

        infoItem1.appendChild(infoLabel1);
        infoItem1.appendChild(infoValue1);

        // Info item 2 - Purpose
        const infoItem2 = document.createElement("div");
        infoItem2.classList.add("info-item");

        const infoLabel2 = document.createElement("div");
        infoLabel2.classList.add("info-label");
        infoLabel2.textContent = "Purpose";

        const infoValue2 = document.createElement("div");
        infoValue2.classList.add("info-value");
        infoValue2.textContent = task.purpose || "N/A";

        infoItem2.appendChild(infoLabel2);
        infoItem2.appendChild(infoValue2);

        // Append info items to profile info
        profileInfo.appendChild(infoItem1);
        profileInfo.appendChild(infoItem2);

        // Action buttons container
        const actionButtons = document.createElement("div");
        actionButtons.classList.add("action-buttons");

        // Call button
        const callBtn = document.createElement("button");
        callBtn.classList.add("action-btn", "call-btn");
        callBtn.textContent = "📞 Call";

        // Message button
        const messageBtn = document.createElement("button");
        messageBtn.classList.add("action-btn", "message-btn");
        messageBtn.textContent = "Message";

        // Append buttons
        actionButtons.appendChild(callBtn);
        actionButtons.appendChild(messageBtn);

        // Put everything inside mainCard
        mainCard.appendChild(profilePic);
        mainCard.appendChild(profileName);
        mainCard.appendChild(profileInfo);
        mainCard.appendChild(actionButtons);

        // Finally append to container
        document.querySelector(".card-stack").appendChild(mainCard);
    });
}

function updateStack() {
    const cards = document.querySelectorAll(".card-stack .main-card");
    for (let i = 0; i < 3; i++) {
        cards.style.zIndex = 3 - i;
        cards.style.transform = `translateY(${i * 10}px) scale(${1 - i * 0.2})`;
        cards.style.opacity = `${1 - i * 0.02}`;
    }
}
upBtn.addEventListener("click", function () {
    let lastChild = cardStack.lastElementChild;
    if (lastChild) {
        cardStack.insertBefore(lastChild, cardStack.firstElementChild);
        //update
        updateStack();
    }
});

downBtn.addEventListener("click", function () {
    let firstChild = cardStack.firstElementChild;
    if (firstChild) {
        cardStack.appendChild(firstChild)
        //update
        updateStack();
    }
})
