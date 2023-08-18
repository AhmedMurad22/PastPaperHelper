var paperDetailsElement = document.getElementById('paper-details');
paperDetailsElement.textContent = `Paper: ${subject}: ${code}_${series}${year}_qp_${coreorextended}${variant}`;
console.log(subject, year, code, series, variant, coreorextended)

// variables for ui
let questionNum = 1;
let numCorrect = 0;
let numWrong = 0;

// Map button IDs to valid answer values
var buttonToAnswerMap = {
    'btna': 'A',
    'btnb': 'B',
    'btnc': 'C',
    'btnd': 'D',
};

var questionNumMax = document.getElementById('question-num');

function updateQuestionNum(event) {
    if (questionNum >= 40) {
        // Change the <h1> content to "stooooop"
        var questionNumElement = document.getElementById('question-num');
        questionNumElement.textContent = "GOOD JOB, YOU ARE DONE!";

        return; // Exit the function, no further processing needed
    }
    questionNum += 1;
    console.log("Question Number:", questionNum);

    // Update the content of the <h3> element
    var questionNumElement = document.getElementById('question-num');
    questionNumElement.textContent = "Question Number: " + questionNum;

    // Get the clicked button's id
    var clickedButtonId = event.target.id;
    console.log("Clicked Button ID:", clickedButtonId);

    // Transform the button ID into a valid answer value
    var validAnswer = clickedButtonId.substring(3).toUpperCase(); // "btna" -> "A", "btnb" -> "B", etc.
    console.log("Valid Answer:", validAnswer);

    // Get the correct answer from msData using the question number
    var correctAnswer = ms_data[questionNum];
    console.log("Correct Answer:", correctAnswer);

    var cowtColor = document.getElementById('correct-wrong');

    // Compare the clicked answer with the correct answer
    var correctButtonId = 'btn' + correctAnswer.toLowerCase(); // Convert "A" to "btna"
    var correctButton = document.getElementById(correctButtonId);

    // Compare the clicked answer with the correct answer
    var correctWrongElement = document.getElementById('correct-wrong');
    if (validAnswer === correctAnswer) {
        correctWrongElement.textContent = "Correct!";
        cowtColor.style.color = 'green';
    } else {
        correctWrongElement.textContent = "Wrong!";
        cowtColor.style.color = 'red';

        // Add class for glow effect to the correct button even on wrong answer
        correctButton.classList.add('glow');
    }

    // Display the message and glowing effect for 1.5 seconds
    setTimeout(function() {
        correctWrongElement.textContent = "";
        // Remove the class for glow effect from the correct button
        correctButton.classList.remove('glow');
    }, 1500);  // 1500 milliseconds = 1.5 seconds
}

// Get all buttons with class "option"
var optionButtons = document.querySelectorAll('.option');

// Attach click event listeners to all "option" buttons
for (var i = 0; i < optionButtons.length; i++) {
    optionButtons[i].addEventListener('click', updateQuestionNum);
}

// REMOVE LATER BECAUSE WOULD LEAVE STUFF IN BROWSER CONSOLE
console.log("question paper:", qp_url);
for (var key in ms_data) {
    if (ms_data.hasOwnProperty(key)) {
        console.log("Q:", key, "A:", ms_data[key]);
    }
}

var iframe = document.getElementById('pdf');
var url_for_pdf = qp_url;
iframe.src = url_for_pdf
