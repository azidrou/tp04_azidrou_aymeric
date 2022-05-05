import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-saisie-client',
  templateUrl: './saisie-client.component.html',
  styleUrls: ['./saisie-client.component.css']
})
export class SaisieClientComponent implements OnInit {
  
  //@Output() change: EventEmitter<number> = new EventEmitter<number>();
  name: String = 'toto';
  valid: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    let name : String = 'titi';
    this.name = name;
  }

  onClick(){
    console.log('click');
    this.valid = true;
    
    //let timer: ReturnType<typeof setTimeout> = setTimeout(() => { this.valid = false });
    //clearTimeout(timer);
    
  }
  isValid(): boolean{
    return this.valid;
  }


}
