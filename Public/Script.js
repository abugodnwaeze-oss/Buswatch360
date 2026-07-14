const form = document.getElementById("studentForm");

if (form) {

    form.addEventListener("submit", async function (e) {

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

        form.reset();
        loadStudents();
    });
}

async function loadStudents() {

    const response = await fetch("/students/all");

    const students = await response.json();

    const tableBody = document.getElementById("studentTableBody");

    if (!tableBody) return;

    tableBody.innerHTML = "";
    students.forEach(student => {
        tableBody.innerHTML += `
<tr>
    <td>${student.fullName}</td>
    <td>${student.studentClass}</td>
    <td>${student.bus}</td>
    <td>${student.status}</td>
    <td>
        <button onclick="editStudent(${student.id})">Edit</button>
        <button onclick="deleteStudent(${student.id})">Delete</button>
        async function editStudent(id) {

    alert("Edit student with ID: " + id);

}
    </td>
</tr>`;
    });
}

loadStudents();
async function deleteStudent(id) {

    const confirmDelete = confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) return;

    const response = await fetch(`/students/delete/${id}`, {
        method: "DELETE"
    });

    const result = await response.text();

    alert(result);

    loadStudents();

}