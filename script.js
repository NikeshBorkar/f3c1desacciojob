// Get a reference to the 'activeTimers' element in the HTML
const activeTimers = document.getElementById("activeTimers");
displayNoTimersText();

// Get reference to the 'audio'element in the HTML
const audio = document.getElementById("audio-file");

// Get a reference to the 'startTimer' button in the HTML
const startTimerButton = document.getElementById("startTimer");
// Initialize a flag to track whether a timer is currently active
let isTimerActive = false;

// Add a click event listener to the 'Start New Timer' button
startTimerButton.addEventListener("click", () => {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  // Calculate the total time in seconds
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
if(minutes<=60 && seconds<=60){
  if (totalSeconds > 0) {
    createTimer(totalSeconds);
    isTimerActive = true;
    removeNoTimersText();
  } else {
    alert("Please enter a valid time.");
  }
}else{
  if(minutes>60 && seconds>60){
    alert("Please enter a valid time. minutes & seconds are gretar than 60");
  }else if(minutes>60){
    alert("Please enter a valid time. minutes is gretar than 60");
  }else if(seconds>60)
  alert("Please enter a valid time. seconds is gretar than 60");
}}
);


// Function to format time in HH:MM:SS format
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")} : ${m
    .toString()
    .padStart(2, "0")} : ${s.toString().padStart(2, "0")} `;
}

// Function to create a new timer with the specified total seconds
function createTimer(totalSeconds) {
  // Create a container for the timer
  const timerContainer = document.createElement("div");
  timerContainer.classList.add("timer-container");

  // Create an element to display "Time Left"
  const timeLeftElement = document.createElement("div");
  timeLeftElement.classList.add("time-left");
  timeLeftElement.textContent = "Time Left:";

  // Create an element to display the timer value
  const timerElement = document.createElement("div");
  timerElement.classList.add("timer");

  // Create a container for timer control buttons
  const timerControls = document.createElement("div");
  timerControls.classList.add("timer-controls");

  // Create the 'Stop Timer' button
  const stopButton = document.createElement("button");
  stopButton.classList.add("control-button", "stop-button");
  stopButton.textContent = "Delete";

  // Create the 'Delete' button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("control-button", "delete-button");
  deleteButton.textContent = "Stop";
  deleteButton.style.display = "none";

  let timerInterval;

  // Function to update the timer display
  function updateTimerDisplay() {
    totalSeconds--;
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      timerElement.classList.add("timer-ended");
      timerElement.textContent = "Time is up!";
      stopButton.style.display = "none";
      deleteButton.style.display = "inline";
      timeLeftElement.style.display = "none";
      timerContainer.style.backgroundColor="#F0F757"
      audio.play();
    } else {
      timerElement.textContent = formatTime(totalSeconds);
    }
  }

  // Add a click event listener to the 'Stop Timer' button
  stopButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerContainer.remove();
    isTimerActive = false;
    if (activeTimers.children.length === 0) {
      displayNoTimersText();
    }
  });

  // Add a click event listener to the 'Delete' button
  deleteButton.addEventListener("click", () => {
    audio.pause();
    timerContainer.remove();
    if (activeTimers.children.length === 0) {
      displayNoTimersText();
    }
  });

  // Start the timer interval
  timerInterval = setInterval(updateTimerDisplay, 1000);

  // Append timer control elements to the timer container
  timerControls.appendChild(stopButton);
  timerControls.appendChild(deleteButton);

  // Append timer elements to the timer container
  timerContainer.appendChild(timeLeftElement);
  timerContainer.appendChild(timerElement);
  timerContainer.appendChild(timerControls);

  // Append the timer container to the 'activeTimers' element
  activeTimers.appendChild(timerContainer);

 document.getElementById("hours").value=null
 document.getElementById("minutes").value=null
 document.getElementById("seconds").value=null
}

// Function to display "You have no timers currently!" text
function displayNoTimersText() {
  const noTimersText = document.createElement("p");
  noTimersText.classList.add("no-timers-text");
  noTimersText.textContent = "You have no timers currently!";
  noTimersText.style.fontSize = "14px";
  activeTimers.appendChild(noTimersText);
}

// Function to remove "You have no timers currently!" text
function removeNoTimersText() {
  const noTimersText = activeTimers.querySelector(".no-timers-text");
  if (noTimersText) {
    noTimersText.remove();
  }
}
