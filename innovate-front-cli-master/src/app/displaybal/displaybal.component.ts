import { Component, OnInit } from '@angular/core';
import { EosService } from '@/eosjs/EosService';
import { EosjsComponent } from '@/eosjs/eosjs.component';

@Component({
  selector: 'app-displaybal',
  templateUrl: './displaybal.component.html',
  styleUrls: ['./displaybal.component.css']
})
export class DisplaybalComponent implements OnInit {

  private eosjs_s : EosjsComponent;
  
  constructor() { 
    this.eosjs_s = new EosjsComponent();
  }

  ngOnInit() {
    
  }

  getbal () {
    alert("Pumasok! getbal");
    //EosService.get_account();
    
    alert("Pumasok! getbal 2");
  }
}
