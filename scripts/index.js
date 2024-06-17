let vocabulary = [];

// Load vocabulary from local storage if it exists
let savedVocabulary;
savedVocabulary = JSON.parse(localStorage.getItem('vocabulary'));
if (savedVocabulary) {
  vocabulary = savedVocabulary;
}

// Load in elements from base doc
const submitTextButton = document.querySelector('.js-submit-text-button');
const textInputForm = document.querySelector('.js-text-input');
const vocabularyDisplay = document.querySelector('.js-vocabulary-display');

// Initial vocabulary display
displayVocabulary();

// Functions //

function submitText() {
  submittedText = document.querySelector('.js-text-input').value;
  submittedWords = submittedText.split(" ");

  submittedWords.forEach((word) => {
    vocabulary.push(word);
  })

  document.querySelector('.js-text-input').value = '';

  localStorage.setItem('vocabulary', JSON.stringify(vocabulary));

  displayVocabulary();
}

function displayVocabulary()  {
  vocabularyHTML = '';
  vocabulary.forEach((word) => {
    html = `
      <p>
        <div class="js-word-block">
          <button class="vocab-word js-vocab-word">${word}</button>
          <button class="js-delete-button">
            Delete
          </button>
        <div>
      </p>
    `;
    vocabularyHTML += html;
  })
  vocabularyDisplay.innerHTML = vocabularyHTML;

  const vocabWords = document.querySelectorAll('.js-vocab-word');
  const wordBlocks = document.querySelectorAll('.js-word-block');
  vocabWords.forEach((word, index) => {
    word.addEventListener('click', () => {
      wordBlocks[index].innerHTML = `
        <input type="text" class="js-word-editor" value="${vocabulary[index]}">
        <button class="js-update-button">
          Update
        </button>
      `;

      const wordEditor = document.querySelector('.js-word-editor');
      const updateButton = document.querySelector('.js-update-button');

      wordEditor.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          updateWord(index, wordEditor.value);
        }
      });

      updateButton.addEventListener('click', () => {
        updateWord(index, wordEditor.value);
      });
    });
  });

  const deleteButtons = document.querySelectorAll('.js-delete-button');
  deleteButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      vocabulary.splice(index, 1);

      localStorage.setItem('vocabulary', JSON.stringify(vocabulary));

      displayVocabulary();
    })
  })
}

function updateWord(index, value) {
  vocabulary[index] = value;

  localStorage.setItem('vocabulary', JSON.stringify(vocabulary));

  displayVocabulary();
}

// General event listeners

submitTextButton.addEventListener('click', submitText);

textInputForm.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    submitText()
  }
});