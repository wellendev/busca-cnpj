import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { CepService } from './cep.service';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.css']
})
export class CepComponent implements OnInit {
  @Input() titleHome = 'Consultando CEP';
  buscacep: string = '';
  buscar: boolean = false;
  constructor(
    private cepService: CepService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Buscando CEP');
  }

  buscarCEP(buscacep: any, form: any) {
    if (buscacep !== null && buscacep !== '' && buscacep >= 8) {
      this.cepService.consultaCEP(buscacep).subscribe({
        next: (dados: any) => {
          this.buscar = true;
          setTimeout(() => {
            this.populaCEPForm(dados, form);
            console.log('cheguei aqui');
          }, 100);
        },
        error: (e: any) => {
          this.resetaCEPForm(form);
          this.buscar = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Atenção',
            detail: 'Erro ao busca CEP!'
          });
        }
      })
    }
  }

  populaCEPForm(dados: any, formulario: any) {
    console.log('entrei no populacep');
    console.log('dados antes', dados);
    formulario.form.patchValue({
      logradouro: dados.street,
      cidade: dados.city,
      bairro: dados.neighborhood,
      estado: dados.state
    })
    console.log('dados depois', dados);
  }

  resetaCEPForm(formulario: any) {
    formulario.form.patchValue({
      logradouro: null,
      cidade: null,
      bairro: null,
      estado: null
    })
    this.buscar = false;
  }
}
