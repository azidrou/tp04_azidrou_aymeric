import { Component, Version } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../../shared/model/produit';
import { MyserviceService } from './myservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tp04';
}
