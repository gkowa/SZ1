const calendar = './utils/calendar.json';
const weekendContainer = document.querySelector('.weekend-events');
const restContainer = document.querySelector('.remaining-events');

// Fetching data from database.json
const fetchEvents = async () => {
    weekendContainer.innerHTML = '<div class="loading"></div>';
    try {
      const resp = await fetch(calendar);
      const data = await resp.json();
      return data;
    } catch (error) {
      weekendContainer.innerHTML = '<p class="error">there was an error</p>';
    }
};

const date = new Date();
const monthDay = date.getDate();
const month = date.getMonth() + 1;
const weekday = date.getDay();

// Load events for this weekend
let upcoming;
const fetchWeekend = (calendar) => {
  if(weekday < 6){
    upcoming = calendar.filter((event) => {
        return event.day >= monthDay && event.month >= month;
      });
  }  
  else if(weekday === 6){
    upcoming = calendar.filter((event) => {
        return event.day >= monthDay - 1 && event.month >= month;
      });
  } 
  else {
    upcoming = calendar.filter((event) => {
        return event.day >= monthDay - 2 && event.month >= month;
      });
  }
  const weekend = upcoming.splice(0,2);
  return weekend;
}

// Place the dynamic HTML for this weekend
const displayWeekend = (arr) => {
    const weekendInfo = arr.map((item) => {
        return `<div class="single-event weekend-night">
                    <img src="${item.banner}">
                    <h4 class="event-date">${item.weekday} ${item.day}.${item.month}</h4>
                    <h2>${item.title}</h2>
                    <a class="arrow-anchors" href="single-event.html?id=${item.id}">see more ></a>
                </div>`
    }).join(' ');
    weekendContainer.innerHTML = `${weekendInfo}`;
}

// Load the remaining events
let remaining;
const fetchRest = (calendar) => {
  remaining = calendar.filter((event) => {
      return event.month == month;
    });
  return remaining;
}

// Place the dynamic HTML for the rest of the events
const displayRest = (arr) => {
  const restInfo = arr.map((item) => {
    return `<div class="single-event">
              <h4 class="event-date">${item.weekday} ${item.day}.${item.month}</h4>
              <h2>${item.title}</h2>
              <a class="see-more arrow-anchors" href="single-event.html?id=${item.id}">
              see more ></a>
            </div>`;
  }).join(' ');
  restContainer.innerHTML = `${restInfo}`;

};

// The major function that appends everything dynamically here actually
let data;
const start = async () => {
data = await fetchEvents();
const weekend = fetchWeekend(data);
displayWeekend(weekend);
const remaining = fetchRest(data);
displayRest(remaining);
return data;
};
start();
