const container = document.querySelector(".container");
let drawHearts;
let mouseX = 0,
  mouseY = 0;
let hearts = [];

let colors = ["#ff0000", "#dc143c", "#ff4040", "#ed2939", "#fe2712", "#ed1c24"];

let events = {
  mouse: {
    move: "mousemove",
    stop: "mouseout",
  },
  touch: {
    move: "touchmove",
    stop: "touchend",
  },
};

let deviceType = "";

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

function randomNumberGenerator(min, max) {
  return Math.random() * (max - min) + min;
}

function startCreation() {
  if (drawHearts) {
    let div = document.createElement("div");
    div.classList.add("heart-container");
    div.style.left = mouseX + randomNumberGenerator(5, 50) + "px";
    div.style.top = mouseY + randomNumberGenerator(5, 50) + "px";
    let randomColor =
      colors[Math.floor(randomNumberGenerator(0, colors.length - 1))];
    div.innerHTML = `<div class="heart"></div>`;
    div.style.opacity = 1;
    let root = document.querySelector(":root");
    let sizeValue = randomNumberGenerator(10, 20);
    root.style.setProperty("--size", sizeValue + "px");
    root.style.setProperty("--color", randomColor);
    container.appendChild(div);
    hearts.push({
      visible: true,
    });
  }
  updateHearts();
  window.setTimeout(startCreation, 50);
}
function updateHearts() {
  for (let i in hearts) {
    let heartContainer = document.getElementsByClassName("heart-container")[i];
    if (hearts[i].visible) {
      heartContainer.style.opacity = +heartContainer.style.opacity - 0.1;
      if (heartContainer.style.opactiy == 0) {
        hearts[i].visible = false;
      }
    } else {
      heartContainer.remove();
      hearts.splice(i, 1);
    }
  }
}
isTouchDevice();
document.addEventListener(events[deviceType].move, function (e) {
  mouseX = isTouchDevice() ? e.touches[0].pageX : e.pageX;
  mouseY = isTouchDevice() ? e.touches[0].pageY : e.pageY;
  drawHearts = true;
});

document.addEventListener(events[deviceType].stop, function (e) {
  drawHearts = false;
});

window.onload = () => {
  drawHearts = false;
  startCreation();
};
