let foodMenu = document.getElementById("foodMenu");

// get meals for home page
async function getHomePageMenu() {
  let res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let homePageData = await res.json();
  showData(homePageData.meals);
}

// funciton to show array of meals on foodMenu
async function showData(data) {
  let cartoona = "";
  for (let i = 0; i < data.length; i++) {
    cartoona += `
      <div class="col-md-3">
              <div onclick="getMeal('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${data[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${data[i].strMeal}</h3>
                  </div>
              </div>
      </div>
      `;
  }

  foodMenu.innerHTML = cartoona;
}

// fetch meal data using mealId
async function getMeal(mealDataId) {
  let mealData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealDataId}`
  );
  mealData = await mealData.json();
  mealData = mealData.meals[0];
  showMealData(mealData);
}

// show meal data on the foodMenu
async function showMealData(mealData) {
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (mealData[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        mealData[`strMeasure${i}`]
      } ${mealData[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = mealData.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
      <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartoona = `
          <div class="col-md-4">
          <img class="w-100 rounded-3" src="${mealData.strMealThumb}" alt="">
                  <h2>${mealData.strMeal}</h2>
          </div>
          <div class="col-md-8">
              <h2>Instructions</h2>
              <p>${mealData.strInstructions}</p>
              <h3><span class="fw-bolder">Area : </span>${mealData.strArea}</h3>
              <h3><span class="fw-bolder">Category : </span>${mealData.strCategory}</h3>
              <h3>Recipes :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${ingredients}
              </ul>

              <h3>Tags :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${tagsStr}
              </ul>

              <a target="_blank" href="${mealData.strSource}" class="btn btn-success">Source</a>
              <a target="_blank" href="${mealData.strYoutube}" class="btn btn-danger">Youtube</a>
          </div>`;

  foodMenu.innerHTML = cartoona;
}

// start category logic
async function getCategoriesPageMenu() {
  let res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let categoriesData = await res.json();
  showCategoriesData(categoriesData.categories);
}

async function showCategoriesData(data) {
  let cartoona = "";
  for (let i = 0; i < data.length; i++) {
    cartoona += `
      <div class="col-md-3">
              <div onclick="getCategory('${data[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${data[i].strCategoryThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${data[i].strCategory}</h3>
                      <p>${data[i].strCategoryDescription}</p>
                  </div>
              </div>
      </div>
      `;
  }

  foodMenu.innerHTML = cartoona;
}

async function getCategory(name) {
  let MealsCategoriesData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
  );
  MealsCategoriesData = await MealsCategoriesData.json();
  showData(MealsCategoriesData.meals);
}
// end category logic

// start area logic
async function getAreasPageMenu() {
  let allAreas = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  allAreas = await allAreas.json();
  showAreasPageMenu(allAreas.meals);
}

async function showAreasPageMenu(data) {
  let cartoona = "";
  for (let i = 0; i < data.length; i++) {
    cartoona += `
      <div class="col-md-3">
        <div onclick="getMealsByArea('${data[i].strArea}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>  
            <h3>${data[i].strArea}</h3>
          </div>
      </div>
      `;
  }

  foodMenu.innerHTML = cartoona;
}

async function getMealsByArea(area) {
  let MealsAreaData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  MealsAreaData = await MealsAreaData.json();
  showData(MealsAreaData.meals);
}
// end area logic

// start ingredients logic
async function getIngredientsPageMenu() {
  let allAreas = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  allAreas = await allAreas.json();
  showIngredientsPageMenu(allAreas.meals.slice(0, 25));
}

async function showIngredientsPageMenu(data) {

  let cartoona = "";
  for (let i = 0; i < data.length; i++) {
    cartoona += `
      <div class="col-md-3">
        <div onclick="getMealsByIngredients('${data[i].strIngredient}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${data[i].strIngredient}</h3>
            <p>${data[i].strDescription}</p>
          </div>
      </div>
      `;
  }

  foodMenu.innerHTML = cartoona;
}

async function getMealsByIngredients(ingredients) {
  let MealsAreaData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  MealsAreaData = await MealsAreaData.json();
  showData(MealsAreaData.meals);
}
// end ingredients logic

getHomePageMenu();