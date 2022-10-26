import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [
    `
      button {
        border-radius: 0px;
        max-width: 160px;
        width: 100%;
      }
    `,
  ],
})
export class ByRegionComponent {
  regiones: string[] = [
    'EU',
    'EFTA',
    'CARICOM',
    'PA',
    'AU',
    'USAN',
    'EEU',
    'AL',
    'ASEAN',
    'CAIS',
    'CEFTA',
    'NAFTA',
    'SAARC',
  ];
  activeRegion: string = '';
  countries: Country[] = [];

  constructor(private countryService: CountryService) {}

  activateRegion(region: string) {
    if (region === this.activeRegion) return;
    this.activeRegion = region;

    this.countryService.searchByRegion(this.activeRegion).subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: (err) => {
        console.info('error', err);
        this.countries = [];
      },
    });
  }
}
