document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("publicacoesMembrosAristarco-container");
    const publicacoes = [
        "publi-marcioAvellar-01.html"
    ]; 

    publicacoes.forEach(arquivo => {
        fetch(`publicacoes/${arquivo}`)
            .then(response => response.text())
            .then(html => {
                const div = document.createElement("div");
                div.classList.add("col-12"); // Aplica classe de coluna do grid
                div.innerHTML = `
                    <article class="box post" style="margin-bottom: -10px;">
                        ${html} 
                    </article>
                `; // Garante que cada membro carregado tenha a estrutura correta
                
                container.appendChild(div);
            })
            .catch(error => console.error("Erro ao carregar membro:", error));
    });
});
