document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded");
  const button = document.querySelector(".translate-button");
  const pigeon = document.querySelector(".logo");
  const speechBubble = document.querySelector(".speech-bubble");
  const bubbleContent = document.querySelector(".bubble-content");
  const textarea = document.querySelector(".input-field");

  // Array of cooing sound files
  const cooFiles = [
    "assets/audio/samples/coo1.mp3",
    "assets/audio/samples/coo2.mp3",
    "assets/audio/samples/coo3.mp3",
    "assets/audio/samples/coo4.mp3",
    "assets/audio/samples/coo5.mp3",
    "assets/audio/samples/coo6.mp3",
    "assets/audio/samples/coo7.mp3",
    "assets/audio/samples/coo8.mp3",
    "assets/audio/samples/coo9.mp3",
    "assets/audio/samples/coo10.mp3",
    "assets/audio/samples/coo11.mp3",
  ];

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function playRandomCoo() {
    const randomIndex = getRandomInt(0, cooFiles.length - 1);
    const audio = new Audio(cooFiles[randomIndex]);
    audio.play();
    return audio;
  }

  function animateDots() {
    let dots = ".";
    let count = 0;
    const maxDots = 3;

    // Set initial dot
    bubbleContent.textContent = dots;

    const interval = setInterval(() => {
      count = (count + 1) % maxDots;
      dots = ".".repeat(count + 1);
      bubbleContent.textContent = dots;
    }, 500);

    return interval;
  }

  button.addEventListener("click", () => {
    console.log("Button clicked");
    const text = textarea.value.trim();
    if (text) {
      // Show speech bubble with animated dots
      const interval = animateDots();
      speechBubble.classList.add("visible");
      pigeon.classList.add("speaking");

      // Play random cooing sounds
      const numCooings = getRandomInt(2, 4);
      const cooings = [];

      // Play first coo immediately
      cooings.push(playRandomCoo());

      // Schedule remaining cooings
      for (let i = 1; i < numCooings; i++) {
        setTimeout(() => {
          cooings.push(playRandomCoo());
        }, i * 1000); // Space them out by 1 second
      }

      // Hide after all cooings are done
      setTimeout(() => {
        clearInterval(interval);
        speechBubble.classList.remove("visible");
        pigeon.classList.remove("speaking");
      }, (numCooings + 1) * 1000); // Wait for all cooings to finish
    }
  });
});
