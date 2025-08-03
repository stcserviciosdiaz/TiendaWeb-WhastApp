import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() carrito: any[] = [];  // Habilita el binding de la propiedad


  constructor(private CartService: CartService) {}

  ngOnInit(): void {

    this.CartService.carrito$.subscribe((productos) => {
      this.carrito = productos;
    });

    this.cargarCarrito();


  }


  mostrarproductos: boolean = false; // Estado del sidebar

  toggleCarrito() {
    this.mostrarproductos = !this.mostrarproductos;
  }

   // ✅ Cargar carrito desde localStorage al iniciar
   cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
    }
  }

  // ✅ Guardar carrito en localStorage
  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  // ✅ Remover producto y actualizar localStorage
  removerProducto(index: number) {
    this.carrito.splice(index, 1);
    this.guardarCarrito(); // Guardar después de eliminar
  }

  calcularSubtotal(): number {
    return this.carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  }

  calcularIVA(): number {
    return this.calcularSubtotal() * 0.15; // ✅ IVA ajustado al 15%
  }

  calcularTotal(): number {
    return this.calcularSubtotal() + this.calcularIVA();
  }



// ✅ Pedido al WhAstApp
 pedirporwhatsapp(): void {
  if (this.carrito.length === 0) {
    alert('No hay productos en el carrito.');
    return;
  }

  // Construir mensaje
  let mensaje = 'Hola, estoy interesado en los siguientes productos:\n';

  this.carrito.forEach((producto, index) => {
    mensaje += `\n${index + 1}. ${producto.nombre}\n`;
    mensaje += `   - Precio: $${producto.precio}\n`;
    mensaje += `   - Cantidad: ${producto.cantidad}\n`;
    /* mensaje += `   - Color: ${producto.color.join(', ')}\n`; */
    mensaje += `   - Tamaño: ${producto.tamanio}\n`;
  });

  // Calcular totales
  const subtotal = this.calcularSubtotal();
  const iva = this.calcularIVA();
  const total = this.calcularTotal();

  mensaje += `\n---------------------------\n`;
  mensaje += `Subtotal: $${subtotal.toFixed(2)}\n`;
  mensaje += `IVA (15%): $${iva.toFixed(2)}\n`;
  mensaje += `Total: $${total.toFixed(2)}\n`;

  // Codificar el mensaje correctamente para la URL
  const mensajeCodificado = encodeURIComponent(mensaje);

  // Número de WhatsApp (sin espacios, con código de país)
  const numeroWhatsApp = '593992548195';

  // Abrir WhatsApp con mensaje
  window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, '_blank');
}





}
