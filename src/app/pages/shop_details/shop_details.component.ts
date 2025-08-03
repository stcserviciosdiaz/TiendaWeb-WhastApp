import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { MenuComponent } from '../menu/menu.component';
import { CartService } from '../../services/cart.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-shop_details',
  imports: [RouterModule, CommonModule, FooterComponent, MenuComponent, FormsModule],
  templateUrl: './shop_details.component.html',
  styleUrls: ['./shop_details.component.css']
})
export class ShopDetailsComponent implements OnInit {
  producto: any;
  tamanioSeleccionado: string = '';
  colorSeleccionado: string = '';


  constructor(
    private router: Router,
    private cartService: CartService) {
    const navigation = this.router.getCurrentNavigation();
    this.producto = navigation?.extras.state?.['producto'] || null;
  }

  ngOnInit(): void {

  }

  convertirATamanioArray(tamanio: string | string[]): string[] {
    return Array.isArray(tamanio) ? tamanio : [tamanio];
  }


  agregarProducto(producto: any) {
    this.cartService.agregarProducto(producto);
    alert('Producto agregado al carrito!');
  }



  comprarporwhatsapp() {
    if (!this.producto) {
      alert('No hay ningún producto seleccionado.');
      return;
    }

    if (!this.tamanioSeleccionado) {
      alert('Por favor selecciona un tamaño antes de continuar.');
      return;
    }

    if (!this.colorSeleccionado) {
      alert('Por favor selecciona un color antes de continuar.');
      return;
    }

    const mensaje = encodeURIComponent(
      `Hola, estoy interesado en el siguiente producto:\n` +
      `*Nombre:* ${this.producto.nombre}\n` +
      `*Precio:* $${this.producto.precio}\n` +
      `*Color:* ${this.colorSeleccionado}\n` +
      `*Tamaño:* ${this.tamanioSeleccionado}\n\n` +
      `Por favor, contácteme para comprar.`
    );

    const numeroWhatsApp = '+593992548195';
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
  }


}
