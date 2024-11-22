document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

  
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const anexo = document.getElementById('anexo').files[0];
    const data = document.getElementById('data').value;
    const responsavel = document.getElementById('responsavel').value;


    if (!titulo || !descricao || !data || !responsavel) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }


    const tabela = document.getElementById('conformidades').querySelector('tbody');
    const novaLinha = document.createElement('tr');


    novaLinha.innerHTML = `
        <td>${titulo}</td>
        <td>${descricao}</td>
        <td>${anexo ? '<a href="#" class="view-anexo">Ver Anexo</a>' : 'Nenhum anexo'}</td>
        <td>${data}</td>
        <td>${responsavel}</td>
        <td>Em andamento</td>
        <td>
            <button class="btn-acompanhar">Acompanhar</button>
            <button class="btn-excluir">Excluir</button>
        </td>
    `;


    novaLinha.querySelector('.btn-excluir').addEventListener('click', function() {
        tabela.removeChild(novaLinha);
    });


    if (anexo) {
        novaLinha.querySelector('.view-anexo').addEventListener('click', function(event) {
            event.preventDefault();
            const url = URL.createObjectURL(anexo);
            window.open(url); 
        });
    }

    novaLinha.querySelector('.btn-acompanhar').addEventListener('click', function() {
        novaLinha.querySelector('td:nth-child(6)').textContent = 'Concluído';
    });

    tabela.appendChild(novaLinha);

    document.getElementById('form').reset();

    const mensagem = document.getElementById('mensagem');
    mensagem.style.display = 'block';
    setTimeout(() => { mensagem.style.display = 'none'; }, 3000);
});
