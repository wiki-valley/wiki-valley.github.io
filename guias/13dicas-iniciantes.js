function checkPosition(event) {
            const divPai = event.target;
            const divFilho = document.getElementById('guide-fixo');

            const divPaiRect = divPai.getBoundingClientRect();
            const divFilhoRect = divFilho.getBoundingClientRect();

            if (
                divFilhoRect.left >= divPaiRect.left &&
                divFilhoRect.right <= divPaiRect.right &&
                divFilhoRect.top >= divPaiRect.top &&
                divFilhoRect.bottom <= divPaiRect.bottom
            ) {
                divFilho.style.position = 'fixed';
            } else {
                divFilho.style.position = 'relative';
            }
        }