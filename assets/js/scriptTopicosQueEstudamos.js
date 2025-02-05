document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("topicos-container");
    const topicos = ["01-topico-FRB.html", "02-topico-OCsAMM.html", "03-topico-FontesLongoPeriodo.html", "04-topico-Divulgacao.html"]; // Adicione todos os arquivos aqui

    topicos.forEach(arquivo => {
        fetch(`topicosQueEstudamos/${arquivo}`)
            .then(response => response.text())
            .then(html => {
                const div = document.createElement("div");
                div.classList.add("col-4", "col-6-medium", "col-12-small");
                div.innerHTML = html;
                container.appendChild(div);
            })
            .catch(error => console.error("Erro ao carregar tópico:", error));
    });
});
