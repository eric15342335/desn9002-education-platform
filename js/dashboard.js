// Random Data Generators
function getRandomName() {
    const names = ["John Doe", "Jane Smith", "Alex Chan", "Emily Wong", "Michael Lee", "Sophia Ng"];
    return names[Math.floor(Math.random() * names.length)];
}

function getRandomConsultant() {
    const consultants = ["Consultant A", "Consultant B", "Consultant C", "Consultant D"];
    return consultants[Math.floor(Math.random() * consultants.length)];
}

function getRandomEvent() {
    const events = ["Webinar", "Group Consultation", "Workshop", "Talk", "One-on-One Session"];
    return events[Math.floor(Math.random() * events.length)];
}

function getRandomLocation() {
    const locations = [
        "Hong Kong", "Macau", "Taiwan", "China", 
        "UK", "US"
    ];
    const weights = [0.5, 0.15, 0.15, 0.1, 0.05, 0.05];
    const random = Math.random();
    let cumulative = 0;
    for (let i = 0; i < locations.length; i++) {
        cumulative += weights[i];
        if (random < cumulative) return locations[i];
    }
    return locations[0];
}

function getRandomAudience() {
    return `${Math.floor(Math.random() * 50) + 10}-${Math.floor(Math.random() * 150) + 50}`;
}

function getRandomDuration() {
    return Math.floor(Math.random() * 6) + 1;
}

function getRandomPrice() {
    return Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
}

// Animate Number Increment
function animateNumber(elementId, targetNumber, duration) {
    const element = document.getElementById(elementId);
    let currentNumber = 0;
    const increment = Math.ceil(targetNumber / (duration / 50));

    const interval = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(interval);
        }
        element.textContent = currentNumber;
    }, 50);
}

// Populate Statistics
function populateStatistics() {
    animateNumber("registeredUsers", Math.floor(Math.random() * 10000) + 5000, 1000);
    animateNumber("registeredConsultants", Math.floor(Math.random() * 3000) + 1000, 1000);
    animateNumber("studentConversations", Math.floor(Math.random() * 20000) + 10000, 1000);
    animateNumber("heldEvents", Math.floor(Math.random() * 5000) + 1000, 1000);
}

// Create a New Notification
function createNotification() {
    const user = getRandomName();
    const consultant = getRandomConsultant();
    const event = getRandomEvent();
    const duration = getRandomDuration();
    const price = getRandomPrice();
    const location = getRandomLocation();
    const audience = getRandomAudience();

    const notification = document.createElement("div");
    notification.classList.add("notification");

    // Notification text
    const text = document.createElement("div");
    text.classList.add("notification-text");
    text.innerHTML = `
        <strong>${user}</strong> wants 
        <strong>${consultant}</strong> to host a 
        <strong>${event}</strong> in 
        <strong>${location}</strong> for 
        <strong>${audience}</strong> audience(s), 
        lasting <strong>${duration} hour(s)</strong>, at $${price}.
    `;

    // Accept button
    const button = document.createElement("button");
    button.classList.add("notification-button");
    button.innerText = "Accept";

    notification.appendChild(text);
    notification.appendChild(button);

    return notification;
}

// Add Notifications Dynamically
function addNotification() {
    const notificationList = document.getElementById("notifications");
    const newNotification = createNotification();
    notificationList.prepend(newNotification); // Add at the top
}

// Initialize Dashboard
document.addEventListener("DOMContentLoaded", () => {
    // Populate Statistics
    populateStatistics();

    // Add Initial Notifications
    const notificationList = document.getElementById("notifications");
    for (let i = 0; i < 3; i++) {
        notificationList.appendChild(createNotification());
    }

    // Add a New Notification After 1 Second
    setTimeout(() => {
        addNotification();
    }, 1000);
});
