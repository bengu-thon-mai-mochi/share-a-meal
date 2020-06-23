const searchSpecificMeal = event => {
	const searchedTitle = this.event.target.value;
	fetch(`/api/meals?title=${searchedTitle}`)
		.then(response => response.json())
		.then(meals => renderMeals(meals))
		.catch(err => console.log("i am searchspecific meals error", err));
};

const fetchAllMeals = () => {
	fetch('/api/meals')
		.then(response => response.json())
		.then(meals => renderMeals(meals))
		.catch(err => console.log("i am fetch all meals error", err));
};

const renderMeals = meals => {
  document.getElementById('meals').innerHTML = meals
    .filter((meal) => meal.Title)
    .map(
      (meal) =>
        `
      <div>
        <h3>${meal.Title}</h3>
        <div class="meal-info">
            When: 
            <datetime>${meal.Reservation_time}</datetime>
            Where: 
            ${meal.Location}
        </div>
        <div>
          <p class="meal-description">${meal.Description}</p>
        </div>
      </div>`
    )
    .join('')
}

window.handleHomeRequest = () => {
  document.body.innerHTML = `
    <header>
      <h1>Share a Meal!</h1>
      <p>Share home-cooked meals with guests all over the world.</p>
      <div class="search-bar">
        <label for="search-bar"> Search for meals </label>
        <input type="text" id="search-bar" onkeyup="searchSpecificMeal(this)" />
      </div>
      <a href="meals" data-navigo>Browse all and reserve your seat.</a>
    </header>
    <main id="meals">
    </main>
    <footer>  
      <p>contact us: share-a-meal@gmx.at</p>
    </footer>
    `;
  fetchAllMeals();
  router.updatePageLinks();
};
// if any links are added to the dom, use this function
// make the router handle those links.
