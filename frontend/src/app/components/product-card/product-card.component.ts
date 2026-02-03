import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../services/producto.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-card">
      <div class="image-container">
        <img [src]="product.imagenUrl || '/assets/images/placeholder-food.png'" [alt]="product.nombre">
      </div>
      <div class="card-details">
        <h3>{{ product.nombre }}</h3>
        <p class="description">{{ product.descripcion }}</p>
        <div class="price-row">
          <span class="price">$ {{ product.precio | number:'1.0-0' }}</span>
          
          <button *ngIf="!isAdmin" (click)="onAdd()" class="btn-add">
            Agregar
          </button>
          
          <button *ngIf="isAdmin" (click)="onDelete()" class="btn-delete">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      background: white; /* Glassmorphism if preferred, but white for readability on cards is good */
      background: rgba(40, 40, 40, 0.6);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(237, 177, 16, 0.1);
      border-radius: 16px;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
      height: 100%;
      color: #f8edda;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        border-color: rgba(237, 177, 16, 0.4);
      }

      .image-container {
        height: 180px;
        width: 100%;
        overflow: hidden;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
      }

      &:hover .image-container img {
        transform: scale(1.1);
      }

      .card-details {
        padding: 1.2rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
          color: #edb110;
        }

        .description {
          font-size: 0.9rem;
          color: rgba(248, 237, 218, 0.7);
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;

          .price {
            font-size: 1.2rem;
            font-weight: bold;
            color: #fff;
          }

          button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s;

            &.btn-add {
              background: #edb110;
              color: #0a332e;
              &:hover { background: #ffca2c; }
            }

            &.btn-delete {
              background: #dc3545 !important;
              color: #ffffff !important;
              border: none;
              opacity: 1 !important;
              &:hover { background: #c82333 !important; transform: scale(1.05); }
            }
          }
        }
      }
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Producto;
  @Input() isAdmin: boolean = false;
  @Output() addToCart = new EventEmitter<Producto>();
  @Output() deleteProduct = new EventEmitter<number>();

  onAdd() {
    this.addToCart.emit(this.product);
  }

  onDelete() {
    if (this.product.id) {
      this.deleteProduct.emit(this.product.id);
    }
  }
}
