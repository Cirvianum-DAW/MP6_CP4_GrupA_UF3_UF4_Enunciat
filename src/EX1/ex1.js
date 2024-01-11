const characterList = document.getElementById('character-list');
const sortSelect = document.getElementById('sort');

// Funció genèrica per obtenir dades d'una API amb gestió d'errors
async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Funció per obtenir els personatges i mostrar informació bàsica del personatge
// birth_year, eye_color, hair_color, height, gender,

// And also get the homeworld and species of each character

async function getCharacters() {
  const characters = await getData('https://swapi.info/api/people');
  const charactersWithHomeworld = await Promise.all(
    characters.map(async (character) => {
      const homeworld = await getData(character.homeworld);
      return { ...character, homeworld: homeworld.name };
    })
  );
  const charactersWithSpecies = await Promise.all(
    charactersWithHomeworld.map(async (character) => {
      let species = await getData(character.species);
      if (!species) {
        species = { name: 'Not specified' };
      }
      return { ...character, species: species.name };
    })
  );
  const charactersWithStarships = await Promise.all(
    charactersWithSpecies.map(async (character) => {
      const starships = await Promise.all(
        character.starships.map(async (starship) => {
          const starshipData = await getData(starship);
          return starshipData;
        })
      );
      return { ...character, starships };
    })
  );
  return charactersWithStarships;
}

// Funció per mostrar els personatges
function displayCharacters(characters) {
  console.log(characters);
  characterList.innerHTML = '';
  for (const character of characters) {
    const div = document.createElement('div');
    div.className = 'bg-white p-4 mb-4 rounded shadow';

    const name = document.createElement('h2');
    name.className = 'text-xl font-bold mb-2';
    name.textContent = character.name;
    div.appendChild(name);

    const eyeColor = document.createElement('p');
    eyeColor.className = 'text-gray-700';
    eyeColor.textContent = `Eye color: ${character.eye_color}`;
    div.appendChild(eyeColor);

    const hairColor = document.createElement('p');
    hairColor.className = 'text-gray-700';
    hairColor.textContent = `Hair color: ${character.hair_color}`;
    div.appendChild(hairColor);

    const height = document.createElement('p');
    height.className = 'text-gray-700';
    height.textContent = `Height: ${character.height}`;
    div.appendChild(height);

    const gender = document.createElement('p');
    gender.className = 'text-gray-700';
    gender.textContent = `Gender: ${character.gender}`;
    div.appendChild(gender);

    const species = document.createElement('p');
    species.className = 'text-red-500';
    species.textContent = `Species: ${character.species}`;
    div.appendChild(species);

    const homeworld = document.createElement('p');
    homeworld.className = 'text-red-500';
    homeworld.textContent = `Homeworld: ${character.homeworld}`;
    div.appendChild(homeworld);

    characterList.appendChild(div);
  }
}

// Funció per ordenar els personatges
function sortCharacters(characters, criteria) {
  console.log(criteria);
  return characters.sort((a, b) => a[criteria].localeCompare(b[criteria]));
}

// Quan la pàgina es carrega, obtenim els personatges i els mostrem
window.addEventListener('DOMContentLoaded', async () => {
  let characters = await getCharacters();
  displayCharacters(characters);

  // Quan l'usuari selecciona un criteri d'ordenació, ordenem i mostrem els personatges
  sortSelect.addEventListener('change', () => {
    characters = sortCharacters(characters, sortSelect.value);
    displayCharacters(characters);
  });
});
