/* ===== SCRIPT PRINCIPAL DO PORTFÓLIO ===== */

// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVEGAÇÃO ATIVA =====
    // Destaca o link da página atual na navegação
    highlightCurrentPage();
    
    // ===== VALIDAÇÃO DO FORMULÁRIO =====
    // Adiciona validação personalizada ao formulário de contato
    setupFormValidation();
    
    // ===== EFEITOS VISUAIS =====
    // Adiciona efeitos de scroll suave e animações
    setupScrollEffects();
    
    // ===== INTERAÇÕES DO USUÁRIO =====
    // Configura interações adicionais
    setupUserInteractions();
});

/* ===== FUNÇÃO PARA DESTACAR PÁGINA ATUAL ===== */
function highlightCurrentPage() {
    // Obtém o nome do arquivo atual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Encontra todos os links de navegação
    const navLinks = document.querySelectorAll('nav a');
    
    // Remove classe ativa de todos os links e adiciona ao link atual
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

/* ===== VALIDAÇÃO DO FORMULÁRIO DE CONTATO ===== */
function setupFormValidation() {
    const form = document.querySelector('.form-contato');
    
    // Verifica se existe formulário na página
    if (!form) return;
    
    // Adiciona evento de submit ao formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Previne o envio padrão
        
        // Obtém os campos do formulário
        const nome = document.getElementById('nome');
        const email = document.getElementById('email');
        const mensagem = document.getElementById('mensagem');
        
        // Valida os campos
        let isValid = true;
        
        // Validação do nome
        if (!validateName(nome.value)) {
            showFieldError(nome, 'Por favor, digite seu nome completo (mínimo 2 palavras)');
            isValid = false;
        } else {
            clearFieldError(nome);
        }
        
        // Validação do email
        if (!validateEmail(email.value)) {
            showFieldError(email, 'Por favor, digite um email válido');
            isValid = false;
        } else {
            clearFieldError(email);
        }
        
        // Validação da mensagem
        if (!validateMessage(mensagem.value)) {
            showFieldError(mensagem, 'Por favor, digite uma mensagem com pelo menos 10 caracteres');
            isValid = false;
        } else {
            clearFieldError(mensagem);
        }
        
        // Se todos os campos são válidos, simula o envio
        if (isValid) {
            simulateFormSubmission();
        }
    });
    
    // Adiciona validação em tempo real
    setupRealTimeValidation();
}

/* ===== FUNÇÕES DE VALIDAÇÃO ===== */
function validateName(name) {
    // Verifica se o nome tem pelo menos 2 palavras
    return name.trim().split(' ').length >= 2 && name.trim().length >= 3;
}

function validateEmail(email) {
    // Regex para validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMessage(message) {
    // Verifica se a mensagem tem pelo menos 10 caracteres
    return message.trim().length >= 10;
}

/* ===== FUNÇÕES PARA EXIBIR/LIMPAR ERROS ===== */
function showFieldError(field, message) {
    // Remove erro anterior se existir
    clearFieldError(field);
    
    // Adiciona classe de erro ao campo
    field.classList.add('error');
    
    // Cria elemento de erro
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Insere o erro após o campo
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    // Remove classe de erro
    field.classList.remove('error');
    
    // Remove mensagem de erro se existir
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

/* ===== VALIDAÇÃO EM TEMPO REAL ===== */
function setupRealTimeValidation() {
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const mensagem = document.getElementById('mensagem');
    
    // Validação do nome em tempo real
    if (nome) {
        nome.addEventListener('blur', function() {
            if (this.value && !validateName(this.value)) {
                showFieldError(this, 'Por favor, digite seu nome completo (mínimo 2 palavras)');
            } else if (this.value) {
                clearFieldError(this);
            }
        });
    }
    
    // Validação do email em tempo real
    if (email) {
        email.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                showFieldError(this, 'Por favor, digite um email válido');
            } else if (this.value) {
                clearFieldError(this);
            }
        });
    }
    
    // Validação da mensagem em tempo real
    if (mensagem) {
        mensagem.addEventListener('blur', function() {
            if (this.value && !validateMessage(this.value)) {
                showFieldError(this, 'Por favor, digite uma mensagem com pelo menos 10 caracteres');
            } else if (this.value) {
                clearFieldError(this);
            }
        });
    }
}

/* ===== SIMULAÇÃO DE ENVIO DO FORMULÁRIO ===== */
function simulateFormSubmission() {
    const submitButton = document.querySelector('.btn-enviar');
    const originalText = submitButton.textContent;
    
    // Desabilita o botão e mostra loading
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    // Simula delay de envio
    setTimeout(function() {
        // Mostra mensagem de sucesso
        showSuccessMessage();
        
        // Limpa o formulário
        document.querySelector('.form-contato').reset();
        
        // Restaura o botão
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }, 2000);
}

/* ===== MENSAGEM DE SUCESSO ===== */
function showSuccessMessage() {
    // Cria elemento de sucesso
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <h3>✅ Mensagem enviada com sucesso!</h3>
        <p>Obrigado pelo contato. Responderei em breve!</p>
    `;
    
    // Insere antes do formulário
    const form = document.querySelector('.form-contato');
    form.parentNode.insertBefore(successDiv, form);
    
    // Remove a mensagem após 5 segundos
    setTimeout(function() {
        successDiv.remove();
    }, 5000);
}

/* ===== EFEITOS DE SCROLL ===== */
function setupScrollEffects() {
    // Adiciona efeito de fade-in aos elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in-visible");
                observer.unobserve(entry.target); // Para a animação após a primeira vez
            }
        });
    }, observerOptions);
    
    // Observa todas as seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

/* ===== INTERAÇÕES ADICIONAIS ===== */
function setupUserInteractions() {
    // Adiciona efeito de clique nos cards de projeto
    const projectItems = document.querySelectorAll('.project-item, .hobby-item');
    
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            // Adiciona efeito visual de clique
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Adiciona contador de caracteres no textarea
    const textarea = document.getElementById('mensagem');
    if (textarea) {
        setupCharacterCounter(textarea);
    }
    
    // Adiciona smooth scroll para links internos
    setupSmoothScroll();
}

/* ===== CONTADOR DE CARACTERES ===== */
function setupCharacterCounter(textarea) {
    // Cria elemento contador
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.textContent = '0 caracteres';
    
    // Insere após o textarea
    textarea.parentNode.appendChild(counter);
    
    // Atualiza contador em tempo real
    textarea.addEventListener('input', function() {
        const count = this.value.length;
        counter.textContent = `${count} caracteres`;
        
        // Muda cor baseado no mínimo necessário
        if (count >= 10) {
            counter.style.color = '#28a745';
        } else {
            counter.style.color = '#6c757d';
        }
    });
}

/* ===== SMOOTH SCROLL ===== */
function setupSmoothScroll() {
    // Adiciona smooth scroll para links que apontam para âncoras
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ===== UTILITÁRIOS ===== */
// Função para debounce (evita execução excessiva de eventos)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Função para mostrar/ocultar elementos baseado no scroll
function setupScrollReveal() {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    });
    
    elements.forEach(el => revealObserver.observe(el));
}

