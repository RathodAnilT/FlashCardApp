document.addEventListener('DOMContentLoaded', loadFlashcards);

function addFlashcard() {
    const question = document.getElementById('question').value.trim();
    const answer = document.getElementById('answer').value.trim();

    if (!question || !answer) {
        alert('Please enter both question and answer.');
        return;
    }

    const currentDateTime = new Date().toLocaleString();

    const flashcard = {
        question: question,
        answer: answer,
        created: currentDateTime
    };

    const flashcards = getFlashcards();
    flashcards.push(flashcard);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));

    document.getElementById('question').value = '';
    document.getElementById('answer').value = '';

    renderFlashcards();
}

function deleteFlashcard(index) {
    const flashcards = getFlashcards();
    flashcards.splice(index, 1);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    renderFlashcards();
}

function toggleContent(button) {
    const content = button.parentElement.nextElementSibling;
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        button.textContent = 'Hide';
    } else {
        content.classList.add('hidden');
        button.textContent = 'Show';
    }
}

function getFlashcards() {
    const flashcards = localStorage.getItem('flashcards');
    return flashcards ? JSON.parse(flashcards) : [];
}

function renderFlashcards() {
    const flashcards = getFlashcards();
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    flashcards.forEach((flashcard, index) => {
        const card = document.createElement('div');
        card.classList.add('p-4', 'border', 'border-gray-300', 'rounded-md', 'shadow-sm', 'bg-gray-50');

        card.innerHTML = `
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-800">${flashcard.question}</h3>
                <button onclick="toggleContent(this)" class="bg-gray-300 text-gray-800 px-2 py-1 rounded-md hover:bg-gray-400 transition duration-300">Show/Hide</button>
            </div>
            <p class="text-gray-600 mt-2 hidden">${flashcard.answer}</p>
            <p class="text-sm text-gray-500 mt-2">Created on: ${flashcard.created}</p>
            <button onclick="deleteFlashcard(${index})" class="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">Delete</button>
        `;

        container.appendChild(card);
    });
}

function loadFlashcards() {
    renderFlashcards();
}
