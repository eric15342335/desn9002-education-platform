// Random Data Generators

function getRandomName() {
    const names = ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona", "George", "Hannah", "Ian", "Julia",
        "Kevin", "Linda", "Michael", "Nancy", "Oscar", "Pamela", "Quincy", "Rachel", "Steve", "Tina",
        "Ursula", "Victor", "Wendy", "Xavier", "Yvonne", "Zack"
    ];
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
    const secondarySchoolsHK = [
    "Island School",
    "Hong Kong Academy",
    "King's College",
    "Lok Sin Tong Leung Kau Kui College",
    "Sacred Heart Canossian College",
    "St. Clare's Girls' School",
    "St. Joseph's College",
    "St. Louis School",
    "St. Paul's Co-educational College",
    "St. Paul's College",
    "St. Stephen's Church College",
    "St. Stephen's Girls' College",
    "Ying Wa Girls' School",
    "Raimondi College",
    "Belilios Public School",
    "Canossa College",
    "Caritas Chai Wan Marden Foundation Secondary School",
    "Cheung Chuk Shan College",
    "The Chinese Foundation Secondary School",
    "Chinese International School",
    "Chong Gene Hang College",
    "Clementi Secondary School",
    "CNEC Lau Wing Sang Secondary School",
    "Cognitio College (Hong Kong)",
    "Delia School",
    "Diocesan Boys' School",
    "Diocesan Girls' School",
    "Good Hope School",
    "Harrow International School",
    "Heep Yunn School",
    "Saint Mary Canossian College",
    "Maryknoll Convent School (Secondary Section)",
    "La Salle College",
    "Queen's College",
    "Hong Kong Taoist Association Tang Hin Memorial Secondary School",
    "St. Paul's Convent School (Secondary Section)",
    "SKH Tsang Shiu Tim Secondary School",
    "Christian Alliance International School",
    "Sear Rogers International School",
    "Concordia International School Hong Kong",
    "St. Margaret's Co-educational English Secondary and Primary School",
    "La Salle Primary School",
    "Pun U Association Wah Yan Primary School",
    "Caritas Lok Yi School",
    "Pui Ching Middle School",
    "Holy Trinity College",
    "SKH Lam Woo Memorial Secondary School",
    "Hong Kong Chinese Women's Club College",
    "Po Leung Kuk No. 1 W. H. Cheung College",
    "Po Leung Kuk Tang Yuk Tien College",
    "Tsuen Wan Government Secondary School"
    ];
    const weights = [0.5, 0.15, 0.15, 0.1, 0.05, 0.05];
    const random = Math.random();
    let cumulative = 0;
    for (let i = 0; i < locations.length; i++) {
        cumulative += weights[i];
        if (random < cumulative)
            return locations[i];
    }
    return locations[locations.length -1];
}

function getRandomAudience() {
    const options = [10, 20, 50, 100, 200];
    return options[Math.floor(Math.random() * options.length)];
}

function getRandomDuration() {
    return Math.floor(Math.random() * 6) + 1; // 1 to 6 hours
}

function getRandomPrice() {
    return (Math.floor(Math.random() * 100) + 50); // $50 - $149
}

// Store chart instances
const charts = {};

// Initialize Charts
function initializeCharts() {
    const stats = [
        { id: 'registeredUsersChart', label: 'Registered Users', statId: 'registeredUsers' },
        { id: 'registeredConsultantsChart', label: 'Registered Consultants', statId: 'registeredConsultants' },
        { id: 'studentConversationsChart', label: 'Student Conversations', statId: 'studentConversations' },
        { id: 'heldEventsChart', label: 'Successfully Held Events', statId: 'heldEvents' },
    ];

    stats.forEach(stat => {
        const ctx = document.getElementById(stat.id).getContext('2d');
        const data = generateRandomData(12);
        charts[stat.id] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: getLast12Months(),
                datasets: [{
                    label: stat.label,
                    data: data,
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false, // Prevents aspect ratio conflicts
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        // Update the stat-number with the latest data point
        const latestValue = data[data.length - 1];
        animateNumber(stat.statId, latestValue, 1000);
    });
}

function getLast12Months() {
    const months = [];
    const date = new Date();
    for (let i = 11; i >= 0; i--) {
        const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
        months.push(d.toLocaleString('default', { month: 'short' }));
    }
    return months;
}

function generateRandomData(numPoints) {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
        data.push(Math.floor(Math.random() * 1000));
    }
    return data;
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
    console.log("DOM fully loaded and parsed");

    // Populate Statistics
    populateStatistics();

    // Add Initial Notifications
    const notificationList = document.getElementById("notifications");
    if (!notificationList) {
        console.error("Notifications container not found!");
        return;
    }
    console.log("Adding initial notifications...");
    for (let i = 0; i < 3; i++) {
        const notification = createNotification();
        notificationList.appendChild(notification);
        console.log("Added notification:", notification);
    }

    // Add a New Notification After 1 Second
    setTimeout(() => {
        console.log("Adding a new notification after 1 second");
        addNotification();
    }, 1000);

    // Initialize Charts
    initializeCharts();
});