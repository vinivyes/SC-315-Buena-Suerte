import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Proyecto-Loteria';

//#region - Generacion de Numeros
  prob;

  term_comb = 2;
  term_num = "000";
  
  emp_comb = 2;
  emp_num = "000";

  inc_comb = 2;
  inc_num = "000";

  posibilidad_por_casa = 10;

  casas = new FormControl(3);

  termCombForm = new FormControl('',[
    Validators.required,
    Validators.pattern("^[0-9]*$"),
    Validators.maxLength(this.casas.value)
  ]);
  empCombForm = new FormControl('',[
    Validators.required,
    Validators.pattern("^[0-9]*$"),
    Validators.maxLength(this.casas.value)
  ]);
  incCombForm = new FormControl('',[
    Validators.required,
    Validators.pattern("^[0-9]*$"),
    Validators.maxLength(this.casas.value)
  ]);
  jugarCombForm = new FormControl('',[
    Validators.required,
    Validators.pattern("^[0-9]*$"),
    Validators.maxLength(this.casas.value)
  ]);

  
  numerojugar;

  constructor(){
    this.termCombForm.valueChanges.subscribe((s) => {
      this.CantidadCombinacionesTerm();
    })
    this.empCombForm.valueChanges.subscribe((s) => {
      this.CantidadCombinacionesEmp();
    })
    this.incCombForm.valueChanges.subscribe((s) => {
      this.CantidadCombinacionesInc();
    })
    this.casas.valueChanges.subscribe(() => {
      this.InicializarNumeros();
      this.CantidadCombinacionesTerm();
      this.CantidadCombinacionesEmp();
      this.CantidadCombinacionesInc();
      this.ProbabilidadGanar();
    })
    this.jugarCombForm.valueChanges.subscribe(() => {
      this.numerojugar = this.jugarCombForm.value;
    })


    this.CantidadCombinacionesInc();
    this.CantidadCombinacionesEmp();
    this.CantidadCombinacionesTerm();
    this.InicializarNumeros();
    
    this.ProbabilidadGanar();
  }
  InicializarNumeros(){
    this.term_num = "";
    this.emp_num = "";
    this.inc_num = "";
    for(let c = 0; c < this.casas.value; c++){
      this.term_num = "0" + this.term_num;
      this.emp_num = "0" + this.emp_num;
      this.inc_num = "0" + this.inc_num;
    }
    this.termCombForm.setValidators([
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.maxLength(this.casas.value)
    ]);
    this.empCombForm.setValidators([
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.maxLength(this.casas.value)
    ]);
    this.incCombForm.setValidators([
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.maxLength(this.casas.value)
    ]);
    this.jugarCombForm.setValidators([
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.maxLength(this.casas.value)
    ]);
  }
  CantidadCombinacionesTerm(){
    let cantidad_a_generar = this.casas.value-this.termCombForm.value.length;

    let posibilidades = 1;

    for(let i = 0; i < cantidad_a_generar; i++){
      posibilidades = posibilidades * this.posibilidad_por_casa;
    }
    
    this.term_comb = posibilidades;
  }

  CantidadCombinacionesEmp(){
    let cantidad_a_generar = this.casas.value-this.empCombForm.value.length;

    let posibilidades = 1;

    for(let i = 0; i < cantidad_a_generar; i++){
      posibilidades = posibilidades * this.posibilidad_por_casa;
    }
    
    this.emp_comb = posibilidades;
  }

  CantidadCombinacionesInc(){
    let cantidad_a_generar = this.casas.value-this.incCombForm.value.length;

    let posibilidades = 1;

    for(let i = 0; i < cantidad_a_generar; i++){
      posibilidades = posibilidades * this.posibilidad_por_casa;
    }
    
    this.inc_comb = posibilidades;
  }


  ProbabilidadGanar(){
    let posibilidades = 1;

    for(let i = 0; i < this.casas.value; i++){
      posibilidades = posibilidades * this.posibilidad_por_casa;
    }
    
    this.prob = `${(1 / posibilidades) * 100}%`;

  }

  GenerarTerm(){
    let cantidad_a_generar = this.casas.value-this.termCombForm.value.length;

    let numero_azar = "";

    for(let i = 0; i < cantidad_a_generar; i++){
      numero_azar = numero_azar + Math.floor(Math.random() * this.posibilidad_por_casa);
    }

    numero_azar = numero_azar + this.termCombForm.value;

    this.term_num = numero_azar
    this.jugarCombForm.setValue(numero_azar);
  }

  GenerarEmp(){
    let cantidad_a_generar = this.casas.value-this.empCombForm.value.length;

    let numero_azar = this.empCombForm.value;

    for(let i = 0; i < cantidad_a_generar; i++){
      numero_azar = numero_azar + Math.floor(Math.random() * this.posibilidad_por_casa);
    }

    this.emp_num = numero_azar
    this.jugarCombForm.setValue(numero_azar);

  }

  GenerarInc(){
    let casa_inicio_azar = Math.floor(Math.random() * (this.casas.value))

    while(casa_inicio_azar + this.incCombForm.value.length > (this.casas.value)){
      casa_inicio_azar = Math.floor(Math.random() * (this.casas.value))
    }

    let numero_azar = "";

    for(let c = 0; c < this.casas.value; c++){
      if(c >= casa_inicio_azar && c <= (casa_inicio_azar + (this.incCombForm.value.length - 1))){
        numero_azar = numero_azar + this.incCombForm.value[c - casa_inicio_azar];
      }
      else{
        numero_azar = numero_azar + Math.floor(Math.random() * this.posibilidad_por_casa);
      }
    }

    this.inc_num = numero_azar
    this.jugarCombForm.setValue(numero_azar);

  }

displayedColumns: string[] = ['fecha', 'numero', 'loteria', 'resultado'];
dataSource = new MatTableDataSource([]);
juegos = []
//#endregion - Generacion de Numeros
JugarLoteria(){
  let orig_length =  this.jugarCombForm.value.length
  for(let c = 0; c < this.casas.value - orig_length; c++){
    this.jugarCombForm.setValue("0" + this.jugarCombForm.value);
  }

  let juego = this.Loteria()
  this.juegos.unshift({timestamp:new Date().toLocaleString('en-US'),num:this.numerojugar,gano:juego.res,gen:juego.gen})
  this.dataSource = new MatTableDataSource(this.juegos);
}

LimpiarLoteria(){
  this.juegos = [];
  this.dataSource = new MatTableDataSource(this.juegos);
}

Loteria () {
  let numerorandom =  Math.floor(Math.random()*(Math.pow(10,this.casas.value)-1)).toString();
  let orig_length =  numerorandom.length
  for(let c = 0; c < this.casas.value - orig_length; c++){
    numerorandom = "0" + numerorandom;
  }
  return {gen:numerorandom,res:(this.numerojugar == numerorandom)};        
}



}
