import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  standalone: true,
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  imports: [CommonModule],
})
export class FaqComponent {
  faqItems = [
    {
      question: '1 - COMMENT FAIRE POUR L’UTILISER ?',
      answer: 'Here is the answer to question 1.',
      isOpen: false,
    },
    {
      question: '2 - DANS QUELLES CONDITIONS PEUT-ON UTILISER CE SERVICE ?',
      answer: 'Here is the answer to question 2.',
      isOpen: false,
    },
    {
      question: '3 - COMMENT CONNAÎTRE LE SORT D`UN VIREMENT ?',
      answer: 'Here is the answer to question 3.',
      isOpen: false,
    },
  ];

  filteredFaqItems = [...this.faqItems]; // Copy for search results

  toggleAnswer(item: any): void {
    item.isOpen = !item.isOpen;
  }

  searchFAQs(event: Event): void {
    const query = (event.target as HTMLInputElement).value; // Cast target to HTMLInputElement
    this.filteredFaqItems = this.faqItems.filter((item) =>
      item.question.toLowerCase().includes(query.toLowerCase())
    );
  }

}
