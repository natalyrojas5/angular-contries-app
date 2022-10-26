import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  styles: [],
})
export class ByCapitalComponent {
  term: string = '';
  hasErr: boolean = false;
  countries: Country[] = [];

  constructor(private countryService: CountryService) {}

  searchTerm(term: string) {
    this.hasErr = false;
    this.term = term;
    if (term.length <= 0) return;
    this.countryService.searchCountryByCapital(this.term).subscribe({
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
}
