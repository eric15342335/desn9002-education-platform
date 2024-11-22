// booking.js

// Function to update the real-time cost estimate
function updateCost() {
    const participants = parseInt(document.getElementById('participantsSlider').value);
    const duration = parseInt(document.getElementById('durationSlider').value);
    const location = document.getElementById('location').value;

    // Update displayed slider values
    document.getElementById('participantsValue').textContent = participants;
    document.getElementById('durationValue').textContent = duration + " hours";

    // Pricing logic:
    // Base price is $100
    // Each participant adds $1
    // Each hour adds $50
    // Different locations have different multipliers

    let basePrice = 100;
    let participantCost = participants * 1; // $1 per participant
    let durationCost = duration * 50; // $50 per hour

    // Location-based multiplier
    let locationMultiplier = 1;
    const locationMultipliers = {
        "Hong Kong": 1.2,
        "Macau": 1.1,
        "China": 1.3,
        "Taiwan": 1.2,
        "Japan": 1.4,
        "Korea": 1.3,
        "UK": 1.3,
        "Europe": 1.4,
        "USA": 1.5,
        "Canada": 1.4,
        "South America": 1.3,
        "Africa": 1.2
    };

    if (locationMultipliers.hasOwnProperty(location)) {
        locationMultiplier = locationMultipliers[location];
    }

    let estimatedCost = (basePrice + participantCost + durationCost) * locationMultiplier;

    // If participants exceed 1000, add an additional fee
    if (participants > 1000) {
        estimatedCost += (participants - 1000) * 0.5; // $0.5 per additional participant
    }

    // Update the cost estimate in the DOM
    document.getElementById('costEstimate').textContent = `Estimated Cost: $${estimatedCost.toFixed(2)}`;
}

// Function to find consultants based on user input
function findConsultants() {
    // Gather user inputs
    const participants = parseInt(document.getElementById('participantsSlider').value);
    const duration = parseInt(document.getElementById('durationSlider').value);
    const location = document.getElementById('location').value;
    const eventType = document.getElementById('eventType').value.trim();
    const additionalInfo = document.getElementById('additionalInfo').value.trim();

    // Perform validation if necessary
    if (eventType === "") {
        alert("Please describe the type of event.");
        return;
    }

    // For demonstration, we'll just log the inputs
    console.log("Participants:", participants);
    console.log("Duration:", duration);
    console.log("Location:", location);
    console.log("Event Type:", eventType);
    console.log("Additional Info:", additionalInfo);

    // Here you would typically send this data to the server or process it further
    // For example:
    // fetch('/api/book-event', { method: 'POST', body: JSON.stringify({ ... }) })
    //     .then(response => response.json())
    //     .then(data => { /* Handle response */ })
    //     .catch(error => { /* Handle error */ });
}

// Function to save draft
function saveDraft() {
    // Gather user inputs
    const participants = document.getElementById('participantsSlider').value;
    const duration = document.getElementById('durationSlider').value;
    const location = document.getElementById('location').value;
    const eventType = document.getElementById('eventType').value;
    const additionalInfo = document.getElementById('additionalInfo').value;

    const draft = {
        participants,
        duration,
        location,
        eventType,
        additionalInfo,
        estimatedCost: document.getElementById('costEstimate').textContent
    };

    // Save draft to localStorage
    localStorage.setItem('bookingDraft', JSON.stringify(draft));
    alert("Draft saved successfully!");
}

// Initialize the cost estimate on page load
document.addEventListener("DOMContentLoaded", function() {
    updateCost();

    // Add event listeners to sliders and select
    document.getElementById('participantsSlider').addEventListener('input', updateCost);
    document.getElementById('durationSlider').addEventListener('input', updateCost);
    document.getElementById('location').addEventListener('change', updateCost);

    // Initialize booking form
    document.getElementById('confirmButton').addEventListener('click', findConsultants);
    document.getElementById('saveDraft').addEventListener('click', saveDraft);

    // Load draft if exists
    const savedDraft = localStorage.getItem('bookingDraft');
    if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        document.getElementById('participantsSlider').value = draft.participants;
        document.getElementById('durationSlider').value = draft.duration;
        document.getElementById('location').value = draft.location;
        document.getElementById('eventType').value = draft.eventType;
        document.getElementById('additionalInfo').value = draft.additionalInfo;
        updateCost();
    }
});