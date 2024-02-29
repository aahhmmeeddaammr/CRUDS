let price=document.getElementById('price');
let tax=document.getElementById('tax');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let totale= document.getElementById('smal');
let count= document.getElementById('count');
let category = document.getElementById('category');
let submit= document.getElementById('create');
let title=document.getElementById('prti');
let tbody=document.getElementById('tbody');
let updatesearch=document.getElementById('Update_By_Titl');
let tmp;
let mood='create';

function getTotale(){
     if(price.value !='' && +price.value>0){
          totale.style.backgroundColor='green'
          totale.innerHTML= (+price.value + +tax.value + +ads.value)-discount.value;
     }else{
          totale.style.backgroundColor=' rgb(7, 7, 37)';
          totale.innerHTML='';
     }
}
//create
let dataOfP;
if(localStorage.product !=null){
     dataOfP=JSON.parse(localStorage.product);
}else{
     dataOfP=[];
}
submit.onclick=function(){
     let newProduct = {
          title:title.value,
          price:price.value,
          tax:tax.value,
          ads:ads.value,
          discount:discount.value,
          totale:totale.innerHTML,
          count:count.value,
          category:category.value
     }
     //cleardata
     function cleardata(){
          price.value = '';
          title.value = '';
          tax.value = '';
          discount.value = '';
          ads.value = '';
          totale.innerHTML = '';
          count.value = '';
          category.value = '';
     }
     cleardata();
     if(mood=='create'){
          if(+newProduct.count > 1){
               for (let i = 0; i < +newProduct.count; i++) {
                    dataOfP.push(newProduct);
               }
          }else{
               dataOfP.push(newProduct);
          }
     }else{
          if(mood=='updatebytitle'){
               for(let i=0 ; i<dataOfP.length ; i++){
                    if(dataOfP[i].title === document.getElementById('Update_By_Title').value){
                         dataOfP[i]=newProduct;
                    }
               }
               document.getElementById('Update_By_Title').value='';
          }else{
             dataOfP[tmp]=newProduct;  
          }
          mood='create';
          submit.innerHTML='create';
          count.style.display='block';
     }
     localStorage.setItem('product', JSON.stringify(dataOfP));
     show_data();
}
function show_data(){
     let table='';
     for (let i = 0; i <dataOfP.length; i++) {
          if( dataOfP[i].title != '' && dataOfP[i].price != '' && dataOfP[i].category !=''){
               table += `
               <tr>
                    <td>${i}</td>
                    <td>${dataOfP[i].title}</td>
                    <td>${dataOfP[i].price}</td>
                    <td>${dataOfP[i].tax}</td>
                    <td>${dataOfP[i].ads}</td>
                    <td>${dataOfP[i].discount}</td>
                    <td>${dataOfP[i].totale}</td>
                    <td>${dataOfP[i].category}</td>
                    <td><button onclick="update(${i})" class=" btn btn-success" type="button">update</button></td>
                    <td><button onclick="deleteEl(${i})" class=" btn btn-danger" type="button">delete</button></td>
               </tr>
          `;
          }else{
               dataOfP.splice(i,1);
               localStorage.product=JSON.stringify(dataOfP);
          }         
     }
     tbody.innerHTML = table;
     let dbtn=document.getElementById('delb');
     if(dataOfP.length>0){
          dbtn.innerHTML=`
          <button onclick="deleteAll()" class=" btn-danger btn fs-4" type="button">Delete All(${dataOfP.length})</button>
          `;
     }else{
          dbtn.innerHTML='';
     }
}
function deleteEl(i){
     dataOfP.splice(i,1);
     localStorage.product=JSON.stringify(dataOfP);
     show_data();
}
function deleteAll(){
     localStorage.clear();
     dataOfP.splice(0);
     show_data();
}
function update(i){
     tmp=i;
     title.value=dataOfP[i].title;
     price.value=dataOfP[i].price;
     ads.value=dataOfP[i].ads;
     tax.value=dataOfP[i].tax;
     discount.value=dataOfP[i].discount;
     category.value=dataOfP[i].category;
     getTotale();
     count.style.display='none';
     submit.innerHTML='update';
     mood='update';
     scroll({
          top:0,
          behavior:"smooth"
     })
}
let searchm='';
function searchmood(id){
     if(id=='btn1'){
          searchm='title';
          document.getElementById('search').placeholder='search By Title';

     }else{
          searchm='category';
          document.getElementById('search').placeholder='search By Category';
     }
     document.getElementById('search').focus();
     show_data();
}
function searchindata(value){
     let table='';
     if(searchm=='title'){
          for (let i = 0; i <dataOfP.length; i++) {
               if(dataOfP[i].title.includes(value)){
                    table += `
                    <tr>
                         <td>${i}</td>
                         <td>${dataOfP[i].title}</td>
                         <td>${dataOfP[i].price}</td>
                         <td>${dataOfP[i].tax}</td>
                         <td>${dataOfP[i].ads}</td>
                         <td>${dataOfP[i].discount}</td>
                         <td>${dataOfP[i].totale}</td>
                         <td>${dataOfP[i].category}</td>
                         <td><button type="button">update</button></td>
                         <td><button onclick="deleteEl(${i})" type="button">delete</button></td>
                    </tr>
               `;
               }         
          }
     }else{
          for (let i = 0; i <dataOfP.length; i++) {
               if(dataOfP[i].category.includes(value)){
                    table += `
                    <tr>
                         <td>${i}</td>
                         <td>${dataOfP[i].title}</td>
                         <td>${dataOfP[i].price}</td>
                         <td>${dataOfP[i].tax}</td>
                         <td>${dataOfP[i].ads}</td>
                         <td>${dataOfP[i].discount}</td>
                         <td>${dataOfP[i].totale}</td>
                         <td>${dataOfP[i].category}</td>
                         <td><button type="button">update</button></td>
                         <td><button onclick="deleteEl(${i})" type="button">delete</button></td>
                    </tr>
               `;
               }         
          }
     }
     tbody.innerHTML = table;
}
function Update_By_Title(){
     mood='updatebytitle';
     if(document.getElementById('Update_By_Title').value!=''){
          console.log(document.getElementById('Update_By_Title').value);
          for(let i=0;i<dataOfP.length;i++){
               if(dataOfP[i].title==document.getElementById('Update_By_Title').value){
                    title.value=dataOfP[i].title;
                    price.value=dataOfP[i].price;
                    ads.value=dataOfP[i].ads;
                    tax.value=dataOfP[i].tax;
                    discount.value=dataOfP[i].discount;
                    category.value=dataOfP[i].category;
                    getTotale();
                    count.style.display='none';
                    submit.innerHTML='update';
                    scroll({
                         top:0,
                         behavior:"smooth"
                    })
                    break;
               }
          }
     }
}
show_data();