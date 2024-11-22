"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const firstNames = [
        "John", "Jane", "Alex", "Emily", "Michael", "Sophia", "David", "Laura",
        "Daniel", "Olivia", "Liam", "Emma", "Noah", "Ava", "Ethan", "Isabella",
        "Mason", "Mia", "Logan", "Charlotte", "James", "Amelia", "Benjamin",
        "Harper", "Oliver", "Evelyn", "Jacob", "Abigail", "Lucas", "Grace",
        "William", "Ella", "Henry", "Elizabeth", "Alexander", "Sofia", "Sebastian",
        "Avery", "Jack", "Scarlett", "Samuel", "Victoria", "Matthew", "Madison",
        "Joseph", "Lily", "Andrew", "Chloe", "Ryan", "Zoe", "Nathan", "Layla",
        "Caleb", "Lillian", "Joshua", "Addison", "Dylan", "Natalie"
    ];

    const lastNames = [
        "Doe", "Smith", "Chan", "Wong", "Lee", "Ng", "Brown", "Johnson", "Williams",
        "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin",
        "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez",
        "Lewis", "Walker", "Hall", "Allen", "Young", "King", "Wright", "Scott",
        "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson",
        "Baker", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez",
        "Phillips", "Evans", "Turner", "Diaz", "Parker", "Collins", "Edwards",
        "Stewart", "Sanchez", "Morris", "Rogers"
    ];

    const priorEducationExperiences = [
        "Former Tutorial Center Teacher",
        "EDB Teacher",
        "Private Tutor",
        "University Lecturer",
        "Online Education Specialist",
        "Curriculum Developer",
        "Educational Consultant",
        "High School Teacher",
        "Elementary School Instructor",
        "Special Education Teacher"
    ];

    const names = [];

    // Combine first and last names to create a larger names array
    firstNames.forEach(firstName => {
        lastNames.forEach(lastName => {
            names.push(`${firstName} ${lastName}`);
        });
    });

    // Shuffle the names array to randomize the order
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffle(names);

    const sectors = ["Finance", "IT", "Medicine", "Education", "Law", "Marketing", "Engineering", "Human Resources"];
    const industries = [
        "Investment Banking", "Software Development", "Clinical Research", "Higher Education",
        "Corporate Law", "Digital Marketing", "Civil Engineering", "Talent Acquisition"
    ];
    let educationExperience = "";
    let userType = "student";

    // Set User Type and update form labels
    function setUserType(type) {
        userType = type;
        const studentButton = document.getElementById('studentButton');
        const teacherButton = document.getElementById('teacherButton');
        const universityLabel = document.getElementById('universityLabel');
        const examLabel = document.getElementById('examLabel');
        const examSelect = document.getElementById('exam');
        const subjectSelect = document.getElementById('subject');

        if (type === 'student') {
            studentButton.classList.add('active');
            teacherButton.classList.remove('active');
            universityLabel.textContent = "Which university are you studying?";
            examLabel.textContent = "What exam will you take?";
            examSelect.options[0].textContent = "Select exam";
            subjectSelect.options[0].textContent = "Select subject";
        } else {
            teacherButton.classList.add('active');
            studentButton.classList.remove('active');
            universityLabel.textContent = "Which university should your students know about?";
            examLabel.textContent = "What exam will your student take?";
            examSelect.options[0].textContent = "Select exam";
            subjectSelect.options[0].textContent = "Select subject";
        }
    }

    // Set Education Experience
    function setEducationExperience(value) {
        educationExperience = value;
        const yesButton = document.getElementById('yesEducationButton');
        const noButton = document.getElementById('noEducationButton');

        if (value === "Yes") {
            yesButton.classList.add('active');
            noButton.classList.remove('active');
        } else if (value === "No") {
            noButton.classList.add('active');
            yesButton.classList.remove('active');
        }
    }

    // Find Consultants with Smooth Loading
    function findConsultants() {
        const industry = document.getElementById("industry") ? document.getElementById("industry").value : "";
        const gender = document.getElementById("gender") ? document.getElementById("gender").value : "";
        const experience = parseInt(document.getElementById("experience") ? document.getElementById("experience").value : "0") || 0;
        const university = document.getElementById("university") ? document.getElementById("university").value : "";
        const subject = document.getElementById("subject") ? document.getElementById("subject").value : "";
        const country = document.getElementById("country") ? document.getElementById("country").value : "";

        const consultantsList = document.getElementById("consultants");
        const loader = document.getElementById("loader");

        consultantsList.innerHTML = ""; // Clear previous results
        loader.style.display = "flex"; // Show loader

        // Simulate smooth loading with incremental progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.floor(Math.random() * 10) + 3; // Increment by 3-12
            if (progress > 100) progress = 100;
            if (progress === 100) {
                clearInterval(progressInterval); // Stop the progress simulation
                loader.style.display = "none"; // Hide loader
                generateConsultants(industry, gender, experience, university, subject, country);
            }
        }, 100); // Update every 100ms for smoother progress
    }

    // Generate Consultant Cards
    function generateConsultants(industry, gender, experience, university, subject, country) {
        const consultantsList = document.getElementById("consultants");

        // Generate random consultants
        for (let i = 0; i < 6; i++) {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomGender = gender === "" ? (Math.random() > 0.5 ? "Male" : "Female") : gender;
            const randomExperience = Math.random() > 0.5 ? "Student" : `${Math.floor(Math.random() * 4) + 1} years`; // 1-4 years or Student
            const randomPrice = userType === "teacher" ? `$${Math.floor(Math.random() * 3501) + 500}` : `$${Math.floor(Math.random() * 501)}`; // Teachers: $500-$4000, Students: $0-$500

            // Create card container
            const card = document.createElement("div");
            card.className = "consultant-card";

            // Add badge if prior education experience exists
            if (educationExperience === "Yes") {
                // Add details on prior education experience
                const priorExperience = priorEducationExperiences[Math.floor(Math.random() * priorEducationExperiences.length)];
                const badge = document.createElement("div");
                badge.className = "badge";
                badge.textContent = "✨ Prior education experience ✨" + priorExperience;
                card.appendChild(badge);
            }

            // Info container
            const infoContainer = document.createElement("div");
            infoContainer.className = "info-container";

            // Add gender image
            const genderImage = document.createElement("img");
            genderImage.className = "gender-image";
            genderImage.src =
                randomGender === "Male"
                    ? "images/gender/male.png"
                    : "images/gender/female.png"; // Replace with actual image paths if available
            genderImage.alt = randomGender;
            infoContainer.appendChild(genderImage);

            // Consultant information
            const info = document.createElement("div");
            info.className = "info";

            const name = document.createElement("h3");
            name.className = "name";
            name.textContent = randomName;
            info.appendChild(name);

            const details = [
                `Experience: ${randomExperience}`,
                `University: ${university || "N/A"}`,
                `Exam: ${document.getElementById("exam").value || "N/A"}`,
                `Subject: ${subject || "N/A"}`,
                `Country: ${country || "N/A"}`
            ];

            details.forEach(detail => {
                const p = document.createElement("p");
                p.className = "details";
                p.textContent = detail;
                info.appendChild(p);
            });

            infoContainer.appendChild(info);
            card.appendChild(infoContainer);

            if (userType === "teacher") {
                const likesDiv = document.createElement("div");
                likesDiv.className = "likes";
                const thumbsUpImg = document.createElement("img");
                thumbsUpImg.src = 'images/profile/thumbsup.png';
                thumbsUpImg.alt = 'Thumbs Up';
                likesDiv.appendChild(thumbsUpImg);
                const likesText = document.createElement("span");
                likesText.textContent = `Likes from students: ${Math.floor(Math.random() * 201)}`;
                likesDiv.appendChild(likesText);
                card.appendChild(likesDiv);
            }
            // Pricing buttons
            const pricing = document.createElement("div");
            pricing.className = "pricing";

            const priceButton = document.createElement("button");
            priceButton.className = "price";
            priceButton.textContent = `Base Price: ${randomPrice}`;
            pricing.appendChild(priceButton);

            const actionButton = document.createElement("button");
            actionButton.className = "action";
            actionButton.textContent = userType === "teacher" ? "Contact Now" : "Chat";
            pricing.appendChild(actionButton);

            card.appendChild(pricing);
            consultantsList.appendChild(card);
        }
    }

    // Initialize default user type and education experience
    setUserType('student');
    setEducationExperience('Yes');

    // Expose functions to global scope for use in HTML
    window.setUserType = setUserType;
    window.setEducationExperience = setEducationExperience;
    window.findConsultants = findConsultants;
});