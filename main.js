
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let img = document.getElementById('img');
let imageData = '';


img.onchange = function () {
    let file = img.files[0];

    let reader = new FileReader();

    reader.onload = function () {
        imageData = reader.result;
    }

    reader.readAsDataURL(file);
}

// get total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }else{
        total.innerHTML = '';
        total.style.background = 'red';
    }
}

// create product
let dataProduct;
if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product)
}else{
    dataProduct = [];
}

submit.onclick = function(){
    let newProduct = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
        img: imageData,
    }

    if(newProduct.count > 1)
        {
            for(let i = 0; i < newProduct.count; i++){
                dataProduct.push(newProduct);
            }
        }else{
            dataProduct.push(newProduct);
        }


    
    localStorage.setItem('product', JSON.stringify(dataProduct));
    // console.log(newProduct);
    clearData();
    newData();
}

// clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read
function displayDate(){
    let table = '';
    for(let i = 0; i < dataProduct.length; i++){
        table += `
        <tbody id="tbody">
                <tr>
                    <td>${i + 1}</td>
                    <td> ${dataProduct[i].title} </td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td>
                     <img src="${dataProduct[i].img}" width="70" height="70" style="object-fit:cover;border-radius:8px;">
                    </td>
                    <td><button id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
            </tbody>
        `
    }
     document.getElementById('tbody').innerHTML = table;
     let btnDelete = document.getElementById('deleteAll');
     if(dataProduct.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()" >delete All</button>
        `
     }else{
        btnDelete.innerHTML = '';
     }

}
displayDate()

// delete

function deleteData(i)
{
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    displayDate()
}

function deleteAll(){
    localStorage.removeItem('product');
    dataProduct.splice(0)
    displayDate()
}
function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle')
    {
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }
    else
    {
        searchMood = 'Category';
        search.placeholder = 'Search By Categroy';
    }
    search.focus();
}

function searchData(value)
{
    if(searchMood == 'title')
    {
        for(let i = 0; i < dataProduct.length; i++)
        {
            if(dataProduct[i].title.includes(value))
            {
                console.log(i);
            }
        }
    }
}


