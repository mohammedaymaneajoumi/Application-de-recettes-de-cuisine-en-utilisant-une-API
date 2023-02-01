let urlcategories = "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
let urlArea = "https://www.themealdb.com/api/json/v1/1/list.php?a=list"

let selectCategorie= document.getElementById("selectCategorie")
let selectArea= document.getElementById("selectArea")
let filterBtn = document.getElementById("filter")



fetch(urlcategories)
.then((response) => response.json())
.then((data)=>{
    let myCategorie = data.meals
    //    console.log(myCategorie)
    for (let i in myCategorie){
        let option = document.createElement("option")
        option.innerText = `${myCategorie[i].strCategory}`
        option.setAttribute("value", `${myCategorie[i].strCategory}`)
        selectCategorie.appendChild(option)
    }
    
    
})
fetch(urlArea)
.then((response) => response.json())
.then((data)=>{
    let myArea = data.meals
    // console.log(myArea)
    for (let i in myArea){
        let option = document.createElement("option")
        option.innerText = `${myArea[i].strArea}`
        option.setAttribute("value", `${myArea[i].strArea}`)
        selectArea.appendChild(option)
    }
    
    
})


filterBtn.addEventListener("click", function(){
    let CategorySelected = document.getElementById("selectCategorie").value    
    let AreaSelected = document.getElementById("selectArea").value
    if(CategorySelected!== "null" && AreaSelected !== "null"){
        filterCategoryAndArea(CategorySelected, AreaSelected)
    }else if(CategorySelected !== "null"){
        filterCategory(CategorySelected)
    }else if(AreaSelected !== "null"){
        filterArea(AreaSelected)
    }
})






// filter by category

function filterCategory(){
    let CategorySelected = document.getElementById("selectCategorie").value
    let cart = document.getElementById("cart")
    let urlFilterCategorie = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${CategorySelected}`

    
    fetch(urlFilterCategorie)
    .then((response) => response.json())
    .then((data)=>{
       
        //to delete the old filter 
        if(CategorySelected == "null"){
            dataFilter = ""
            
        }else{
            dataFilter = data.meals.filter(meal => meal.strMeal.toLowerCase())
        }
        console.log(CategorySelected)
        console.log(dataFilter)
        cart.innerHTML = ""
        
        for(let i in dataFilter){
            
            cart.innerHTML+= `
            <div class="cart col-sm-12 col-md-4 col-lg-4"  >
            <div class="card" style="width: 18rem;" >
                <img class="card-img-top" src=" ${dataFilter[i].strMealThumb}" >
                <div class="card-body">
                <h5 class="card-title">${dataFilter[i].strMeal}</h5>
               
                </div>
            </div>
            </div>
         
           
            `
        } 

       
    })
    
    
}


//filter by Area

function filterArea(){
    let AreaSelected = document.getElementById("selectArea").value
    let cart = document.getElementById("cart")
    let urlFilterArea = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${AreaSelected}`

    
    fetch(urlFilterArea)
    .then((response) => response.json())
    .then((data)=>{
       
        //to delete the old filter 
        if(AreaSelected == "null"){
            dataFilter = ""
            
        }else{
            dataFilter = data.meals.filter(meal => meal.strMeal.toLowerCase())
        }
        
        cart.innerHTML = ""

        for(let i in dataFilter){
            
            cart.innerHTML+= `
            <div class="cart col-sm-12 col-md-4 col-lg-4"  >
            <div class="card" style="width: 18rem;" >
                <img class="card-img-top" src=" ${dataFilter[i].strMealThumb}" >
                <div class="card-body">
                <h5 class="card-title">${dataFilter[i].strMeal}</h5>
               
                </div>
            </div>
            </div>
         

            `
        } 

       
    })
    
    
}
async function filterCategoryAndArea(CategorySelected, AreaSelected) {
    let cart = document.getElementById("cart");
    let urlFilterCategorie = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${CategorySelected}`;
    let urlFilterArea = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${AreaSelected}`;
    let dataFilterCategorie = await fetch(urlFilterCategorie)
      .then((response) => response.json())
      .then((data) => data.meals);
  
    let dataFilterArea = await fetch(urlFilterArea)
      .then((response) => response.json())
      .then((data) => data.meals);
  
    let meals = dataFilterCategorie.filter((meal) =>
      dataFilterArea.some((m) => m.idMeal === meal.idMeal)
    );
    cart.innerHTML = "";
    for (let i in meals) {
      cart.innerHTML += `
          <div class="cart col-sm-12 col-md-4 col-lg-4"  >
          <div class="card" style="width: 18rem;" >
              <img class="card-img-top" src=" ${meals[i].strMealThumb}" >
              <div class="card-body">
              <h5 class="card-title">${meals[i].strMeal}</h5>
              </div>
          </div>
          </div>
          `;
    }
  }
  