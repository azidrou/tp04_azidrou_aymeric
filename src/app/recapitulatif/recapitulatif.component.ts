import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recapitulatif',
  templateUrl: './recapitulatif.component.html',
  styleUrls: ['./recapitulatif.component.css']
})
export class RecapitulatifComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() firstName: string="";
  @Input() name: string ="";
  @Input() adress: string ="";
  @Input() cp: string ="";
  @Input() city:string="";
  @Input() country:string="";
  @Input() phone: string="";
  @Input() email: string="";
  @Input() civility: string="";
  @Input() login: string="";
  @Input() password: string="";


}
