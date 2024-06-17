let vocabulary = [];

let savedVocabulary;

savedVocabulary = JSON.parse(localStorage.getItem('vocabulary'));
if (savedVocabulary) {
  vocabulary = savedVocabulary;
}

const submitTextButton = document.querySelector('.js-submit-text-button');
const textInputForm = document.querySelector('.js-text-input');
const vocabularyDisplay = document.querySelector('.js-vocabulary-display');

displayVocabulary();

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
        ${word}
        <button class="js-delete-button">
          Delete
        </button>
      </p>
    `;
    vocabularyHTML += html;
  })
  vocabularyDisplay.innerHTML = vocabularyHTML;

  const deleteButtons = document.querySelectorAll('.js-delete-button');
  deleteButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      vocabulary.splice(index, 1);

      localStorage.setItem('vocabulary', JSON.stringify(vocabulary));
      
      displayVocabulary();
    })
  })
}

submitTextButton.addEventListener('click', submitText);

textInputForm.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    submitText()
  }
});