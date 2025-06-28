const   carrito = document.getElementById("carrito"),
        productList = document.getElementById("lista_de_prod"),
        contenedorCart = document.querySelector('.carritoBuy .Productos');

let ArticulosCarrito = [];

document.addEventListener("DOMContentLoaded", () => {
    const datosGuardados = localStorage.getItem("carritoPizzaToon");
    if (datosGuardados) {
        ArticulosCarrito = JSON.parse(datosGuardados);
        CarritoHTML();
    }

    RegistrarEventListener()
});

function RegistrarEventListener() {
    if (productList) {
        productList.addEventListener('click', agregarProd);
    }

//Elimminar producto
     carrito.addEventListener('click', eliminarProd);

}

function agregarProd(e) {
    if (e.target.classList.contains("agregar_carrito")) {
        const Producto_select = e.target.closest('.pizzaMarco');
        leerInfo(Producto_select);
    }
}

function eliminarProd(e) {
    if (e.target.classList.contains("Borrar")) {
        const ProdID = e.target.getAttribute('data-id');
        ArticulosCarrito = ArticulosCarrito.filter(Producto => Producto.id !== ProdID);
        CarritoHTML();
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
    };

//revisar si ya existe
     const existe = ArticulosCarrito.some(prod => prod.id === infoProd.id);
    if (existe) {
        ArticulosCarrito = ArticulosCarrito.map(prod => {
            if (prod.id === infoProd.id) {
                prod.cantidad++;
            }
            return prod;
        });
    } else {
        ArticulosCarrito = [...ArticulosCarrito, infoProd];
    }

    CarritoHTML();
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
            <p><span class="Borrar" data-id="${Producto.id}">X</span></p>        
        `;
        contenedorCart.appendChild(fila)
    });
    
    localStorage.setItem("carritoPizzaToon", JSON.stringify(ArticulosCarrito));
}

//Eliminar productos

function limpiarHTML() {
    while (contenedorCart.firstChild) {
        contenedorCart.removeChild(contenedorCart.firstChild)
    }
}

