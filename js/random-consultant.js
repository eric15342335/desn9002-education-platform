"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const names = ["John Doe", "Jane Smith", "Alex Chan", "Emily Wong", "Michael Lee", "Sophia Ng"];
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
            universityLabel.textContent = "Which university are you teaching at?";
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
        const sector = document.getElementById("sector") ? document.getElementById("sector").value : "";
        const industry = document.getElementById("industry") ? document.getElementById("industry").value : "";
        const gender = document.getElementById("gender") ? document.getElementById("gender").value : "";
        const experience = parseInt(document.getElementById("experience") ? document.getElementById("experience").value : "0") || 0;
        const university = document.getElementById("university") ? document.getElementById("university").value : "";
        const subject = document.getElementById("subject") ? document.getElementById("subject").value : "";
        const country = document.getElementById("country") ? document.getElementById("country").value : "";

        const consultantsList = document.getElementById("consultants");
        const loader = document.getElementById("loader");

        consultantsList.innerHTML = ""; // Clear previous results
        loader.style.display = "flex";

        // Simulate smooth loading with incremental progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.floor(Math.random() * 10) + 3; // Increment by 3-12
            if (progress > 100) progress = 100;
            if (progress === 100) {
                clearInterval(progressInterval);
                loader.style.display = "none";
                generateConsultants(sector, industry, gender, experience, university, subject, country);
            }
        }, 100); // Update every 100ms for smoother progress
    }

    function generateConsultants(sector, industry, gender, experience, university, subject, country) {
        const consultantsList = document.getElementById("consultants");
        // Generate random consultants
        for (let i = 0; i < 6; i++) {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomGender = gender === "" ? (Math.random() > 0.5 ? "Male" : "Female") : gender;
            const randomExperience = Math.random() > 0.5 ? "Student" : `${Math.floor(Math.random() * 4) + 1} years`; // 1-4 years or Student
            const randomPrice = userType === "teacher" ? Math.floor(Math.random() * 1901) + 100 : Math.floor(Math.random() * 9501) + 50; // Teachers: $100-$2000, Students: $50-$9550

            // Match user criteria
            if (
                (randomExperience === "Student" || parseInt(randomExperience) >= experience) &&
                (university === "" || university === university) &&
                (subject === "" || subject === subject) &&
                (country === "" || country === country) &&
                (educationExperience === "" || educationExperience === "Yes" || educationExperience === "No")
            ) {
                const consultantCard = document.createElement("div");
                consultantCard.className = "consultant-card";
                
                // Badge for prior education experience
                if (educationExperience === "Yes") {
                    const badge = document.createElement("div");
                    badge.className = "badge";
                    badge.textContent = "✨Prior education experience✨";
                    consultantCard.appendChild(badge);
                }

                const img = document.createElement("img");
                img.src = randomGender === "Male" ? 'images/gender/male.png' : 'images/gender/female.png';
                img.alt = randomGender;
                consultantCard.appendChild(img);

                const contentDiv = document.createElement("div");
                contentDiv.className = "consultant-content";

                const name = document.createElement("h3");
                name.textContent = randomName;
                contentDiv.appendChild(name);

                // Create hidden table for details
                const detailsTable = document.createElement("table");
                detailsTable.className = "details-table";

                // Experience Row
                const expRow = document.createElement("tr");
                const expLabel = document.createElement("td");
                expLabel.textContent = "Experience:";
                const expValue = document.createElement("td");
                expValue.textContent = randomExperience;
                expRow.appendChild(expLabel);
                expRow.appendChild(expValue);
                detailsTable.appendChild(expRow);

                // University Row
                const uniRow = document.createElement("tr");
                const uniLabel = document.createElement("td");
                uniLabel.textContent = "University:";
                const uniValue = document.createElement("td");
                uniValue.textContent = university || "N/A";
                uniRow.appendChild(uniLabel);
                uniRow.appendChild(uniValue);
                detailsTable.appendChild(uniRow);

                // Exam Row
                const examRow = document.createElement("tr");
                const examLabel = document.createElement("td");
                examLabel.textContent = "Exam:";
                const examValue = document.createElement("td");
                examValue.textContent = document.getElementById("exam").value || "N/A";
                examRow.appendChild(examLabel);
                examRow.appendChild(examValue);
                detailsTable.appendChild(examRow);

                // Subject Row
                const subjectRow = document.createElement("tr");
                const subjectLabel = document.createElement("td");
                subjectLabel.textContent = "Subject:";
                const subjectValue = document.createElement("td");
                subjectValue.textContent = subject || "N/A";
                subjectRow.appendChild(subjectLabel);
                subjectRow.appendChild(subjectValue);
                detailsTable.appendChild(subjectRow);

                // Country Row
                const countryRow = document.createElement("tr");
                const countryLabel = document.createElement("td");
                countryLabel.textContent = "Country:";
                const countryValue = document.createElement("td");
                countryValue.textContent = country || "N/A";
                countryRow.appendChild(countryLabel);
                countryRow.appendChild(countryValue);
                detailsTable.appendChild(countryRow);

                contentDiv.appendChild(detailsTable);

                // Optionally, you can add visible details here if needed
                // For example:
                const visibleDetails = document.createElement("div");
                visibleDetails.className = "visible-details";

                const experienceP = document.createElement("p");
                experienceP.textContent = `Experience: ${randomExperience}`;
                visibleDetails.appendChild(experienceP);

                const universityP = document.createElement("p");
                universityP.textContent = `University: ${university || "N/A"}`;
                visibleDetails.appendChild(universityP);

                const examP = document.createElement("p");
                examP.textContent = `Exam: ${document.getElementById("exam").value || "N/A"}`;
                visibleDetails.appendChild(examP);

                const subjectP = document.createElement("p");
                subjectP.textContent = `Subject: ${subject || "N/A"}`;
                visibleDetails.appendChild(subjectP);

                const countryP = document.createElement("p");
                countryP.textContent = `Country: ${country || "N/A"}`;
                visibleDetails.appendChild(countryP);

                contentDiv.appendChild(visibleDetails);

                // Append the content div to the card
                consultantCard.appendChild(contentDiv);

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
                    contentDiv.appendChild(likesDiv);
                }

                const pricingDiv = document.createElement("div");
                pricingDiv.className = "pricing";
                const startingPriceBtn = document.createElement("button");
                startingPriceBtn.textContent = `Base Price: $${randomPrice}`;
                pricingDiv.appendChild(startingPriceBtn);
                const actionBtn = document.createElement("button");
                actionBtn.textContent = userType === "student" ? "Chat" : "Contact Now";
                pricingDiv.appendChild(actionBtn);
                contentDiv.appendChild(pricingDiv);

                consultantsList.appendChild(consultantCard);
            }
        }
    }

    // Initialize default user type and education experience
    setUserType('student');
    setEducationExperience('Yes');

    window.setUserType = setUserType;
    window.setEducationExperience = setEducationExperience;
    window.findConsultants = findConsultants;
});