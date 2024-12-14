document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const effectClass = {
            'btn1': 'pulse',
            'btn2': 'shake',
            'btn3': 'rotate',
            'btn4': 'rainbow'
        }[this.id];

        this.classList.add(effectClass);
        
        setTimeout(() => {
            this.classList.remove(effectClass);
        }, 1000);
    });
});
