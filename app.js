import { readCSV } from "./utils.js";

const emailForm = document.getElementById("emailForm");
const emailInput = document.getElementById("email");
const dashboardSection = document.getElementById("dashboard");
const loginSection = document.getElementById("login");

const userNameDisplay = document.getElementById("userName");
const userEmailDisplay = document.getElementById("userEmail");
const userPrefectDisplay = document.getElementById("userPrefect");
const userCommitteeDisplay = document.getElementById("userCommittee");

const totalGeneralPointsDisplay = document.getElementById("totalGeneralPoints");
const totalCommitteePointsDisplay = document.getElementById("totalCommitteePoints");

const generalPointsList = document.getElementById("generalPointsList");
const committeePointsList = document.getElementById("committeePointsList");

const generalChartCanvas = document.getElementById("generalChart");
const committeeChartCanvas = document.getElementById("committeeChart");

emailForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim().toLowerCase();

    console.log("Searching for:", email);  // Debugging log

    if (email) {
        try {
            const members = await readCSV("./members.csv");

            console.log("CSV Loaded:", members);  // Debugging log

            const member = members.find((m) => m.Email.trim().toLowerCase() === email);

            if (member) {
                console.log("Member found:", member);
                displayDashboard(member);
            } else {
                alert("Email not found. Please try again.");
            }
        } catch (error) {
            console.error("Error reading CSV:", error);
        }
    }
});

function displayDashboard(member) {
    console.log("Displaying dashboard for:", member["First Name"], member["Last Name"]);

    loginSection.style.display = "none";  // Hide login
    dashboardSection.style.display = "block";  // Show dashboard

    userNameDisplay.textContent = `Name: ${member["First Name"]} ${member["Last Name"]}`;
    userEmailDisplay.textContent = `Email: ${member.Email}`;
    userPrefectDisplay.textContent = `Prefect: ${member.Prefect}`;
    userCommitteeDisplay.textContent = `Committee: ${member.Committee}`;

    totalGeneralPointsDisplay.textContent = `Total General Points: ${member["Total General Points"]}`;
    totalCommitteePointsDisplay.textContent = `Total Committee Points: ${calculateTotalCommitteePoints(member)}`;

    const generalPoints = parsePoints(member);
    const committeePoints = parsePoints(member, true);

    populateList(generalPointsList, generalPoints);
    populateList(committeePointsList, committeePoints);

    drawGraph(generalChartCanvas, "General Points", generalPoints);
    drawGraph(committeeChartCanvas, "Committee Points", committeePoints);


}
