
let myStore = [
    {
        'name': 'Desktop',
        'component':[
            {'name': 'Alienware Aurora',
             'description':'1 TB,Intel Core i7 11th Gen', 
             'quantity': 15
            },

             {'name': 'Acer Veriton',
              'description':'Intel i3-3220 CPU 4Gb RAM 500GB HDD', 
             'quantity': 0
            },
             
           {'name': 'Dell Quad',
            'description':'Core i5 16GB 3TB SSD', 
             'quantity': 25
            }

        ]
        
    },

    {
        'name': 'Laptop',
        'component':[
            {'name': 'Dell Latitude E6540',
             'description':'Intel Core i5-4310M 2.70GHz', 
             'quantity': 0
            },

             {'name': 'HP Probook 650 G1',
              'description':'Intel i3-3220 CPU 4Gb RAM 500GB HDD', 
             'quantity': 3
            },
             
           {'name': 'Dell Inspiron 15-7579',
            'description':'FHD Touch i7-7500U 2.7GHz', 
             'quantity': 30
            }

        ]
        
    },    
    {
        'name': 'Tablet',
        'component':[
            {'name': 'Samsung SM-T550',
             'description':'Wi-Fi Only Titanium Gray 16GB', 
             'quantity': 0
            },

             {'name': 'Samsung SM-T550',
              'description':'Wi-Fi Only Titanium Gray 16GB', 
             'quantity': 18
            },
             
           {'name': 'Amazon Fire HD 10',
            'description':'All-in-One Copier Scanner MG2522', 
             'quantity': 40
            }

        ]
        
    },    
    {
        'name': 'Printer',
        'component':[
            {'name': 'Canon Color Printer',
             'description':'All-in-One Copier Scanner MG2522', 
             'quantity': 31
            },

             {'name': 'BEEPRT Bluetooth BY426',
              'description':'4x6 High Speed Shipping Label', 
             'quantity': 0
            },
             
           {'name': 'HP OfficeJet Pro 6978',
            'description':'All-In-One Printer', 
             'quantity': 20
            }

        ]
        
    }    
      
];
localStorage.setItem('myStore', JSON.stringify(myStore));
const tableData = JSON.parse(localStorage.getItem('myStore'));
const addItemBtn = document.querySelector(".btn-add");
const cancelAddItemBtn = document.querySelector(".btn-cancel");

function updateCategory (){
    localStorage.setItem('myStore', JSON.stringify(myStore));
    let itemCategory = document.getElementsByClassName("category-name");
    for ( i = 0; i < itemCategory.length; i++) {
            if(itemCategory[i].getElementsByTagName('a')[0].innerHTML == 'Dashboard'){
                itemCategory[i].style.backgroundColor = "#02244b";
                itemCategory[i].getElementsByTagName('items')[0].style.display = "block";
             }
             else{
                itemCategory[i].getElementsByTagName('items')[0].style.display = "none";
             }
    }
    document.getElementById('main-body').setAttribute('src','dashboard.html')
}
    

function displayData () {
    let id= 1;
    var table =  document.getElementById("store");
    for (i = 0; i < tableData.length; i++) {
       for (j = 0; j < tableData[i]['component'].length; j++) {

        let row = table.insertRow();
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();
        let cell3 = row.insertCell();
        let cell4 = row.insertCell();
        let cell5 = row.insertCell();
        let cell6 = row.insertCell();
        
        
        cell1.innerHTML = id++;
        cell2.innerHTML = tableData[i]['component'][j]['name'];
        cell3.innerHTML = tableData[i]['component'][j]['description'];
        cell4.innerHTML = tableData[i]['name'];
        cell5.innerHTML = tableData[i]['component'][j]['quantity'];
        

        if(parseInt(cell5.innerHTML) === 0){
            cell6.style.backgroundColor = '#BD2000';
            cell6.textContent= "Out of Stock"
        }
        else if(parseInt(cell5.innerHTML) >= 1 && cell5.innerHTML<=20){
            cell6.style.backgroundColor = '#FA9905';
            cell6.textContent= "Almost out of Stock"
        }
        else {
            cell6.style.backgroundColor = '#29BB89';
            cell6.textContent= "In Stock"
        }
       }
       
    }
    updateCategory ();

    let quantityCheck = document.getElementsByClassName("quantity-number");
    var quantity = 0;
    for (i = 0; i < quantityCheck.length; i++) {
        quantityCheck[i].getElementsByTagName('p')[0].innerHTML= tableData[i]['name'];
        for (j = 0; j < tableData[i]['component'].length; j++) {
            quantity+= tableData[i]['component'][j]['quantity'];
            
        }
        quantityCheck[i].getElementsByTagName('h3')[0].innerHTML=quantity;
        quantity = 0;
    }
    addItem();
}

function closeModal(){
    document.getElementsByClassName('add-item-modal')[0].style.display='none';
}

function populateComboBox(el){
    let inventory = JSON.parse(localStorage.getItem("myStore"));
    for(i=0; i<inventory.length; i++){
        var selection = document.createElement('option');
        selection.innerHTML = inventory[i]['name'];
        selection.value = inventory[i]['name'];
        document.getElementById(el).appendChild(selection);  
    }
}
function removeItem(sender){
    var dataStore = JSON.parse(localStorage.getItem("myStore"));
    var tableHandler = document.getElementById("remove-from-store");
    var noRows = tableHandler.rows.length;
    if(noRows >= 1){
        for(x=0; x < noRows; x++){
            tableHandler.deleteRow(noRows -1);
        }
    }
    for(i=0; i< dataStore.length; i++){
        if(sender.value === dataStore[i]['name']){
           for(k=0; k< dataStore[i]['component'].length; k++){
               var row = tableHandler.insertRow();
               var cell1 = row.insertCell();
               cell1.innerHTML = dataStore[i]['component'][k]['name'];
           }
        }
    }
}

 function addItem(){
  let itemName = document.getElementById("product").value;
  let itemDescription = document.getElementById("item-details").value;
  let itemCategory = document.getElementById("catogry-combo").value;
  let itemQuantity = document.getElementById("item-quantity").value;

  if(itemCategory ==="" || itemName==="" || itemDescription===""|| itemQuantity===""){
        alert("Please Enter all valid input fields");
 }
  else{
     if(itemName !=="" && itemQuantity !==""){
         let myStore = JSON.parse(localStorage.getItem('myStore'));
        for (i = 0; i < myStore.length; i++){
            if (myStore[i]['name'] === itemCategory){
                var newProduct= {
                    'name': itemName,
                    'description': itemDescription,
                    'quantity': parseInt(itemQuantity)
                };
                let myStore = [];
                myStore[i]['component'].push(newProduct);
                localStorage.setItem('myStore',JSON.stringify(myStore));
                let validInputs = document.getElementsByClassName('add-item-modal')[0].getElementsByTagName('input');
                for(i=0; i<validInputs.length; i++){
                    if(validInputs[i].id==="item-quantity"){
                        validInputs[i].value =0;
                    }
                    else{
                        validInputs[i].value = "";
                    }
                }
                document.getElementById('item-details').value = "";
                document.getElementsByClassName('add-item-modal')[0].style.display = "none";
                document.getElementById('messageSucces').style.display = "block";
            }
        }
     }
  }
}

//  function updateItem(){
//      let itemInput = document.getElementById("input1").value;
//      let quantityInput = document.getElementById("input2").value;
//      let categorySelect = document.getElementById("updateCategory").value;

//  }