import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Imovel } from 'src/app/models/Imovel';
import { ImovelService } from 'src/app/services/imovel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public imoveis: Imovel[] = [];
  constructor(private imovelService: ImovelService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.ImoveisCadastrados();
  }

  public imagemImovel(imagemURL: string): string {
    return (imagemURL !== '') ? `${environment.apiURL}resources/images/${imagemURL}`
      : 'assets/img/semImagem.jpeg';
  }

  public ImoveisCadastrados(): void{
    this.imovelService.getImoveis().subscribe({
      next: (imoveis: Imovel[]) => {
        this.imoveis = imoveis;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os imóveis', 'Erro!');
      },
      complete: () => this.spinner.hide()
    });
  }

  InformacaoImovel(id: number): void{
    this.router.navigate([`informacao/${id}`]);
  }

}
