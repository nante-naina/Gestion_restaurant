import { ApplicationConfig, Component, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration()
  ]
};

// Dans vos composants :
@Component({
  selector: 'app-example',
  template: `
    <button #btn (click)="handleClick($event)">
      Cliquez moi
    </button>
  `
})
class ExampleComponent {
  private pendingEvents: Array<() => void> = [];

  handleClick(event: Event) {
    this.pendingEvents.push(() => {
      // Votre logique ici
      console.log('Événement traité après l\'hydratation');
    });

    // Marquez le bouton comme traité
    (event.target as HTMLElement).setAttribute('data-pending', 'true');
  }

  ngAfterViewInit() {
    // Nettoyez les événements une fois l'hydratation terminée
    setTimeout(() => {
      this.pendingEvents.forEach(fn => fn());
      this.pendingEvents = [];
    }, 100);
  }
}
