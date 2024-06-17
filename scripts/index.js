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
    html = `<p>${word}</p>`;
    vocabularyHTML += html;
  })
  vocabularyDisplay.innerHTML = vocabularyHTML;
}

submitTextButton.addEventListener('click', submitText);

textInputForm.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    submitText()
  }
});