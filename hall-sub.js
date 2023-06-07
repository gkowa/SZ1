const artistsDB = './utils/artists.json';
const container = document.querySelector('.hall-artists');
const sectionA = document.querySelector('.first-letter');
const sectionB = document.querySelector('.second-letter');

let thisScopeA;
const fetchArtistsA = async () => {
  try {
    container.innerHTML = '<h4 class="event-loading">Loading... </h4>';
    const params = new URLSearchParams(window.location.search); 
    const id = params.get('id'); 
    const response = await fetch(`${artistsDB}?id=${id}`);
    const data = await response.json();
    thisScopeA = data.filter((artist) => {
      return artist.nickname.charAt(0).toLowerCase() === id.charAt(0);
    });
    return thisScopeA;
    } catch (error) {
    container.innerHTML =
      '<p class="error">There was a problem loading the event data. Please try again later </p>';
    }
};

let thisScopeB;
const fetchArtistsB = async () => {
    try {
      container.innerHTML = '<h4 class="event-loading">Loading... </h4>';
      const params = new URLSearchParams(window.location.search); 
      const id = params.get('id'); 
      const response = await fetch(`${artistsDB}?id=${id}`);
      const data = await response.json();
      thisScopeB = data.filter((artist) => {
        return artist.nickname.charAt(0).toLowerCase() === id.charAt(1);
      });
      return thisScopeB;
      } catch (error) {
      container.innerHTML =
        '<p class="error">There was a problem loading the event data. Please try again later </p>';
      }
};

let thisScopeC;
const fetchArtistsC = async () => {
    try {
      container.innerHTML = '<h4 class="event-loading">Loading... </h4>';
      const params = new URLSearchParams(window.location.search); 
      const id = params.get('id'); 
      const response = await fetch(`${artistsDB}?id=${id}`);
      const data = await response.json();
      thisScopeC = data.filter((artist) => {
        return artist.nickname.charAt(0).toLowerCase() === id.charAt(2);
      });
      return thisScopeC;
      } catch (error) {
      container.innerHTML =
        '<p class="error">There was a problem loading the event data. Please try again later </p>';
      }
};

// const fetchArtists = async () => {
//     container.innerHTML = '<div class="loading"></div>';
//     try {
//       const resp = await fetch(artistsDB);
//       const data = await resp.json();
//       return data;
//     } catch (error) {
//       container.innerHTML = '<p class="error">there was an error</p>';
//     }
// };

// const contentA = (artists) => {
//   const filterA = artists.filter((item) => {
//     return item.nickname.charAt(0) === "A";
//   });
//   return filterA;
// }
// const contentB = (artists) => {
//   const filterB = artists.filter((item) => {
//     return item.nickname.charAt(0) === "B";
//   });
//   return filterB;
// }

const displayArtists = (artists) => {
  const artistsList = artists.map((item) => {

  return `<li>
              <img class="artist-img" src="${item.img}">
              <input class="onclick" type="radio" name="test" value="${item}">
              <div class="flipside">
                
                  <span class="hall-nickname">${item.nickname}</span>
                  <p class="small-bio">${item.bio}</p>
                  <div class="links">
                    <a target="_blank" class="link" href="${item.sc}">
                      <img class="icon"  src="${item.SCicon}" alt="" onerror='this.remove()'>
                    </a>
                    <a target="_blank" class="link" href="${item.fb}">
                      <img class="icon"  src="${item.FBicon}" alt="" onerror='this.remove()'>
                    </a>
                    <a target="_blank" class="link" href="${item.ig}">
                      <img class="icon"  src="${item.IGicon}" alt="" onerror='this.remove()'>
                    </a>
                    <a target="_blank" class="link" href="${item.ra}">
                      <img class="icon"  src="${item.RAicon}" alt="" onerror='this.remove()'>
                    </a>
                  </div>
                
                
              </div>
          </li>`;
  }).join(' ');

  container.innerHTML = `<ul class="hall-results">${artistsList}</ul>`; 
};

let dataA;
let dataB;
let dataC;
const start = async () => {
dataA = await fetchArtistsA();
dataB = await fetchArtistsB();
dataC = await fetchArtistsC();
const result = dataA.concat(dataB).concat(dataC);
displayArtists(result);
return result;

};
start();
// const artistsList = lineup.map((item) => {
    
//     return `<li><a class="artist-img" href="${item.img}" target="_blank"><img src="${item.img}"></a>
//     <a class="artist-nick">${item.nickname}</a>
//     <div class="artist-info"><p class="small-bio">${item.bio} </p>
//     <div class="links">
//     <a target="_blank" class="link" href="${item.sc}"><img class="icon"  src="${item.SCicon}" 
//     alt="" onerror='this.remove()'></a>
//     <a target="_blank" class="link" href="${item.fb}"><img class="fb-icon"  src="${item.FBicon}" 
//     alt="" onerror='this.remove()'></a>
//     <a target="_blank" class="link" href="${item.ig}"><img class="icon"  src="${item.IGicon}" 
//     alt="" onerror='this.remove()'></a>
//     <a target="_blank" class="link" href="${item.ra}"><img class="icon"  src="${item.RAicon}" 
//     alt="" onerror='this.remove()'></a>
//     </div></div>
//     </li>`;
//   }).join(' ');