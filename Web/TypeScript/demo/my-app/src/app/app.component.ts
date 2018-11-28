import { Component, NgModuleRef, Injector } from '@angular/core';
// import { createNgElementConstructor } from '@angular/elements';
// import { boardComponent } from './board';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // constructor(injector: Injector) {
  //   const NgElementConstructor = createNgElementConstructor(boardComponent, {injector});
  //   customElements.register('board', NgElementConstructor);
  // }
}
