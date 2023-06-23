// Assignment 1 | COMP1073 Client-Side JavaScript

/* Variables
-------------------------------------------------- */
// Create a new speechSynthesis object
let synth = window.speechSynthesis;
// Learn more about SpeechSynthesis.speak() at https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak
let textToSpeak = "";

// a constant which corresponds to the button which triggers the speech process
const speakButton = document.querySelector('#speech-btn');


/* Functions
-------------------------------------------------- */
function speakNow(string) {
  // Create a new speech object, attaching the string of text to speak
  let utterThis = new SpeechSynthesisUtterance(string);
  // Actually speak the text
  synth.speak(utterThis);
};

/* Event Listeners
-------------------------------------------------- */
// Onclick handler for the button that speaks the text contained in the above var textToSpeak
speakButton.onclick = function() {
  speakNow(textToSpeak);
  resetSpeech();
}

/* An object to store arrays. Contaier items form partial button class names. i.e. purple button has class name btn-arrayNoun. This is done to associte the array with that particular button according
to the rules of the book.
*/
const container =
{
  arrayNoun: ["The turkey", "Mom", "Dad", "The dog", "My teacher", "The elephant", "The cat"],
  arrayVerb: ["sat on", "ate", "danced with", "saw", "doesn't like", "kissed"],
  arrayAdjective: ["a funny", "a scary", "a goofy", "a slimy", "a barking", "a fat"],
  arrayMoreNoun: ["goat", "monkey", "fish", "cow", "frog", "bug", "worm"],
  arrayLocation: ["on the moon", "on the chair", "in my spaghetti", "in my soup", "on the grass", "in my shoes"]
};

// The function below takes in an array as a parameter and returns a random item from that array.
function random(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Applying an EventListener generateText to the parent div(class= "btn") acting as a container to every color button(buttons associated to an array with text) 
let btnContainer = document.querySelector('.btn');
btnContainer.addEventListener('click', generateText);

/* generateText function generates the funny text.

function working: Every colored button(in the top) linked to an array is wrapped inside a div with class btn. An event listener is applied to that parent div. We use Event delegation to extract random generated  array item from every button. Once a button is clicked, it's class name is extracted and required data from that is acquire using split() function and stored in currBtn. Then, currBtn is used to get the array associated with it from the container object, and stored in curArray.
  for example:
  if button clicked is 'Noun', then currBtn= 'Noun' and
  currArray=container[array_associated_with_buttonNoun]
    
Then a random item is selected from that array and saved into textToSpeak string.
Because of event delegation, this function is called every time a button inside div(.btn) is clicked,
and with that every new value of text extracted from every call of this function is concatenated into it's previous value, thus creating a long string(or sentence) which will be spoken in the end.
 
*/

function generateText(event) {
  let currBtn = event.target.className.split("-")[1];
  let currArray = container[currBtn];
  let word = currArray[Math.floor(Math.random() * currArray.length)];
  textToSpeak += word;
  textToSpeak += " ";
  console.log(textToSpeak);
}

/* The following function will reset the string containing the sentence to empty string. And
 it is called after the user clicks the GenerateSpeech button so that once the speech is delivered
 nothing will be spoken again unless another string is created using by the combination of color 
 buttons.
*/
function resetSpeech() {
  textToSpeak = ""; // Reset the string value to empty
}

// grabbing the surprise button
let btnRandSpeech = document.getElementById('randSpeech-btn');

/* Adding an EventListener to it. It will iterate through every array inside the Container object
and randomly pick an item from current array(using random() function), adding it to textToSpeak variable thus creating a random string. The EventListener will pass that value to speakNow(), thus making the speech. This does not require the user to make the sentence as it will automatically 
generate it for the user.
*/
btnRandSpeech.addEventListener('click', function() {
  let target = Object.values(container);

  target.forEach((item) => {
    textToSpeak += random(item)
    textToSpeak += " "
  })

  const speechText = document.createElement('p');
  speechText.textContent = textToSpeak.trim();

  const speechDiv = document.querySelector('.speech-text');
  speechDiv.appendChild(speechText);


  speakNow(textToSpeak.trim());
  resetSpeech();
});


