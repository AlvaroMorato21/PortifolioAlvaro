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

            numbers = numbers.substring(0, 11);

            let formatted = "";

            if (numbers.length > 0) {
                formatted = "(" + numbers.substring(0, 2);
            }

            if (numbers.length >= 3) {
                formatted += ") " + numbers.substring(2, 7);
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
        }

        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();


    /* ==========================================================================
       4. ANIMAÇÃO AO ROLAR
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
       5. FORMULÁRIO - FORMSPREE
       ========================================================================== */

    const contactForm =
        document.getElementById("contact-form");

    const customModal =
        document.getElementById("custom-modal");

    const closeModalBtn =
        document.getElementById("modal-close");


    if (contactForm) {

        contactForm.addEventListener("submit", async (event) => {

            event.preventDefault();


            /* ------------------------------------------------------------------
               PEGA O ENDPOINT DO FORMSPREE
               ------------------------------------------------------------------ */

            const formAction = contactForm.action;

            if (!formAction ||
                !formAction.includes("formspree.io")) {

                alert(
                    "Erro: o formulário não está configurado com um endereço válido do Formspree."
                );

                console.error(
                    "Action encontrada:",
                    formAction
                );

                return;
            }


            /* ------------------------------------------------------------------
               BOTÃO
               ------------------------------------------------------------------ */

            const submitButton =
                contactForm.querySelector('button[type="submit"]');

            const originalButtonText =
                submitButton ? submitButton.innerHTML : "Enviar";


            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = "Enviando...";
            }


            /* ------------------------------------------------------------------
               DADOS DO FORMULÁRIO
               ------------------------------------------------------------------ */

            const formData =
                new FormData(contactForm);


            try {

                /* --------------------------------------------------------------
                   ENVIA PARA O FORMSPREE
                   -------------------------------------------------------------- */

                const response = await fetch(formAction, {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                });


                /* --------------------------------------------------------------
                   SUCESSO
                   -------------------------------------------------------------- */

                if (response.ok) {

                    console.log(
                        "Mensagem enviada com sucesso para o Formspree."
                    );


                    // Limpa o formulário
                    contactForm.reset();


                    // Mostra o modal
                    if (customModal) {
                        customModal.classList.remove("hidden");
                    }

                }

                /* --------------------------------------------------------------
                   ERRO DO FORMSPREE
                   -------------------------------------------------------------- */

                else {

                    let errorMessage =
                        "Não foi possível enviar sua mensagem.";

                    try {

                        const data =
                            await response.json();

                        console.error(
                            "Resposta do Formspree:",
                            data
                        );


                        if (data.errors &&
                            Array.isArray(data.errors)) {

                            errorMessage =
                                data.errors
                                    .map(error => error.message)
                                    .join("\n");
                        }

                    }

                    catch (jsonError) {

                        console.error(
                            "Não foi possível ler a resposta do Formspree.",
                            jsonError
                        );
                    }


                    alert(errorMessage);
                }

            }

            catch (error) {

                console.error(
                    "Erro ao conectar com o Formspree:",
                    error
                );


                alert(
                    "Não foi possível enviar a mensagem. Verifique sua conexão com a internet e tente novamente."
                );
            }


            finally {

                if (submitButton) {

                    submitButton.disabled = false;
                    submitButton.innerHTML =
                        originalButtonText;
                }
            }

        });
    }


    /* ==========================================================================
       6. MODAL
       ========================================================================== */

    if (closeModalBtn && customModal) {

        closeModalBtn.addEventListener("click", () => {

            customModal.classList.add("hidden");

        });


        window.addEventListener("click", (event) => {

            if (event.target === customModal) {

                customModal.classList.add("hidden");

            }

        });
    }

});
