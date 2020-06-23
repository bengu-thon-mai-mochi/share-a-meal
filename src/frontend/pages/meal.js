const createReservation = (id) => {
	const fullname = document.querySelector('#fullname').value;
	const phonenumber = document.querySelector('#phonenumber').value;
	const email = document.querySelector('#email').value;

	if (!fullname || !phonenumber || !email) {
		alert('Please enter information details');
	} else {
		postData(`/api/reservation/`, {
			meal_id: id,
			name: fullname,
			email: email,
			phonenumber: phonenumber
		}).then((res) => {
			showResponseMessage(res);
	});
	}
};

const showResponseMessage = (response) => {
	if (response.status === 200) {
		alert('Reservation done!');
	} else {
		alert('A problem had occurred while submitting please try again.');
	}
};

async function postData(url = '', data = {}) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify(data)
	});
	return response;
}

window.handleMealRequest = (params) => {
	fetch(`/api/meals/${params.id}`).then(response => response.json()).then((meals) => {
		const specificMeal = meals
			.filter((meal) => meal.Title)
			.map(
				(meal) =>
					`
        <div>
          <h3>${meal.Title}</h3>
          <div class="meal-info">
            <div>
              When: 
              <datetime>${meal.Reservation_time}</datetime>
            </div>
            <div>
              Where: 
              ${meal.Location}
            </div>
          </div>
          <p>${meal.Description}</p>
        </div>`
			)
			.join('');

		const reservationForm = ` 
        <div class="form">
          Full Name: <input id="fullname" />
          Phone Number: <input id="phonenumber" />
          Email: <input id="email" />
          <button onclick="createReservation(${params.id})"> Make reservation </>
        </div>
    `;
		document.body.innerHTML = `
      <header>
        <h1>Share a Meal!</h1>
        <p>Share home-cooked meals with guests all over the world.</p>
        <a href="/" data-navigo>Home</a>
      </header>
      <main>
        ${specificMeal}
        ${reservationForm} 
      </main>
      <footer> 
        <p>contact us: share-a-meal@gmx.at</p>
      </footer>
      `;
	});
};
