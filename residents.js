const url = './utils/database.json';
const container = document.querySelector('.residents-container');

// Fetching data from database.json
const fetchArtists = async () => {
  container.innerHTML = '<div class="loading"></div>';
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    container.innerHTML = '<p class="error">there was an error</p>';
  }
};

// Filtering resident DJs
const residents = (arr) => {
    const lineups = arr.map((item) => {
      return item.lineup;
    });
    const residents = lineups.flat(1).filter((item) => {
      return item.resident === 'true';
    });
    return residents;
}

// Displaying residents' info
const displayResidents = (arr) => {
    
    const residents = arr.map((item) => {
    
    return `<li><a class="artist-img" href="${item.img}" target="_blank"><img src="${item.img}"></a>
    <a class="artist-nick">${item.nickname}</a>
    <div class="artist-info"><p class="small-bio">${item.bio} </p>
    <div class="links">
    <a target="_blank" class="link" href="${item.sc}"><img class="icon"  src="${item.SCicon}" 
    alt="" onerror='this.remove()'></a>
    <a target="_blank" class="link" href="${item.fb}"><img class="fb-icon"  src="${item.FBicon}" 
    alt="" onerror='this.remove()'></a>
    <a target="_blank" class="link" href="${item.ig}"><img class="icon"  src="${item.IGicon}" 
    alt="" onerror='this.remove()'></a>
    <a target="_blank" class="link" href="${item.ra}"><img class="icon"  src="${item.RAicon}" 
    alt="" onerror='this.remove()'></a>
    </div></div>
    </li>`;
  }).join(' ');

  container.innerHTML = `${residents}`;

}

// Inserting everything dynamically in 'residents.html'
const start = async () => {
    const data = await fetchArtists();
    displayResidents(residents(data));    
};
  start();
