import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CartService } from "../../services/cart.service"

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [RouterModule, CommonModule, SidebarComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  carrito: any[] = [];

  productos = [
    {
      nombre: 'Rag & Bone Beck Coat',
      precio: 25.00,
      precioOriginal: 35.00,
      tamanio: 'M',
      color: ['brown', 'olivegreen', 'gray'],
      cantidad: 10,
      imagen: 'https://jthemes.net/themes/html/neoncart/assets/images/shop/classic_ecommerce/img_01.png',
      estado: 'Nuevo',
    },
    {
      nombre: 'Lightweight Quilteddddd',
      precio: 45.00,
      precioOriginal: 55.00,
      tamanio: 'L',
      color: ['blue', 'gray', 'black'],
      cantidad: 5,
      imagen: 'https://jthemes.net/themes/html/neoncart/assets/images/shop/classic_ecommerce/img_02.png',
      estado: 'Disponible',
    }
  ];

  constructor(private CartService: CartService) {}

  ngOnInit(): void {
    this.CartService.carrito$.subscribe((productos) => {
      this.carrito = productos;
    });
  }



}
