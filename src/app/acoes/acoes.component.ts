import { switchMap, tap } from 'rxjs/operators';
import { AcoesService } from './acoes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes();

  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado))
  );

  acoes$ = merge(this.todasAcoes$, this.filtroPeloInput$);

  constructor(private acoesService: AcoesService) {}
}
