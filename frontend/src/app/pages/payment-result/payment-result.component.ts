import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-result',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="payment-result-container">
      <div class="result-card" [ngClass]="status">
        <div class="icon">
          <i *ngIf="status === 'success'" class="fas fa-check-circle"></i>
          <i *ngIf="status === 'failure'" class="fas fa-times-circle"></i>
          <i *ngIf="status === 'pending'" class="fas fa-clock"></i>
        </div>
        
        <h1>{{ title }}</h1>
        <p>{{ message }}</p>

        <div *ngIf="paymentId" class="payment-info">
          <span>ID de Pago: <strong>{{ paymentId }}</strong></span>
        </div>

        <button class="btn-home" (click)="goHome()">Volver a Mis Pedidos</button>
      </div>
    </div>
  `,
  styles: [`
    .payment-result-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: var(--bg-color);
      padding: 1rem;
    }

    .result-card {
      background: var(--bg-card);
      padding: 3rem;
      border-radius: 16px;
      text-align: center;
      max-width: 500px;
      width: 100%;
      box-shadow: var(--card-shadow);
      border: 1px solid var(--border-color);

      .icon {
        font-size: 5rem;
        margin-bottom: 1.5rem;
      }

      h1 {
        margin-bottom: 1rem;
        color: var(--text-color);
        font-size: 2rem;
      }

      p {
        color: var(--text-muted);
        margin-bottom: 2rem;
        font-size: 1.1rem;
      }

      .payment-info {
        background: rgba(0,0,0,0.1);
        padding: 0.5rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        display: inline-block;
      }

      .btn-home {
        background: var(--primary-color);
        color: #fff;
        border: none;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: bold;
        font-size: 1.1rem;
        cursor: pointer;
        transition: transform 0.2s;
        width: 100%;

        &:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
      }

      // Status Styles
      &.success {
        border-top: 5px solid #28a745;
        .icon { color: #28a745; }
      }

      &.failure {
        border-top: 5px solid #dc3545;
        .icon { color: #dc3545; }
      }

      &.pending {
        border-top: 5px solid #ffc107;
        .icon { color: #ffc107; }
      }
    }
  `]
})
export class PaymentResultComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  status: 'success' | 'failure' | 'pending' = 'success';
  title: string = '';
  message: string = '';
  paymentId: string | null = null;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.status = data['status'];
      this.setMessages();
    });

    this.route.queryParams.subscribe(params => {
      this.paymentId = params['payment_id'] || params['collection_id'];
    });
  }

  setMessages() {
    switch (this.status) {
      case 'success':
        this.title = '¡Pago Exitoso!';
        this.message = 'Tu pedido ha sido procesado correctamente. Lo estamos preparando.';
        break;
      case 'failure':
        this.title = 'Pago Rechazado';
        this.message = 'Hubo un problema con tu pago. Por favor, intenta nuevamente.';
        break;
      case 'pending':
        this.title = 'Pago Pendiente';
        this.message = 'Tu pago está siendo procesado. Te avisaremos cuando se confirme.';
        break;
    }
  }

  goHome() {
    this.router.navigate(['/mis-pedidos']);
  }
}
