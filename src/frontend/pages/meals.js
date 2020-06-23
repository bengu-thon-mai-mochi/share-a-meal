const createMeal = () => {
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const location = document.querySelector('#location').value;
  const reservation_time = document.querySelector('#reservation_time').value;
  const max_reservation = document.querySelector('#max_reservation').value;
  const price = document.querySelector('#price').value;

  const created_date= Date.now()

  if(!title || !description  || !location || !reservation_time  || !max_reservation || !price){
    alert('Please enter information details')
  } else {
    postData(`/api/meals`, {
      'title': title,
      'description': description,
      'location': location,
      'reservation_time': reservation_time,
      'max_reservation': max_reservation,
      'price': price,
      'created_date': created_date
    })
      .then(res => showResMessage(res))
      .catch(err => console.log(err))
  }
};

const showResMessage = (res) => {
  if(res.status === 200){
    alert('Meal is created!');
  } else {
    alert('A problem had occurred while submitting please try again.');
  }
}

async function postData(url = '', data = {}){
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response;
};

window.handleMealsRequest = () => {
  const mealForm = ` 
    <div class="form">
      Title: <input id="title" />
      Description : <input id="description" />
      Location: <input id="location" />
      Meal starts at: <input id="reservation_time" />
      Maximum guests: <input id="max_reservation" />
      Price per meal: <input id="price" />
      <button onclick="createMeal()"> Create Meal </>
    </div>
  `
  fetch("/api/meals")
    .then(response => response.json())
    .then(meals => {
      const allMeals = meals.filter(meal => meal.Title).map(meal => 
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
          <a href="meal/${meal.Id}" data-navigo>Make a reservation</a>
        </div>`).join('')

      document.body.innerHTML = `
      <header>
          <h1>Share a Meal!</h1>
          <p>Share home-cooked meals with guests all over the world.</p>
          <a href="/" data-navigo>Home</a>
      </header>
      <main>
        ${mealForm}
        ${allMeals}
      </main>
      <footer> 
        <p>contact us: share-a-meal@gmx.at</p>
      </footer>
      `
  })
};

