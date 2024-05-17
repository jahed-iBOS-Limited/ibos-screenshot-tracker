/* eslint-disable no-undef */
document.addEventListener("DOMContentLoaded", function () {
  function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById("clock").textContent = timeString;
  }

  // Update the time every second
  setInterval(updateTime, 1000);

  // Initial update
  updateTime();

  const screenshortBtn = document.getElementById("screenshortBtn");

  // how to take screenshort
  screenshortBtn.addEventListener("click", async () => {
    takeScreenshort();
    setInterval(() => {
      takeScreenshort();
    }, 5000);
  });


});

const takeScreenshort = () => {
  let email = "";
  chrome.identity.getProfileUserInfo(function (info) {
    email = info.email;
  });
  chrome.tabs.captureVisibleTab((dataUrl) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);
      const link = document.createElement("a");
      link.download = `${email}, ${formatDate()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    };
  });
};

function formatDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours} ${minutes}`;
}
