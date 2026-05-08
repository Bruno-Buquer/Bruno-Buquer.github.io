(function () {
    const overlay = document.getElementById('modal-projeto');
    if (!overlay) return;

    const dialog = overlay.querySelector('.modal-dialog');
    const titulo = overlay.querySelector('.modal-titulo');
    const descricao = overlay.querySelector('.modal-descricao');
    const tecnologias = overlay.querySelector('.modal-tecnologias');
    const btnFechar = overlay.querySelector('.modal-fechar');

    let ultimoFoco = null;

    function abrirModal(card) {
        const h3 = card.querySelector('h3');
        const p = card.querySelector('p');
        const lis = card.querySelectorAll('ul li');

        titulo.textContent = h3 ? h3.textContent.trim() : '';
        descricao.textContent = p ? p.textContent.trim() : '';

        tecnologias.innerHTML = '';
        lis.forEach((li) => {
            const item = document.createElement('li');
            item.textContent = li.textContent.trim();
            tecnologias.appendChild(item);
        });

        ultimoFoco = document.activeElement;
        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        btnFechar.focus();
    }

    function fecharModal() {
        if (!overlay.classList.contains('is-open')) return;

        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        if (ultimoFoco && typeof ultimoFoco.focus === 'function') {
            ultimoFoco.focus();
        }
        ultimoFoco = null;
    }

    document.addEventListener('click', (e) => {
        const card = e.target.closest('.card-conteudo');
        if (card && overlay.contains(e.target) === false) {
            abrirModal(card);
            return;
        }

        if (e.target === overlay) {
            fecharModal();
        }
    });

    btnFechar.addEventListener('click', fecharModal);

    dialog.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
            fecharModal();
        }
    });
})();
