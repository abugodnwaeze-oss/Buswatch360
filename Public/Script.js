// ======================================
// STUDENT MANAGEMENT
// ======================================

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

        const result = await response.text();

        alert(result);

        studentForm.reset();

        loadStudents();

    });

}

async function loadStudents() {

    const tableBody = document.getElementById("studentTableBody");

    if (!tableBody) return;

    const response = await fetch("/students/all");

    const students = await response.json();

    tableBody.innerHTML = "";

    students.forEach(student => {

        tableBody.innerHTML += `
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

    if(!confirm("Delete this student?")) return;

    const response = await fetch(`/students/delete/${id}`,{
        method:"DELETE"
    });

    const result = await response.text();

    alert(result);

    loadStudents();

}

loadStudents();


// ======================================
// BUS MANAGEMENT
// ======================================

const busForm = document.getElementById("busForm");

if (busForm) {

    busForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const busName = document.getElementById("busName").value;
        const plateNumber = document.getElementById("plateNumber").value;
        const capacity = document.getElementById("capacity").value;
        const driver = document.getElementById("driver").value;

        const response = await fetch("/buses/add",{

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

        const result = await response.text();

        alert(result);

        busForm.reset();

        loadBuses();

    });

}

async function loadBuses(){

    const tableBody = document.getElementById("busTableBody");

    if(!tableBody) return;

    const response = await fetch("/buses/all");

    const buses = await response.json();

    tableBody.innerHTML = "";

    buses.forEach(bus=>{

        tableBody.innerHTML += `
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

    if(!confirm("Delete this bus?")) return;

    const response = await fetch(`/buses/delete/${id}`,{

        method:"DELETE"

    });

    const result = await response.text();

    alert(result);

    loadBuses();

}

loadBuses();