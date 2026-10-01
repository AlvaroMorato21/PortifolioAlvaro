document.addEventListener("DOMContentLoaded", () => {
    

    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
        document.body.setAttribute("data-theme", "dark");
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeToggleBtn.addEventListener("click", () => {
        let theme = document.body.getAttribute("data-theme");

        if (theme === "dark") {
            document.body.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            document.body.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    });



const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", () => {
    var tel_formatado = document.getElementById("phone").value;

    if (tel_formatado[0] != "(") {
        if (tel_formatado[0] != undefined) {
            document.getElementById("phone").value = "(" + tel_formatado[0];
        }
    }

    if (tel_formatado[3] != ")") {
        if (tel_formatado[3] != undefined) {
            document.getElementById("phone").value = tel_formatado.slice(0, 3) + ")" + tel_formatado[3];
        }
    }

    if (tel_formatado[9] != "-") {
        if (tel_formatado[9] != undefined) {
            document.getElementById("phone").value = tel_formatado.slice(0, 9) + "-" + tel_formatado[9];
        }
    }

    // Ajuste para celular de 9 dígitos: move o hífen para a posição correta quando completa 15 caracteres
    if (tel_formatado.length === 15 && tel_formatado[10] != "-") {
        var numApenas = tel_formatado.replace(/\D/g, "");
        document.getElementById("phone").value = "(" + numApenas.slice(0, 2) + ")" + numApenas.slice(2, 7) + "-" + numApenas.slice(7, 11);
    }
});

    /* ==========================================================================
       1. INTERAÇÃO JS 1: EFEITO DE DIGITAÇÃO (Text Typing Effect)
       ========================================================================== */
    const typingText = document.getElementById("typing-text");
    const phrases = ["Solucionador de Problemas.", "Desenvolvedor Full-Stack.", "Entusiasta de Tecnologia."];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 2000; // Pausa no final da frase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();

    /* ==========================================================================
       2. INTERAÇÃO JS 2: ANIMATE ON SCROLL (Animação ao rolar)
       ========================================================================== */
    const animatedElements = document.querySelectorAll(".scroll-animate");

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        animatedElements.forEach((el) => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Executa uma vez no carregamento inicial

    /* ==========================================================================
       3. MODAL CUSTOMIZADO E ENVIO DE FORMULÁRIO
       ========================================================================== */
    const contactForm = document.getElementById("contact-form");
    const customModal = document.getElementById("custom-modal");
    const closeModalBtn = document.getElementById("modal-close");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        // Exibe o Modal
        customModal.classList.remove("hidden");

        // Limpa o formulário
        contactForm.reset();
    });

    closeModalBtn.addEventListener("click", () => {
        customModal.classList.add("hidden");
    });

    // Fechar modal clicando fora dele
    window.addEventListener("click", (e) => {
        if (e.target === customModal) {
            customModal.classList.add("hidden");
        }
    });
});