
const loadAllData = async() =>{
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.categories);
    displayAllData(data.categories);
    displayCategoryData(data.categories);
}
const displayAllData = (items) =>{
    const displayDataContainer = document.getElementById('display-container');
    displayDataContainer.innerHTML = '';
    items.forEach((item) => {
        const {idCategory,strCategoryThumb,strCategory,strCategoryDescription} = item;
         const divEl = document.createElement('div');
         const maxLength = 200;
         const fullValue = strCategoryDescription;
         
         divEl.innerHTML =`
            <div class="hero shadow-sm border-2 rounded-md">
               <div class="hero-content flex-col lg:py-0 lg:pl-0 lg:flex-row">
                  <img
                    src=${strCategoryThumb}
                    class="max-w-sm rounded-lg lg:w-[230px] lg:h-[300px] border-2 p-2 object-cover" />
                  <div class="p-[6px]">
                      <h1 class="text-2xl font-bold">${strCategory}</h1>
                      <p class="py-4">${fullValue.length > maxLength ? fullValue.substring(0, maxLength)+'......' : fullValue}</p>
                      <button onclick="showDetailById('${idCategory}')"><a class="underline text-[#FFC107] font-bold">View Details</a></button>
                  </div>
               </div>
           </div>
         `
         displayDataContainer.append(divEl);
    });
}
const displayCategoryData = (items) =>{
    const categoryBtnContainer = document.getElementById('category-btn-container');
    items.forEach((item)=>{
        const {strCategory} = item;
        const divEl = document.createElement('div');
        divEl.innerHTML = `
          <button id="btn-${strCategory}" onclick="loadDataByCategory('${strCategory}')"
           class="btn border-2 shadow-sm w-28 px-3 lg:font-bold category-btn">${strCategory}</button>
        `
        categoryBtnContainer.append(divEl);
    })
}
const removeActiveBtn = () =>{
    const categoryBtn = document.getElementsByClassName('category-btn');
    for(let btn of categoryBtn){
        btn.classList.remove('bg-green-300','rounded-full');
    }
}
const loadDataByCategory = async(category) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`;
    const res = await fetch(url);
    const data = await res.json();
    removeActiveBtn();
    const activeBtn = document.getElementById(`btn-${category}`);
    activeBtn.classList.add('bg-green-300','rounded-full');
    displayDataByCategory(data.meals);
}
const displayDataByCategory = (data) =>{
    const displayDataContainer = document.getElementById('display-container');
    displayDataContainer.innerHTML = '';
    data.forEach((data)=>{
        const {strMeal,strMealThumb,strIngredient1,strIngredient2,strIngredient3,
            strIngredient4,strIngredient5,strIngredient6,strIngredient7,strIngredient8,
            strIngredient9,strIngredient10,strIngredient11} = data;
         const divEl = document.createElement('div');
        //  const maxLength = 200;
        //  const fullValue = strCategoryDescription;
         
         divEl.innerHTML =`
            <div class="hero shadow-sm border-2 rounded-md">
               <div class="hero-content flex-col lg:py-0 lg:pl-0 lg:flex-row lg:justify-between">
                  <img
                    src=${strMealThumb}
                    class="max-w-sm rounded-lg lg:w-[230px] border-2 p-2 lg:h-[300px] object-cover" />
                  <div class="p-[6px]">
                      <h1 class="text-2xl font-bold">Title: ${strMeal}</h1>
                      <p class="py-4"><span class="font-bold">Ingradiant:</span>
                       ${strIngredient1},${strIngredient2},${strIngredient3},${strIngredient4},${strIngredient5},
                       ${strIngredient6},${strIngredient7},${strIngredient8},${strIngredient9},${strIngredient10}</p>
                      <button ><a class="underline text-[#FFC107] font-bold">View Details</a></button>
                  </div>
               </div>
           </div>
         `
         displayDataContainer.append(divEl);
    })
}
// search functionality start here
const loadDataBySearchInput = async(searchText='') =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDataByCategory(data.meals);
}

document.getElementById('searchBtn').addEventListener('click',()=>{
    const searchInput = document.getElementById('searchInput').value;
    loadDataBySearchInput(searchInput);
    document.getElementById('searchInput').value = '';
})

loadAllData();