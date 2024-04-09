const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 1154
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <div class="flip-card ">
    <div class="flip-card-inner ">
        <div class="flip-card-front">
        <a href="https://pokemon.fandom.com/wiki/${pokemon.name}" target="_blank" style="text-decoration:none;"><li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

                    <img src="${pokemon.frontphoto}"
                        alt="${pokemon.name}">
                </div>
            </li></a>
        </div>
        <div class="flip-card-back">
        <a href="https://pokemon.fandom.com/wiki/${pokemon.name}" target="_blank" style="text-decoration:none;"><li class="pokemon ${pokemon.type}">
                <span class="habi">Habilidades</span>
                ${pokemon.abilities.map((ability) => `<span class="ability">${ability}</span>`).join('')}
                
                <div class="back">
                    <div>
                    <ol class="stats">
                    <span class="habi">Base stats:</span>
                        <li class="stat">HP: ${pokemon.hp}</li>
                        <li class="stat">Atk: ${pokemon.atk}</li>
                        <li class="stat">Def: ${pokemon.def}</li>
                        <li class="stat">SP Atk: ${pokemon.sp_atk}</li>
                        <li class="stat">SP Def: ${pokemon.sp_def}</li>
                        <li class="stat">Speed: ${pokemon.speed}</li>
                    </ol>
                    </div>
                    
                    
                        <img src="${pokemon.backphoto}"
                        alt="${pokemon.name}">
                    
                    
                </div>
                
            </li></a>
        </div>
    </div>
</div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
