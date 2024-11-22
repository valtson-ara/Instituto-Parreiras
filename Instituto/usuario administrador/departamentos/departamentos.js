document.addEventListener("DOMContentLoaded", function () {
    // Inicializar o contador com base nas linhas existentes da tabela (excluindo o cabeçalho)
    const table = document.getElementById("table-1");
    let counter = table.rows.length > 1 ? table.rows.length - 1 : 0;

    // Função para adicionar um novo departamento
    document.getElementById("btn-confirm").addEventListener("click", function (event) {
        // Impede o comportamento padrão do botão
        event.preventDefault();

        const nome = document.getElementById("input-nome").value.trim();
        const descricao = document.getElementById("input-descrição").value.trim();

        if (nome && descricao) {
            counter += 1;
            const seqNumber = String(counter).padStart(2, '0'); // Formata para 01, 02, etc.

            const newRow = table.insertRow();

            newRow.innerHTML = `
                <td>${seqNumber}</td>
                <td>${nome}</td>
                <td>${descricao}</td>
                <td>
                    <button class="btn-table" onclick="editRow(this)">Editar</button>
                    <button class="btn-table" onclick="deleteRow(this)">Excluir</button>
                </td>
            `;

            // Limpar os campos de entrada
            document.getElementById("input-nome").value = "";
            document.getElementById("input-descrição").value = "";
        } else {
            alert("Preencha todos os campos!");
        }
    });

    // Função para excluir um departamento
    window.deleteRow = function (button) {
        const row = button.parentElement.parentElement;
        row.remove();
        // Atualizar a sequência após a exclusão
        atualizarSequencia();
    };

    // Função para editar um departamento
    window.editRow = function (button) {
        const row = button.parentElement.parentElement;
        const cells = row.querySelectorAll("td");

        const nomeAtual = cells[1].innerText;
        const descricaoAtual = cells[2].innerText;

        // Substituir os valores atuais por campos editáveis
        cells[1].innerHTML = `<input type="text" value="${nomeAtual}" />`;
        cells[2].innerHTML = `<input type="text" value="${descricaoAtual}" />`;

        // Alterar o botão para salvar
        button.innerText = "Salvar";
        button.onclick = function () {
            const novoNome = cells[1].querySelector("input").value.trim();
            const novaDescricao = cells[2].querySelector("input").value.trim();

            if (novoNome && novaDescricao) {
                cells[1].innerText = novoNome;
                cells[2].innerText = novaDescricao;

                button.innerText = "Editar";
                button.onclick = function () {
                    editRow(button);
                };
            } else {
                alert("Preencha todos os campos antes de salvar!");
            }
        };
    };

    // Função opcional para atualizar a sequência após exclusões
    function atualizarSequencia() {
        const rows = table.rows;
        counter = 0;
        for (let i = 1; i < rows.length; i++) { // Começa em 1 para pular o cabeçalho
            counter += 1;
            const seqNumber = String(counter).padStart(2, '0');
            rows[i].cells[0].innerText = seqNumber;
        }
    }
});