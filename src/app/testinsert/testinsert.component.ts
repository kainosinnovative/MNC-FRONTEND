

import { Component, OnInit } from '@angular/core';
import {Equipo, EquipoService} from '../shared/api.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-testinsert',
  templateUrl: './testinsert.component.html',
  styleUrls: ['./testinsert.component.scss']
})
export class TestinsertComponent implements OnInit {

  equipo: Equipo={
    id_equipo:'',
    nombre:'',
    logo:''
  };

  constructor(private EquipoService:EquipoService, private router:Router) { }

  ngOnInit(): void {
  }

  agregar(){
    delete this.equipo.id_equipo;

    this.EquipoService.addEquipo(this.equipo).subscribe();
    // this.router.navigate(['/inicio']);
  }

}

