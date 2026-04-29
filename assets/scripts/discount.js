const dayOfEvent = new Date("2026-05-08");

export function timeToEvent() {
  const seconds = document.querySelector(".seconds .body-counter");
  const minites = document.querySelector(".minites .body-counter");
  const houres = document.querySelector(".houres .body-counter");
  const days = document.querySelector(".days .body-counter");
  setInterval(() => {
    const now = Date.now();
    const deferance = dayOfEvent - now;
    const restDay = Math.floor(deferance / (1000 * 60 * 60 * 24));
    const restHoures = Math.floor(
      (deferance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const restMinites = Math.floor(
      (deferance % (1000 * 60 * 60)) / (1000 * 60),
    );
    const restSeconde = Math.floor((deferance % (1000 * 60)) / 1000);

    days.textContent = restDay.toString().padStart(2, "0");
    houres.textContent = restHoures.toString().padStart(2, "0");
    minites.textContent = restMinites.toString().padStart(2, "0");
    seconds.textContent = restSeconde.toString().padStart(2, "0");
  }, 1000);
}

timeToEvent();
