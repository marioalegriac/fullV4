function valformulario() {
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    document.getElementById('modalEmail').textContent = email;
    document.getElementById('modalSubject').textContent = subject;
    document.getElementById('modalMessage').textContent = message;

    document.getElementById('contactForm').reset();

    alert("Solicitud enviada con exito");
}


  // Carrito como arreglo en memoria
function addToCart(nombre, precio, imagen, id) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const productoExistente = carrito.find(p => p.id === id);

  if (productoExistente) {
    productoExistente.cantidad++;
    productoExistente.subtotal = productoExistente.precio * productoExistente.cantidad;
  } else {
    carrito.push({
      id,
      nombre,
      imagen,
      precio,
      cantidad: 1,
      subtotal: precio
    });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  actualizarCarrito(carrito);
}

function actualizarCarrito(carrito) {
  const tbody = document.getElementById('carrito-body');
  tbody.innerHTML = '';

  let total = 0;

  carrito.forEach(producto => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td><img src="${producto.imagen}" width="40" style="vertical-align:middle; margin-right:10px;">${producto.nombre}</td>
      <td>${producto.cantidad}</td>
      <td>$${producto.subtotal.toLocaleString()}</td>
      <td><button onclick="eliminarDelCarrito('${producto.id}')">❌</button></td>
    `;
    tbody.appendChild(fila);
    total += producto.subtotal;
  });

  document.getElementById('resumen-subtotal').innerText = `$${total.toLocaleString()}`;
  document.getElementById('resumen-total').innerText = `$${total.toLocaleString()}`;
}

function eliminarDelCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter(p => p.id !== id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito(carrito);
}

function vaciarCarrito() {
  localStorage.removeItem('carrito');
  actualizarCarrito([]);
}

document.addEventListener('DOMContentLoaded', cargarCarrito);




