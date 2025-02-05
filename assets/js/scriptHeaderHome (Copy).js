document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("headerHome-container");

    const grupos = [
        { arquivos: ["header.html"], classes: ["col-12"] }
    ];

    function carregarArquivos(indexGrupo = 0, indexArquivo = 0) {
        if (indexGrupo >= grupos.length) return; // Se terminou os grupos, para a execução

        const grupo = grupos[indexGrupo];
        if (indexArquivo >= grupo.arquivos.length) {
            carregarArquivos(indexGrupo + 1, 0); // Passa para o próximo grupo
            return;
        }

        const arquivo = grupo.arquivos[indexArquivo];
        fetch(`./${arquivo}`)
            .then(response => {
                if (!response.ok) throw new Error(`Erro ao carregar ${arquivo}: ${response.statusText}`);
                return response.text();
            })
            .then(html => {
                console.log(`Sucesso ao carregar: ${arquivo}`);
                
                // Criando a div com as classes corretas
                const div = document.createElement("div");
                div.classList.add(...grupo.classes);
                div.innerHTML = html;

                // Adiciona na ordem correta
                container.appendChild(div);

                // Carrega o próximo arquivo no mesmo grupo
                carregarArquivos(indexGrupo, indexArquivo + 1);
            })
            .catch(error => console.error("Erro no fetch:", error));
    }

    carregarArquivos(); // Inicia o carregamento na ordem correta
});
