import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private carrito: any[] = this.obtenerCarritoDesdeStorage();
  private carritoSubject = new BehaviorSubject<any[]>(this.carrito);
  carrito$ = this.carritoSubject.asObservable(); // Observable para el carrito


  constructor() {
    this.cargarCarrito();
  }

  // ✅ Cargar carrito desde localStorage al iniciar
  private cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
    }
  }

  // ✅ Guardar carrito en localStorage
  private guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  // ✅ Agregar producto sin duplicarlo
  agregarProducto(producto: any) {
    const productoExistente = this.carrito.find(p => p.nombre === producto.nombre);

    if (productoExistente) {
      productoExistente.cantidad++; // Incrementa la cantidad si ya está en el carrito
    } else {
      this.carrito.push({ ...producto, cantidad: 1 }); // Agregar nuevo producto con cantidad 1
    }
    //this.carritoSubject.next(this.carrito); // Notifica a los componentes
    this.actualizarCarritoStorage();
    this.guardarCarrito(); // Guardar cambios en localStorage
  }

  // ✅ Obtener carrito para visualizarlo
  obtenerCarrito() {
    return this.carrito$; // Devuelve el observable
  }

  // ✅ Remover producto del carrito
  removerProducto(index: number) {
    this.carrito.splice(index, 1);
    this.guardarCarrito();
    this.actualizarCarritoStorage();
  }

  // ✅ Obtener carrito desde LocalStorage
  private obtenerCarritoDesdeStorage(): any[] {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  }

  // Guardar carrito en LocalStorage
  private actualizarCarritoStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.carritoSubject.next(this.carrito);
  }


}
