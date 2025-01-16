import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class SimulatorComponent implements OnInit {
  montant: number = 500000; // Loan amount
  duree: number = 25;      // Duration in years
  differe: number = 0;     // Deferment in months
  taux: number = 4.99;     // Interest rate
  mensualite: number = 0;  // Calculated monthly payment

  constructor() {}

  ngOnInit(): void {
    this.updateValues();
  }

  updateValue(property: keyof SimulatorComponent, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value) {
      const newValue = parseFloat(inputElement.value) || 0;

      if (typeof this[property] === 'number') {
        this[property] = newValue as any; // Ensure safe assignment
        this.updateValues();
      }
    }
  }

  updateValues(): void {
    const tauxMensuel = this.taux / 12 / 100; // Monthly interest rate
    const nombreMensualites = this.duree * 12; // Total number of payments

    if (tauxMensuel > 0) {
      this.mensualite =
        (this.montant * tauxMensuel) /
        (1 - Math.pow(1 + tauxMensuel, -nombreMensualites));
    } else {
      this.mensualite = this.montant / nombreMensualites;
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(amount);
  }

  formatPercentage(rate: number): string {
    return `${rate.toFixed(2)}%`;
  }
  calculateMensualite() {
    const tauxMensuel = this.taux / 100 / 12;
    const dureeMois = this.duree * 12;
    this.mensualite =
      (this.montant * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -dureeMois));
  }
}
