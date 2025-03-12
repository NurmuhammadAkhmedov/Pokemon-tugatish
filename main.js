import pokemons  from "./pokemons.js";

let productList = document.querySelector(".product_list");
const formElement = document.querySelector("#form");
const nameInput = document.querySelector("#name");
const pokemonSelect = document.querySelector("#pokemon");
const sortedElement = document.querySelector("#sorted");
const searchBtn = document.querySelector("#search");

function showProduct(arr) {
    productList.innerHTML = arr.map(item => `
        <li class="product_item">
            <div class="tartib">${item.num}</div>
            <h2 class="name">${item.name}</h2>
            <img src="${item.img}" alt="" class="product_img">
            <div class="tip">${item.type.join(" ")}</div>
            <h3 class="count">${item.candy_count || "N/A"}</h3>
            <h3 class="weight">${item.weight}</h3>
            <h3 class="fire">${item.weaknesses.join(" ")}</h3>
            <div class="time">${item.spawn_time || "Unknown"}</div>
        </li>
    `).join("");
}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let filteredArr = pokemons.filter(item =>
        item.name.toLowerCase().includes(nameInput.value.trim().toLowerCase())
    );
    showProduct(filteredArr);
});

nameInput.addEventListener("input", (e) => {
    if (e.target.value === "") {
        showProduct(pokemons);
    }
});

function fillOption() {
    let arr = new Set();
    pokemons.forEach(item => item.weaknesses.forEach(weakness => arr.add(weakness)));
    
    const uniqueArr = ["all", ...arr];
    pokemonSelect.innerHTML = uniqueArr.map(item => `<option value="${item}">${item}</option>`).join("");
}

pokemonSelect.addEventListener("change", (e) => {   
    if (e.target.value === "all") {
        showProduct(pokemons);
    } else {
        let filteredType = pokemons.filter(item => item.weaknesses.includes(e.target.value));
        showProduct(filteredType);
    }
});

sortedElement.addEventListener("change", (e) => {
    let sortedPokemons = [...pokemons];
    
    if (e.target.value === "az") {
        sortedPokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (e.target.value === "za") {
        sortedPokemons.sort((a, b) => b.name.localeCompare(a.name));
    } else if (e.target.value === "fromweight") {
        sortedPokemons.sort((a, b) => parseFloat(a.weight.replace(" kg", "")) - parseFloat(b.weight.replace(" kg", "")));
    } else if (e.target.value === "tomweight") {
        sortedPokemons.sort((a, b) => parseFloat(b.weight.replace(" kg", "")) - parseFloat(a.weight.replace(" kg", "")));
    }
    showProduct(sortedPokemons);
});

fillOption();
showProduct(pokemons);