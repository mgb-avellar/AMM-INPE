document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("posts-container");
    const topicos = ["p1-index.html","p2-index.html"]; // Adicione todos os arquivos aqui

    topicos.forEach(arquivo => {
        fetch(`posts/${arquivo}`)
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
