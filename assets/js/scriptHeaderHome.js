document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("headerHome-container");
    const grupos = [{ arquivos: ["header.html"], classes: ["col-12"] }];

    function carregarArquivos(indexGrupo = 0, indexArquivo = 0) {
        if (indexGrupo >= grupos.length) return;

        const grupo = grupos[indexGrupo];
        if (indexArquivo >= grupo.arquivos.length) {
            carregarArquivos(indexGrupo + 1, 0);
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

                const div = document.createElement("div");
                div.classList.add(...grupo.classes);
                div.innerHTML = html;
                container.appendChild(div);

                atualizarMenuAtivo();
                inicializarDropotron();
                ocultarBanner(); // Oculta o banner se necessário
                carregarArquivos(indexGrupo, indexArquivo + 1);
            })
            .catch(error => console.error("Erro no fetch:", error));
    }

    function atualizarMenuAtivo() {
        const path = window.location.pathname.split("/").pop() || "index.html";
        const links = document.querySelectorAll("#nav ul li a");

        links.forEach(link => {
            const li = link.parentElement;
            li.classList.remove("current");

            const href = link.getAttribute("href");

            if (href === "#") return; // Ignora os dropdowns

            if (href === path) {
                li.classList.add("current");
            }
        });
    }

    function inicializarDropotron() {
        if (typeof jQuery !== "undefined" && $.fn.dropotron) {
            $("#nav > ul").dropotron({
                alignment: "center",
                mode: "fade",
                speed: 200,
                noOpenerFade: true
            });
            console.log("Dropotron inicializado com sucesso!");
        } else {
            console.error("Dropotron não encontrado. Verifique se jquery.dropotron.min.js foi carregado corretamente.");
        }
    }

    function ocultarBanner() {
        const path = window.location.pathname.split("/").pop();
        const paginasOcultarBanner = ["quemsomos.html", "publicacoes.html"];
        
        if (paginasOcultarBanner.includes(path)) {
            const banner = document.querySelector("#banner");
            if (banner) {
                banner.style.display = "none";
                console.log(`Banner ocultado na página: ${path}`);
            }
        }
    }

    carregarArquivos();
});
