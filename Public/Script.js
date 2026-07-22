// =====================================
// LOAD BUS DROPDOWN
// =====================================

async function loadBusDropdown() {

    const busSelect = document.getElementById("bus");

    if (!busSelect) return;

    const response = await fetch("/buses/all");

    const buses = await response.json();

    busSelect.innerHTML = `
        <option value="">Select Bus</option>
    `;

    buses.forEach(bus => {

        busSelect.innerHTML += `
            <option value="${bus.busName}">
                ${bus.busName}
            </option>
        `;

    });

}

loadBusDropdown();

// =====================================
// STUDENT MANAGEMENT
// =====================================

const studentForm = document.getElementById("studentForm");

if (studentForm) {

    studentForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const studentClass = document.getElementById("studentClass").value;
        const bus = document.getElementById("bus").value;

        const response = await fetch("/students/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName,
                studentClass,
                bus
            })
        });

        alert(await response.text());

        studentForm.reset();

        loadStudents();
        loadBusDropdown();

    });

}

async function loadStudents() {

    const table = document.getElementById("studentTableBody");

    if (!table) return;

    const response = await fetch("/students/all");

    const students = await response.json();

    table.innerHTML = "";

    students.forEach(student => {

        table.innerHTML += `
        <tr>
            <td>${student.fullName}</td>
            <td>${student.studentClass}</td>
            <td>${student.bus}</td>
            <td>${student.status}</td>
            <td>
                <button onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

}

async function deleteStudent(id){

    if(!confirm("Delete student?")) return;

    await fetch(`/students/delete/${id}`,{
        method:"DELETE"
    });

    loadStudents();

}

loadStudents();

// =====================================
// BUS MANAGEMENT
// =====================================

const busForm = document.getElementById("busForm");

if(busForm){

    busForm.addEventListener("submit",async(e)=>{

        e.preventDefault();

        const busName=document.getElementById("busName").value;
        const plateNumber=document.getElementById("plateNumber").value;
        const capacity=document.getElementById("capacity").value;
        const driver=document.getElementById("driver").value;

        const response=await fetch("/buses/add",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                busName,
                plateNumber,
                capacity,
                driver
            })

        });

        alert(await response.text());

        busForm.reset();

        loadBuses();
        loadBusDropdown();

    });// =====================================
// LOAD DRIVER DROPDOWN
// =====================================

async function loadDriverDropdown() {

    const driverSelect = document.getElementById("driver");

    if (!driverSelect) return;

    const response = await fetch("/drivers/all");

    const drivers = await response.json();

    driverSelect.innerHTML = `
        <option value="">
            Select Driver
        </option>
    `;

    drivers.forEach(driver => {

        driverSelect.innerHTML += `
            <option value="${driver.driverName}">
                ${driver.driverName}
            </option>
        `;

    });

}

loadDriverDropdown();

}

async function loadBuses(){

    const table=document.getElementById("busTableBody");

    if(!table) return;

    const response=await fetch("/buses/all");

    const buses=await response.json();

    table.innerHTML="";

    buses.forEach(bus=>{

        table.innerHTML+=`
        <tr>

            <td>${bus.busName}</td>
            <td>${bus.plateNumber}</td>
            <td>${bus.capacity}</td>
            <td>${bus.driver}</td>
            <td>${bus.status}</td>

            <td>
                <button onclick="deleteBus(${bus.id})">
                    Delete
                </button>
            </td>

        </tr>
        `;

    });

}

async function deleteBus(id){

    if(!confirm("Delete bus?")) return;

    await fetch(`/buses/delete/${id}`,{
        method:"DELETE"
    });

    loadBuses();
    loadBusDropdown();

}

loadBuses();

// =====================================
// DRIVER MANAGEMENT
// =====================================

const driverForm = document.getElementById("driverForm");

if(driverForm){

    driverForm.addEventListener("submit",async(e)=>{

        e.preventDefault();

        const driverName=document.getElementById("driverName").value;
        const phone=document.getElementById("phone").value;
        const licenseNumber=document.getElementById("licenseNumber").value;
        const assignedBus=document.getElementById("assignedBus").value;

        const response=await fetch("/drivers/add",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                driverName,
                phone,
                licenseNumber,
                assignedBus
            })

        });

        alert(await response.text());

        driverForm.reset();

        loadDrivers();

    });

}

async function loadDrivers(){

    const table=document.getElementById("driverTableBody");

    if(!table) return;

    const response=await fetch("/drivers/all");

    const drivers=await response.json();

    table.innerHTML="";

    drivers.forEach(driver=>{

        table.innerHTML+=`
        <tr>

            <td>${driver.driverName}</td>
            <td>${driver.phone}</td>
            <td>${driver.licenseNumber}</td>
            <td>${driver.assignedBus}</td>
            <td>${driver.status}</td>

            <td>
                <button onclick="deleteDriver(${driver.id})">
                    Delete
                </button>
            </td>

        </tr>
        `;

    });

}

async function deleteDriver(id){

    if(!confirm("Delete driver?")) return;

    await fetch(`/drivers/delete/${id}`,{
        method:"DELETE"
    });

    loadDrivers();

}

loadDrivers();
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

missingList.innerHTML = "";

students.forEach(student=>{

    if(student.status !== "Boarded"){

        missingList.innerHTML += `
            <li>${student.fullName}</li>
        `;

    }

});
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