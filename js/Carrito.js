const carrito = document.getElementById("carrito"),
       productList = document.getElementById("lista_de_prod"),
       contenedorCart = document.querySelector('.carritoBuy .Productos');

let ArticulosCarrito = [];

RegistrarEventListener()

function RegistrarEventListener() {
    productList.addEventListener('click', agregarProd);
}

function agregarProd(e) {
    if (e.target.classList.contains("agregar_carrito")){
        const Producto_select = e.target.parentElement.parentElement.parentElement;
    leerInfo(Producto_select)
    }
}
// Agarra la informacion :)
function leerInfo(Producto) {
    const infoProd = {
        imagen : Producto.querySelector('img').src,
        titulo : Producto.querySelector('h3').textContent,
         precio : parseFloat(Producto.querySelector('.dinero').textContent.replace("S/.", "").trim()),
        id : Producto.querySelector('button').getAttribute('data-id'),
        cantidad : 1
    }

//revisar si ya existe
    const existe = ArticulosCarrito.some(Producto => Producto.id === infoProd.id)
    if (existe) {
        const Producto = ArticulosCarrito.map(Producto => {
            if(Producto.id === infoProd.id) {
                Producto.cantidad++;
                return Producto
            }  else {
                return Producto;
            }
        });
        [...ArticulosCarrito,infoProd]
    } else {
        ArticulosCarrito = [...ArticulosCarrito,infoProd]
    }
    CarritoHTML()
}

function CarritoHTML() {
    limpiarHTML();
    ArticulosCarrito.forEach(Producto => {
        const fila = document.createElement('div');
        const totalPrecio = Producto.precio * Producto.cantidad;
        fila.innerHTML = `
            <img src=${Producto.imagen}></img>
            <p>${Producto.titulo}</p>
            <p>S/.${totalPrecio.toFixed(2)}</p>
            <p>${Producto.cantidad}</p>
            <p><span><strong>X</strong></span></p>        
        `;

        contenedorCart.appendChild(fila)
    });
}

//Eliminar productos

function limpiarHTML() {
    while (contenedorCart.firstChild) {
        contenedorCart.removeChild(contenedorCart.firstChild)
    }
}
