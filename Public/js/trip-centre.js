// =====================================
// TRIP CENTRE
// =====================================

async function loadTripBusDropdown() {

    const tripBus = document.getElementById("tripBus");

    if (!tripBus) return;

    const response = await fetch("/buses/all");

    const buses = await response.json();

    tripBus.innerHTML = `
        <option value="">
            Select Bus
        </option>
    `;

    buses.forEach(bus => {

        tripBus.innerHTML += `
            <option value="${bus.busName}">
                ${bus.busName}
            </option>
        `;

    });

}

loadTripBusDropdown();
const tripBus = document.getElementById("tripBus");

if (tripBus) {

    tripBus.addEventListener("change", loadTripStudents);

}

async function loadTripStudents() {

    const bus = document.getElementById("tripBus").value;

    const table = document.getElementById("tripStudentTable");

    if (!bus) {

        table.innerHTML = "";

        return;

    }

    const response = await fetch(`/students/bus/${bus}`);

    const students = await response.json();
document.getElementById("assignedCount").innerText = students.length;

const boarded = students.filter(
    student => student.status === "Boarded"
).length;

document.getElementById("boardedCount").innerText = boarded;

document.getElementById("waitingCount").innerText =
    students.length - boarded;
    const missingList =
document.getElementById("missingStudents");

const missingList =
document.getElementById("missingStudents");

missingList.innerHTML = "";

let missingCount = 0;

students.forEach(student => {

    if(student.status !== "Boarded"){

        missingCount++;

        missingList.innerHTML += `
            <li>${student.fullName}</li>
        `;

    }

});

if(missingCount === 0){

    missingList.innerHTML = `
        <li>No students missing 🎉</li>
    `;

}
    const departureStatus =
    document.getElementById("departureStatus");

if (students.length > 0 && boarded === students.length) {

    departureStatus.classList.remove("not-ready");

    departureStatus.classList.add("ready");

    departureStatus.innerHTML =
        "🟢 READY TO DEPART";

} else {

    departureStatus.classList.remove("ready");

    departureStatus.classList.add("not-ready");

    departureStatus.innerHTML =
        "🔴 NOT READY TO DEPART";

}
    table.innerHTML = "";

    students.forEach(student => {

        table.innerHTML += `

        <tr>

            <td>${student.fullName}</td>

            <td>${student.studentClass}</td>

            <td>${student.status}</td>

            <td>

                <button onclick="boardStudent(${student.id})">

    Board

</button>
            </td>

        </tr>

        `;

    });

}
async function boardStudent(id){

    await fetch(`/students/board/${id}`,{

        method:"PUT"

    });

    loadTripStudents();

}