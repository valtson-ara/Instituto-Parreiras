
function loadDepartments() {
    return JSON.parse(localStorage.getItem("departments")) || [];
}


function saveDepartments(departments) {
    localStorage.setItem("departments", JSON.stringify(departments));
}


function loadNonConformities() {
    return JSON.parse(localStorage.getItem("nonConformities")) || [];
}


function addDepartment(name, description) {
    const departments = loadDepartments();

 
    departments.push({ name, description });
    saveDepartments(departments);

    // Atualiza a tabela na interface
    displayDepartments();
    alert("Departamento adicionado com sucesso!");
}

function displayDepartments() {
    const departments = loadDepartments();
    const table = document.getElementById("table-1");

   
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
        </tr>
    `;

    departments.forEach((department, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${department.name}</td>
            <td>${department.description}</td>
            <td>
                <button class="btn-table" onclick="deleteDepartment(${index})">Excluir</button>
            </td>
        `;
        table.appendChild(row);
    });
}

// Função para excluir um departamento
function deleteDepartment(index) {
    const departments = loadDepartments();
    const departmentToDelete = departments[index];

    // Carrega as não conformidades
    const nonConformities = loadNonConformities();

    // Verifica se há não conformidades associadas ao departamento
    const hasAssociatedNonConformities = nonConformities.some(nc => nc.department === departmentToDelete.name);

    if (hasAssociatedNonConformities) {
        alert("Não é possível excluir este departamento pois existem não conformidades associadas a ele.");
        return;
    }

    
    departments.splice(index, 1); // Remove o departamento pelo índice
    saveDepartments(departments);

 
    displayDepartments();
    alert("Departamento excluído com sucesso!");
}


document.addEventListener("DOMContentLoaded", () => {
    const btnConfirm = document.getElementById("btn-confirm");

    btnConfirm.addEventListener("click", () => {
        const name = document.getElementById("input-nome").value;
        const description = document.getElementById("input-descrição").value;

      
        if (!name || !description) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        
        addDepartment(name, description);

       
        document.getElementById("input-nome").value = "";
        document.getElementById("input-descrição").value = "";
    });

    
    displayDepartments();
});


