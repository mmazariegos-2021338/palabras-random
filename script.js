document.addEventListener('DOMContentLoaded', () => {
    const tagsEl = document.getElementById('tags');
    const textarea = document.getElementById('textarea');

    textarea.focus();

    textarea.addEventListener('input', handleInput);

    function handleInput(e) {
        if (e.inputType === 'insertText' || e.inputType === 'deleteContentBackward') {
            const inputValue = textarea.value;
            if (inputValue.endsWith(',') || e.inputType === 'deleteContentBackward') {
                addTags(inputValue.slice(0, -1));
                textarea.value = '';
                randomSelect();
            }
        }
    }

    function addTags(input) {
        const tags = input.split(',').filter(tag => tag.trim() !== '');

        tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.classList.add('tag');
            tagEl.innerText = tag;
            tagsEl.appendChild(tagEl);
        });
    }

    function randomSelect() {
        const times = 30;

        const interval = setInterval(() => {
            const randomTag = pickRandomTag();
            if (randomTag) {
                highlightTag(randomTag);

                setTimeout(() => {
                    unHighlightTag(randomTag);
                }, 100);
            } 
        }, 100);

        setTimeout(() => {
            clearInterval(interval);

            setTimeout(() => {
                const randomTag = pickRandomTag();
                if (randomTag) {
                    highlightTag(randomTag);
                }
            }, 100);

        }, times * 100)
    }

    function pickRandomTag() {
        const tags = document.querySelectorAll('.tag');
        return tags[Math.floor(Math.random() * tags.length)];
    }

    function highlightTag(tag) {
        tag.classList.add('highlight');
    }

    function unHighlightTag(tag) {
        tag.classList.remove('highlight');
    }
});

