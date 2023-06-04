class Articulos {
    constructor(id, nombre, img, detalle, precio){
        this.id = id;
        this.nombre = nombre;
        this.img = img;
        this.detalle = detalle;
        this.precio = precio;
        this.cantidad = 1;
    }
}
const camisa_leñadora1 = new Articulos(1, "Camisa King", "../img/catalogo/camisa_leñadora1.jpg", "lorem", 5050);
const camisa_leñadora2 = new Articulos(2, "Camisa Camboriu", "../img/catalogo/camisa_leñadora2.jpg", "lorem", 5100);
const camisa_leñadora3 = new Articulos(3, "Camisa Bronx", "../img/catalogo/camisa_leñadora3.jpg", "lorem", 4980);
const camisa_leñadora4 = new Articulos(4, "Camisa Bambú", "../img/catalogo/camisa_leñadora4.jpg", "lorem", 7000);
const camisa_leñadora5 = new Articulos(5, "Camisa Toxic", "../img/catalogo/camisa_leñadora5.jpg", "lorem", 5500);
const camisa_leñadora6 = new Articulos(6, "Camisa Danger", "../img/catalogo/camisa_leñadora6.jpg", "lorem", 3900);
const camisa_leñadora7 = new Articulos(7, "Camisa Plus", "../img/catalogo/camisa_leñadora7.jpg", "lorem", 4200);
const camisa_leñadora8 = new Articulos(8, "Camisa Motoclub", "../img/catalogo/camisa_leñadora8.jpg", "lorem", 4800);
const Jean = new Articulos(9, "Jean Start", "../img/catalogo/jean_rock.jpg", "lorem", 11100);
const zapatos1 = new Articulos(10, "Borcego Texas", "../img/catalogo/zapatos1.png", "lorem", 22000);
const zapatos2 = new Articulos(11, "Borcego Kansas", "../img/catalogo/zapatos2.jpg", "lorem", 21000);
const zapatos3 = new Articulos(12, "Borcego Pampa", "../img/catalogo/zapatos3.jpg", "lorem", 17000);
const zapatos4 = new Articulos(13, "Borcego Toro", "../img/catalogo/zapatos4.jpg", "lorem", 15000);
const zapatos5 = new Articulos(14, "Borcego Plus", "../img/catalogo/zapatos5.jpg", "lorem", 17500);
const zapatos6 = new Articulos(15, "Borcego Kai", "../img/catalogo/zapatos6.jpg", "lorem", 18000);



const articulos = [camisa_leñadora1,camisa_leñadora2,camisa_leñadora3,camisa_leñadora4,camisa_leñadora5,camisa_leñadora6,camisa_leñadora7,camisa_leñadora8,zapatos1,zapatos2,zapatos3,zapatos4,zapatos5,zapatos6];

let carrito = [];

if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

console.log(articulos);

const contenedorArticulos = document.getElementById("contenedorArticulos");

const mostrarArticulos = () => {
    articulos.forEach((articulo) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12", "w-auto", "m-2");
        card.innerHTML = `
            <div class="card p-1">
                <h3 class="card-tittle">${articulo.nombre}</h3>
                <img src="${articulo.img}" class="card-img-top imgArticulo w-auto" alt="${articulo.nombre}">
                <p class="description">${articulo.detalle}</p>
                <div class="d-flex justify-content-end pe-2">
                    <p class="text-center"> Precio: $</p>
                    <p class="card-text">${articulo.precio}</p>
                </div>
                <button class="btn colorBoton" id="boton${articulo.id}"> Comprar </button>
            </div>
        `;
        contenedorArticulos.appendChild(card);

        const boton = document.getElementById(`boton${articulo.id}`);
        boton.addEventListener("click", () => {
            Toastify({
                text: "Seguí comprando,Rey!",
                duration: 3000,
                gravity:"top",
                position:"left",
            }).showToast();
            AgregaralCarrito(articulo.id) 
        });
    })
}

const AgregaralCarrito = (id) => {
    const articulo = articulos.find((articulo) => articulo.id === id);
    const articuloenCarrito = carrito.find((articulo) => articulo.id === id);
    if(articuloenCarrito){
        articuloenCarrito.cantidad++;
        console.log(articuloenCarrito.cantidad);
    }else { 
        carrito.push(articulo);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    calcularTotal();
}

mostrarArticulos();

const LaCompra = document.getElementById("LaCompra");
const VerCompra = document.getElementById("VerCompra");

const mostrarArticulo = () => {
	LaCompra.innerHTML = "";
	carrito.forEach((articulo) => {
		const card = document.createElement("div");
		card.classList.add("col-xl-3", "col-md-6", "col-xs-12", "m-2");
		card.innerHTML = `
            <div class="card p-1">
                <h3 class="card-tittle">${articulo.nombre}</h3>
                <img src="${articulo.img}" class="card-img-top imgArticulo w-auto" alt="${articulo.nombre}">
                <p class="description">${articulo.detalle}</p>
                    <div class="d-flex justify-content-start">
                        <p class="text-center">Cantidad: </p>
                        <p class="card-text">${articulo.cantidad}</p>
                    </div>
                    <div class="d-flex justify-content-end pe-2">
                        <p class="text-center"> Precio: $</p>
                        <p class="card-text">${articulo.precio}</p>
                    </div>
                <button class="btn colorBoton" id="eliminar${articulo.id}">Eliminar Item</button>
            </div>
            `;
		LaCompra.appendChild(card);

		const boton = document.getElementById(`eliminar${articulo.id}`);
		console.log(boton);
		boton.addEventListener("click", () => {
            Toastify({
                text: "Mal ahi, Ortiva!",
                duration: 3000,
                gravity:"bottom",
                position:"right",
            }).showToast();
			eliminarLaCompra(articulo.id);
		});
	})
    calcularTotal()
};

VerCompra.addEventListener("click", () => {
	mostrarArticulo();
});

const eliminarLaCompra = (id) => {
    const Articulo = carrito.find((articulo) => articulo.id === id);
    const indice = carrito.indexOf(Articulo);
    carrito.splice(indice, 1);
    mostrarArticulo()
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const EliminarCompra = document.getElementById("EliminarCompra");
EliminarCompra.addEventListener("click", () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Estas seguro de eliminar la compra??',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Que tristeza, Compra eliminada!',
            'No tienes nada en el carrito',
            'success'
          )
          eliminarTodo();} else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Continúa comprando!!',
            'Prepara la tarjeta para pagar!!'
          )
        }
      })

    
})

const eliminarTodo = () => {
    carrito = [];
    mostrarArticulo();
    localStorage.clear();
    
}

const total = document.getElementById("TotalCompra");
const calcularTotal = () => {
    let totalcompra = 0;
    carrito.forEach((articulo) =>{
        totalcompra += articulo.precio * articulo.cantidad;
    })
    total.innerHTML = `$${totalcompra}`;
}

