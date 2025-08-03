import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { FooterComponent } from "../footer/footer.component";
import { MenuComponent } from '../menu/menu.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

import $ from 'jquery';

@Component({
    standalone: true,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [ CommonModule, FooterComponent, MenuComponent, SlickCarouselModule, FormsModule ]
})

export class HomeComponent implements OnInit {

  categoriaSeleccionada: string = '*'; // '*' significa mostrar todos los productos


  constructor(
    private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
  }

  productos = [
    {
      nombre: 'Rag & Bone Beck Coat',
      precio: 25.00,
      precioOriginal: 35.00,
      tamanio: ['P', 'M', 'S'],
      color: ['brown', 'olivegreen', 'gray'],
      cantidad: 10,
      description: ['Sigue evolucionando en velocidad con un calzado de carrera hecho para ayudarte a alcanzar nuevos objetivos y récords. Mejora la comodidad y la transpirabilidad con una parte superior rediseñada. Ya sea en una carrera de 10 km o en un maratón, este modelo, al igual que su versión anterior'],
      imagen: 'https://jthemes.net/themes/html/neoncart/assets/images/shop/classic_ecommerce/img_01.png',
      estado: 'Nuevo',
      categoria: 'blusa',
    },
    {
      nombre: 'Lightweight Quilted',
      precio: 45.00,
      precioOriginal: 55.00,
      tamanio: 'L',
      color: ['blue', 'gray', 'black'],
      cantidad: 5,
      description: ['Sigue evolucionando en velocidad con un calzado de carrera hecho para ayudarte a alcanzar nuevos objetivos y récords. Mejora la comodidad y la transpirabilidad con una parte superior rediseñada. Ya sea en una carrera de 10 km o en un maratón, este modelo, al igual que su versión anterior'],
      imagen: 'https://jthemes.net/themes/html/neoncart/assets/images/shop/classic_ecommerce/img_02.png',
      estado: 'Disponible',
      categoria: 'vestido',
    },
    {
      nombre: 'Faux Leather Biker',
      precio: 65.00,
      precioOriginal: 75.00,
      tamanio: 'S',
      color: ['red', 'black', 'blue'],
      cantidad: 0,
      description: ['Este abrigo, confeccionado con una mezcla de lana y un tejido a cuadros personalizado, tiene un ajuste extragrande y una capucha con cordón, el abrigo perfecto para llevar a todas partes. Envío gratuito en EE. UU.'],
      imagen: 'https://jthemes.net/themes/html/neoncart/assets/images/shop/classic_ecommerce/img_03.png',
      estado: 'Agotado',
      categoria: 'blusa',
    },
    {
      nombre: 'Rag & Bone Beck Coat',
      precio: 25.00,
      precioOriginal: 35.00,
      tamanio: 'M',
      color: ['brown', 'olivegreen', 'gray'],
      cantidad: 10,
      description: ['Este abrigo, confeccionado con una mezcla de lana y un tejido a cuadros personalizado, tiene un ajuste extragrande y una capucha con cordón, el abrigo perfecto para llevar a todas partes. Envío gratuito en EE. UU.'],
      imagen: 'https://jthemes.net/themes/html/neoncart/assets/images/shop/classic_ecommerce/img_01.png',
      estado: 'Nuevo',
      categoria: 'vestido',
    },
  ];

  categorias = [
  { nombre: 'Snacks y bocadillos', img: 'https://freshcart-next-js-template.netlify.app/images/category/category-snack-munchies.jpg' },
  { nombre: 'Panadería y galletas', img: 'https://freshcart-next-js-template.netlify.app/images/category/category-bakery-biscuits.jpg' },
  { nombre: 'Comida instantánea', img: 'https://freshcart-next-js-template.netlify.app/images/category/category-instant-food.jpg' },
  { nombre: 'Snacks y bocadillos', img: 'https://freshcart-next-js-template.netlify.app/images/category/category-snack-munchies.jpg' },
  { nombre: 'Panadería y galletas', img: 'https://freshcart-next-js-template.netlify.app/images/category/category-bakery-biscuits.jpg' },
  { nombre: 'Comida instantánea', img: 'https://freshcart-next-js-template.netlify.app/images/category/category-instant-food.jpg' },
  // Agrega las demás...
];


  carrito: any[] = []; // Array para almacenar los productos en el carrito

  sliderConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,           // Activar autoplay
    autoplaySpeed: 3000,      // Tiempo entre slides (ms)
    arrows: true,             // Mostrar flechas
    dots: false,              // Puedes activarlos si quieres
    infinite: true,           // Loop infinito
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };



  agregarProducto(producto: any) {
    this.cartService.agregarProducto(producto);
    alert('Producto agregado al carrito!');
  }

  navigateDetails(event: Event, producto: any) {
    event.preventDefault(); // Evita el comportamiento por defecto del enlace
    this.router.navigate(['/details'], { state: { producto } });
    console.log('Navegar a detalles de:', producto);
    // Aquí puedes agregar la navegación a la página de detalles
  }


  // Función para cambiar la categoría seleccionada
  cambiarCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
  }

  // Función para filtrar los productos según la categoría seleccionada
  productosFiltrados() {
    if (this.categoriaSeleccionada === '*') {
      return this.productos;
    }
    return this.productos.filter(producto => producto.categoria === this.categoriaSeleccionada);
  }







}
