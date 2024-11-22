document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("acao-form");
    const tabela = document.getElementById("lista-acoes");

    // Função para carregar dados salvos do localStorage
    function carregarDados() {
        const acoesSalvas = JSON.parse(localStorage.getItem("acoes")) || [];
        acoesSalvas.forEach((acao) => adicionarLinha(acao));
    }

    // Função para adicionar uma linha na tabela
    function adicionarLinha({ titulo, descricao, responsavel, dataCriacao, prazoFechamento }) {
        const novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `
            <td>${titulo}</td>
            <td>${descricao}</td>
            <td>${dataCriacao}</td>
            <td>${responsavel}</td>
            <td>${prazoFechamento}</td>
        `;
    }

    // Função para salvar uma nova ação
    function salvarAcao(acao) {
        const acoes = JSON.parse(localStorage.getItem("acoes")) || [];
        acoes.push(acao);
        localStorage.setItem("acoes", JSON.stringify(acoes));
    }

    // Evento de submissão do formulário
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Captura os valores do formulário
        const titulo = document.getElementById("titulo").value;
        const descricao = document.getElementById("descricao").value;
        const responsavel = document.getElementById("responsavel").value;
        const dataCriacao = document.getElementById("data-criacao").value;
        const prazoFechamento = document.getElementById("prazo-fechamento").value;

        const novaAcao = { titulo, descricao, responsavel, dataCriacao, prazoFechamento };

        // Adiciona a nova linha na tabela
        adicionarLinha(novaAcao);

        // Salva no localStorage
        salvarAcao(novaAcao);

        // Limpa o formulário
        form.reset();
    });

    // Carrega os dados salvos ao iniciar
    carregarDados();
});