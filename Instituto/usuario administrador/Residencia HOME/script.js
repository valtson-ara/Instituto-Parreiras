
function loadNonConformities() {
    return JSON.parse(localStorage.getItem("nonConformities")) || [];
}


function saveNonConformities(nonConformities) {
    localStorage.setItem("nonConformities", JSON.stringify(nonConformities));
}


function displayNonConformities() {
    const nonConformities = loadNonConformities();
    const tbody = document.querySelector("table tbody");

    tbody.innerHTML = ""; 

    nonConformities.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td>${item.department}</td>
            <td>${item.status}</td>
            <td>
                <button onclick="markAsCompleted(${index})">Concluir</button>
                <button onclick="deleteNonConformity(${index})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}


function markAsCompleted(index) {
    const nonConformities = loadNonConformities();
    nonConformities[index].status = "Concluída";
    saveNonConformities(nonConformities);
    displayNonConformities();
}

function deleteNonConformity(index) {
    const nonConformities = loadNonConformities();
    nonConformities.splice(index, 1);
    saveNonConformities(nonConformities);
    displayNonConformities();
}

// Chama a função para exibir as não conformidades ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    displayNonConformities();
});


