// Função para carregar as não conformidades do localStorage
function loadNonConformities() {
    return JSON.parse(localStorage.getItem("nonConformities")) || [];
}


function saveNonConformities(nonConformities) {
    localStorage.setItem("nonConformities", JSON.stringify(nonConformities));
}


function loadDepartments() {
    return JSON.parse(localStorage.getItem("departments")) || [];
}


function registerNonConformity(event) {
    event.preventDefault(); 


    const title = document.getElementById("title-non-compliance").value.trim();
    const description = document.getElementById("description-non-compliance").value.trim();
    const origin = document.getElementById("origin-non-compliance").value.trim();
    const department = document.getElementById("department-non-compliance").value;
    const severity = document.querySelector("input[name='severidade']:checked");


    if (!title || !description || !origin || !department || !severity) {
        alert("Por favor, preencha todos os campos!");
        return;
    }


    const departments = loadDepartments();


    const departmentExists = departments.some(dept => dept.name === department);

    if (!departmentExists) {
        alert("Departamento não encontrado. Por favor, registre o departamento antes de criar a não conformidade.");
        return;
    }


    const nonConformities = loadNonConformities();

    // Cria o novo objeto de não conformidade
    const newNonConformity = {
        title,
        description,
        origin,
        department,
        severity: severity.value,
        date: new Date().toLocaleDateString(),
        status: "Pendente"
    };


    nonConformities.push(newNonConformity);
    saveNonConformities(nonConformities);


    displayNonConformities();

    document.querySelector("form").reset();

    alert("Não conformidade registrada com sucesso!");
}


function displayNonConformities() {
    const nonConformities = loadNonConformities();
    const tbody = document.querySelector("table tbody");


    tbody.innerHTML = "";


    nonConformities.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td>${item.date}</td>
            <td>${item.status}</td>
        `;
        tbody.appendChild(row);
    });
}


function populateDepartments() {
    const departments = loadDepartments();
    const departmentSelect = document.getElementById("department-non-compliance");


    departmentSelect.innerHTML = "";


    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecione um departamento";
    departmentSelect.appendChild(defaultOption);


    departments.forEach(dept => {
        const option = document.createElement("option");
        option.value = dept.name;
        option.textContent = dept.name;
        departmentSelect.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", () => {

    displayNonConformities();

    populateDepartments();


    document.querySelector("form").addEventListener("submit", registerNonConformity);
});

