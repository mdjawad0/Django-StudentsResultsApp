async function getStudentById(id) {
    try {
        const response = await fetch(`/api/student/${id}/`);
        if (!response.ok) {
            if (response.status === 404) {
                return { error: true, id }; // Student not found
            }
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching student data:', error);
        throw error;
    }
}

function displayLoading() {
    document.getElementById("results").innerHTML = '<p class="text-center">Loading...</p>';
}

function displayStudentInfo(student) {
    if (student && !student.error) {
        document.getElementById("results").innerHTML = `<div class="table-bordered mt-4">
            <table class="table">
                <tr>
                    <th class="table-info">Student ID:</th>
                    <td class="text-primary">${student.id}</td>
                </tr>
                <tr>
                    <th class="table-info">Name:</th>
                    <td>${student.name}</td>
                </tr>
                <tr>
                    <th class="table-info">Language 1:</th>
                    <td>${student.language1}</td>
                </tr>
                <tr>
                    <th class="table-info">Language 2:</th>
                    <td>${student.language2}</td>
                </tr>
                <tr>
                    <th class="table-info">Acting:</th>
                    <td>${student.acting}</td>
                </tr>
                <tr>
                    <th class="table-info">Dance:</th>
                    <td>${student.dance}</td>
                </tr>
            </table>
        </div>
        <div class="container-fluid text-center mt-4 mb-4">
            <h5 class="text-danger mb-2">Total marks: <span>${student.language1 + student.language2 + student.acting + student.dance} of 400</span></h5>
            <h5 class="text-success">Percentage: <span>${((student.language1 + student.language2 + student.acting + student.dance) / 4).toFixed(2)}%</span></h5>
            <a href="#" onclick="location.reload()">Next result</a>
        </div>`;
    } else {
        document.getElementById("results").innerHTML = `<p class="text-center text-danger mt-5">No student found with ID ${student ? student.id : ''}</p>
        <div class="container-fluid text-center mt-4 mb-4">
            <a href="#" onclick="location.reload()">Next result</a>
        </div>`;
    }
}

function showResults(event) {
    event.preventDefault();
    document.getElementById("note").classList.add("d-none");
    const regno = document.getElementById('regno').value;
    const userinput = Number(regno);

    displayLoading();

    setTimeout(() => {
        getStudentById(userinput)
            .then(student => displayStudentInfo(student))
            .catch(error => console.error('Error displaying student info:', error));
    }, 2000); // Delay to show loading message for 2 seconds
}
