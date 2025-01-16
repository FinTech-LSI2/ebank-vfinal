import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  imports:[FormsModule]
})
export class SearchBarComponent {
  // Input search term
  searchTerm: string = '';

  // Predefined list of items
  items = [
    { name: 'Community Dashboard' },
    { name: 'Global Surveyors' },
    { name: 'Group Hub Forums' },
    { name: 'Survey Photos' },
    { name: 'Surveying Tutorials' },
    { name: 'Surveying Jobs' },
    { name: 'Tools & Resources' },
    { name: 'Member Map' },
    { name: 'Statistics' },
    { name: 'Demande de Crédit' },
  ];

  // Filtered items based on the search term
  filteredItems = [...this.items];

  // Handle the search logic
  onSearch() {
    if (this.searchTerm.trim()) {
      this.filteredItems = this.items.filter((item) =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredItems = [...this.items];  // Show all items if the search term is empty
    }
  }
}
