// random-consultant.js
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
            progress += Math.floor(Math.random() * 10) + 3; // Increment by 5-14
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
            const randomExperience = Math.floor(Math.random() * 10) + 1; // 1-10 years
            const randomSector = sectors[Math.floor(Math.random() * sectors.length)];
            const randomIndustry = industries[Math.floor(Math.random() * industries.length)];
            const randomPrice = userType === "teacher" ? Math.floor(Math.random() * 1901) + 100 : Math.floor(Math.random() * 9501) + 50; // Teachers: $100-$2000, Students: $50-$9550
            const likes = userType === "teacher" ? Math.floor(Math.random() * 201) : 0; // 0-200 likes for teachers

            // Match user criteria
            if (
                (sector === randomSector || sector === "") &&
                (industry === randomIndustry || industry === "") &&
                (randomExperience >= experience) &&
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
                    badge.textContent = "Prior education experience";
                    consultantCard.appendChild(badge);
                }

                const img = document.createElement("img");
                img.src = randomGender === "Male" ? 'images/gender/male.png' : 'images/gender/female.png';
                img.alt = randomGender;
                consultantCard.appendChild(img);

                const name = document.createElement("h3");
                name.textContent = randomName;
                consultantCard.appendChild(name);

                const sectorP = document.createElement("p");
                sectorP.textContent = `Sector: ${randomSector}`;
                consultantCard.appendChild(sectorP);

                const industryP = document.createElement("p");
                industryP.textContent = `Industry: ${randomIndustry}`;
                consultantCard.appendChild(industryP);

                const experienceP = document.createElement("p");
                experienceP.textContent = `Experience: ${randomExperience} years`;
                consultantCard.appendChild(experienceP);

                // Display user-selected information
                const universityP = document.createElement("p");
                universityP.textContent = `University: ${university || "N/A"}`;
                consultantCard.appendChild(universityP);

                const examP = document.createElement("p");
                examP.textContent = `Exam: ${document.getElementById("exam").value || "N/A"}`;
                consultantCard.appendChild(examP);

                const subjectP = document.createElement("p");
                subjectP.textContent = `Subject: ${subject || "N/A"}`;
                consultantCard.appendChild(subjectP);

                const countryP = document.createElement("p");
                countryP.textContent = `Country: ${country || "N/A"}`;
                consultantCard.appendChild(countryP);

                if (userType === "teacher") {
                    const likesDiv = document.createElement("div");
                    likesDiv.className = "likes";
                    const thumbsUpImg = document.createElement("img");
                    thumbsUpImg.src = 'images/profile/thumbsup.png';
                    thumbsUpImg.alt = 'Thumbs Up';
                    likesDiv.appendChild(thumbsUpImg);
                    const likesText = document.createElement("span");
                    likesText.textContent = `Likes from students: ${likes}`;
                    likesDiv.appendChild(likesText);
                    consultantCard.appendChild(likesDiv);
                }

                const pricingDiv = document.createElement("div");
                pricingDiv.className = "pricing";

                const startingPriceBtn = document.createElement("button");
                startingPriceBtn.textContent = `Base Price: $${randomPrice}`;
                pricingDiv.appendChild(startingPriceBtn);

                const actionBtn = document.createElement("button");
                actionBtn.textContent = userType === "student" ? "Chat" : "Contact Now";
                pricingDiv.appendChild(actionBtn);

                consultantCard.appendChild(pricingDiv);

                consultantsList.appendChild(consultantCard);
            }
        }

        // If no consultants match, display a message
        if (consultantsList.innerHTML === "") {
            consultantsList.innerHTML = "<p>No consultants found matching your criteria.</p>";
        }
    }

    // Initialize default user type and education experience
    setUserType('student');
    setEducationExperience('Yes');

    window.setUserType = setUserType;
    window.setEducationExperience = setEducationExperience;
    window.findConsultants = findConsultants;
});