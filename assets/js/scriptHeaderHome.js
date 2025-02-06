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
                /* div.innerHTML = html; */
                div.insertAdjacentHTML("beforeend", html);                
                container.appendChild(div);

                setTimeout(() => {
                    atualizarMenuAtivo();
                    inicializarDropotron(); // Oculta o banner se necessário
                    inicializarMenuMobile(); // Chamando a nova função para corrigir o menu mobile
                    ocultarBanner();
                }, 100); // Pequeno atraso para garantir que o DOM foi atualizado
                
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

    function inicializarMenuMobile() {
        const menuButton = document.querySelector(".menu-icon"); // Botão do menu mobile
        const sidebar = document.querySelector("#nav"); // Sidebar do menu
        const menuItems = document.querySelectorAll("#nav ul li > a"); // Links do menu
        const dropdownItems = document.querySelectorAll("#nav ul li > ul"); // Submenus
    
        if (menuButton && sidebar) {
            // Abre/fecha o menu ao clicar no botão
            menuButton.addEventListener("click", () => {
                sidebar.classList.toggle("open");
            });
        }
    
        // Expande/colapsa submenus quando clicados
        menuItems.forEach((item) => {
            item.addEventListener("click", (event) => {
                const parentLi = item.parentElement;
                const subMenu = parentLi.querySelector("ul");
    
                if (subMenu) {
                    event.preventDefault(); // Impede que o link leve a outra página diretamente
                    subMenu.classList.toggle("open");
                }
            });
        });
    }
    
    

    carregarArquivos();
});
