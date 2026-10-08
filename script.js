document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       1. TEMA DARK / LIGHT
       ========================================================================== */

    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
        document.body.setAttribute("data-theme", "dark");

        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const theme = document.body.getAttribute("data-theme");

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
    }


    /* ==========================================================================
       2. MÁSCARA DE TELEFONE
       ========================================================================== */

    const phoneInput = document.getElementById("phone");

    if (phoneInput) {
        phoneInput.addEventListener("input", () => {

            let numbers = phoneInput.value.replace(/\D/g, "");

            // Limita a 11 números
            numbers = numbers.substring(0, 11);

            let formatted = "";

            if (numbers.length > 0) {
                formatted = "(" + numbers.substring(0, 2);
            }

            if (numbers.length >= 3) {
                formatted += ")" + numbers.substring(2, 7);
            }

            if (numbers.length >= 8) {
                formatted += "-" + numbers.substring(7, 11);
            }

            phoneInput.value = formatted;
        });
    }


    /* ==========================================================================
       3. EFEITO DE DIGITAÇÃO
       ========================================================================== */

    const typingText = document.getElementById("typing-text");

    const phrases = [
        "Solucionador de Problemas.",
        "Desenvolvedor Full-Stack.",
        "Entusiasta de Tecnologia."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {

        if (!typingText) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent =
                currentPhrase.substring(0, charIndex - 1);

            charIndex--;
        } else {
            typingText.textContent =
                currentPhrase.substring(0, charIndex + 1);

            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {

            speed = 2000;
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
       4. ANIMAÇÃO AO ROLAR A PÁGINA
       ========================================================================== */

    const animatedElements =
        document.querySelectorAll(".scroll-animate");

    function checkScroll() {

        const triggerBottom = window.innerHeight * 0.85;

        animatedElements.forEach((el) => {

            const boxTop =
                el.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                el.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);

    checkScroll();


    /* ==========================================================================
       5. FORMULÁRIO + FORMSPREE
       ========================================================================== */

    const contactForm =
        document.getElementById("contact-form");

    const customModal =
        document.getElementById("custom-modal");

    const closeModalBtn =
        document.getElementById("modal-close");


    if (contactForm) {

        contactForm.addEventListener("submit", async (e) => {

            // Impede o navegador de recarregar a página
            e.preventDefault();

            // Verifica se o formulário possui action
            const formAction = contactForm.getAttribute("action");

            if (!formAction) {
                console.error(
                    "O formulário não possui um atributo 'action'."
                );

                alert(
                    "Erro: o formulário não está configurado corretamente com o Formspree."
                );

                return;
            }


            // Desabilita o botão enquanto envia
            const submitButton =
                contactForm.querySelector('button[type="submit"]');

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerText = "Enviando...";
            }


            try {

                // Pega todos os dados preenchidos no formulário
                const formData =
                    new FormData(contactForm);


                // Envia para o Formspree
                const response = await fetch(
                    formAction,
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );


                /* ==============================================================
                   ENVIO BEM-SUCEDIDO
                   ============================================================== */

                if (response.ok) {

                    // Limpa o formulário SOMENTE depois do envio
                    contactForm.reset();

                    // Mostra o modal
                    if (customModal) {
                        customModal.classList.remove("hidden");
                    }

                } else {

                    /* ==========================================================
                       ERRO RETORNADO PELO FORMSPREE
                       ========================================================== */

                    let errorMessage =
                        "Não foi possível enviar sua mensagem.";

                    try {

                        const data =
                            await response.json();

                        if (data.errors) {

                            errorMessage =
                                data.errors
                                    .map(error => error.message)
                                    .join("\n");
                        }

                    } catch (error) {
                        console.error(
                            "Erro ao interpretar resposta do Formspree:",
                            error
                        );
                    }

                    alert(errorMessage);
                }


            } catch (error) {

                /* ==============================================================
                   ERRO DE CONEXÃO
                   ============================================================== */

                console.error(
                    "Erro ao enviar formulário:",
                    error
                );

                alert(
                    "Ocorreu um erro ao enviar sua mensagem. Verifique sua conexão e tente novamente."
                );

            } finally {

                // Reativa o botão
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerText = "Enviar";
                }
            }
        });
    }


    /* ==========================================================================
       6. FECHAR MODAL
       ========================================================================== */

    if (closeModalBtn && customModal) {

        closeModalBtn.addEventListener("click", () => {
            customModal.classList.add("hidden");
        });


        // Fecha clicando fora do modal
        window.addEventListener("click", (e) => {

            if (e.target === customModal) {
                customModal.classList.add("hidden");
            }

        });
    }

});



