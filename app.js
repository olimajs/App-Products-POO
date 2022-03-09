/*esta clase muestra como van a lucir internamente los productos en neustra app*/
class Product {
    constructor(name, price, year) {
            this.name = name;
            this.price = price;
            this.year = year;
    }
}

/*esta clase de abajo va a interactuar con el HTML*/
class UI {
    addProduct(product){    /*al darle un parametro(producto) desde lo que hice en la lin26, podre mostrarte en pantalla con esta claseUI*/
        const productList = document.getElementById('product-list');//paso3
        const element = document.createElement('div');//paso2
/*paso1*/   element.innerHTML = ` 
                <div class="card text-center mb-4">
                    <div class="card-body>
                        <strong> Product Name </strong>: ${product.name}
                        <strong> Product Price </strong>: ${product.price}
                        <strong> Product Year </strong>: ${product.year}
                        <a href="#" class="btn btn-danger" name=delete">Delete</a>
                    </div>
                </div>
        `; //aca solo esta diseñado y abajo lo insertamos 
        productList.appendChild(element);//vamos a agregarte un elemento hijo, a través del appenChild, que cosa? lo de arriba o sea el element
    }
    
    resetForm() {
        document.getElementById('product-form').reset(); //me reset el form una vez guard dat en el form.
    }
    deleteProduct(element){
        if (element.name === 'delete') {
            (element.parentElement.parentElement.parentElement.remove());
            this.showMessage('Product Deteled Successfully', 'danger');
        }
    }
    showMessage(message, cssClass){  /*este metodo me sirve para mostrar un mensaje en la UI cuando agregue un productg*/
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-3`;
        div.appendChild(document.createTextNode(message));
        //MOSTRANDO EN EL DOM 
        const container = document.querySelector(' . container'); //seleccionamos todo lo de arriba en esta contante (toda la app, para que muestre el msj arriba del todo)
        const app = document.querySelector('#App');
        container.insertBefore(div, app); 
        setTimeout(function (){   //despues de cuanto queremos ejecutar esta funcion, esta en milisegundos 1000=1seg
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

//DOM eventos, si un user da un click etc, son eventos que ocurren dentro de ese document(en este caso dentro del index.html).

/*llamamos al id y añadimos el evento de submit para ejecutarlo al darle click con la funcion*/
document.getElementById('product-form')
    .addEventListener('submit', function (e) {
        const name = document.getElementById('name').value,         //
              price = document.getElementById('price').value,       // las 3 son las propiedades del product
              year = document.getElementById('year').value;         //

              //nuevo producto como objeto
        const product = new Product(name, price , year); //todos los datos q aparecen en consola se almacenan en esta constante
 //nueva instancia UI
        const ui = new UI();
        
//input validacion del user
        if(name === '' || price === '' || year === '' ){
          return  ui.showMessage('Complete Fields Please', 'danger') //el return para que no me devuelva 2 msj
        }
        ui.addProduct(product); //cree una nueva instancia de lo que diseñe y con el addproduct lo podemos mostrar en pantalloa. un objeto interactuando con otro objeto.
        ui.resetForm();
        ui.showMessage('Product Added Successfully', 'success');
        
        e.preventDefault(); /*me sirve para cancelar el evento de refrescar la pagína enseguida y poder ver los datos q ingreso en consola|"cancela el comportamiento x defecto que me envia la page" */
    });

document.getElementById('product-list').addEventListener('click', function(e){
        const ui = new UI();
        ui.deleteProduct(e.target);
    })