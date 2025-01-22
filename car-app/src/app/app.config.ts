import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; // Usando animações normais

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(), // Configuração de animações padrão
    provideHttpClient()
  ]
};
