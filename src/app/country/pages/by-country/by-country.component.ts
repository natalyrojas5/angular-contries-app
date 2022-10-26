import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class ByCountryComponent {
  term: string = '';
  hasErr: boolean = false;
  countries: Country[] = [];
  suggestedCountries: Country[] = [];
  showSuggestions: boolean = false;

  constructor(private countryService: CountryService) {}

  searchTerm(term: string) {
    this.hasErr = false;
    this.term = term;

    if (term.length <= 0) return;

    this.countryService.searchCountry(this.term).subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: (err) => {
        console.info('error', err);
        this.hasErr = true;
        this.countries = [];
      },
    });
  }
  suggestions(term: string) {
    this.hasErr = false;
    this.term = term;
    this.showSuggestions = true;
    this.countryService
      .searchCountry(term)
      .subscribe(
        (countries) => (this.suggestedCountries = countries.splice(0, 3))
      );
  }
}
