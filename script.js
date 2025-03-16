const userData = JSON.parse(localStorage.getItem('userData'));

console.log("User Data:", userData);  // Debugging step

import { readCSV } from "./utils.js";

const emailForm = document.getElementById("emailForm");
const emailInput = document.getElementById("email");

emailForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (email) {
        try {
            const members = await readCSV("./members.csv");
            const member = members.find((m) => m.Email.toLowerCase() === email.toLowerCase());

            if (member) {
                // Store user data in localStorage
                localStorage.setItem('userData', JSON.stringify(member));
                // Redirect to the dashboard page
                window.location.href = 'dashboard.html';
            } else {
                alert("Email not found. Please try again.");
            }
        } catch (error) {
            console.error("Error reading CSV:", error);
        }
    }
});


if (userData) {
    const userNameDisplay = document.getElementById("userName");
    const generalPointsList = document.getElementById("generalPointsList");
    const committeePointsList = document.getElementById("committeePointsList");
    const generalChartCanvas = document.getElementById("generalChart");
    const committeeChartCanvas = document.getElementById("committeeChart");

    // Fix name display
    userNameDisplay.textContent = `${userData["First Name"]} ${userData["Last Name"]}`;

    // Handle missing values safely
    const generalPointsRaw = userData.GeneralPoints || "";
    const committeePointsRaw = userData.CommitteePoints || "";

    const generalPoints = generalPointsRaw
        ? generalPointsRaw.split(";").map(point => {
            const [event, value] = point.split(":");
            return { event, value: parseInt(value || "0", 10) };
        })
        : [];

    const committeePoints = committeePointsRaw
        ? committeePointsRaw.split(";").map(point => {
            const [event, value] = point.split(":");
            return { event, value: parseInt(value || "0", 10) };
        })
        : [];

    console.log("General Points Parsed:", generalPoints);
    console.log("Committee Points Parsed:", committeePoints);

    populateList(generalPointsList, generalPoints);
    populateList(committeePointsList, committeePoints);

    drawGraph(generalChartCanvas, "General Points", generalPoints);
    drawGraph(committeeChartCanvas, "Committee Points", committeePoints);
} else {
    alert("No user data found. Please log in.");
    window.location.href = 'index.html';
}
