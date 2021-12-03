import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Imovel } from 'src/app/models/Imovel';

import { ToastrService } from 'ngx-toastr';

import { ImovelService } from 'src/app/services/imovel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-imovel-lista',
  templateUrl: './imovel-lista.component.html',
  styleUrls: ['./imovel-lista.component.scss']
})
export class ImovelListaComponent implements OnInit {

  modalRef = {} as BsModalRef;
  public imoveis: Imovel[] = [];
  public imoveisFiltrados: Imovel[] = [];
  public imovelId = 0;

  public larguraImagem = 50;
  public margemImagem = 2;
  public mostrarImagem = true;

  private filtroListado = '';

  public get filtroLista(): string{
    return this.filtroListado;
  }

  public set filtroLista(value: string){
    this.filtroListado = value;
    this.imoveisFiltrados = this.filtroLista ? this.filtrarImoveis(this.filtroLista) : this.imoveis;
  }


  filtrarImoveis(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.imoveis.filter(
      (imovel: any) => imovel.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      imovel.endereco.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
  }

  constructor(private imovelService: ImovelService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private router: Router) { }

  public ngOnInit(): void {
   this.spinner.show();
   this.carregarImoveis();
  }

  public alterarImagem(): void {
    this.mostrarImagem = !this.mostrarImagem;
  }

  public mostraImagem(imagemURL: string): string {
    return(imagemURL !== '')
    ? `${environment.apiURL}resources/images/${imagemURL}`
    : 'assets/img/semImagem.jpeg';
  }

   public carregarImoveis(): void {
     this.imovelService.getImoveis().subscribe({
       next: (imoveis: Imovel[]) => {
         this.imoveis = imoveis;
         this.imoveisFiltrados = this.imoveis;
       },
       error: (error: any) => {
         this.spinner.hide();
         this.toastr.error('Erro ao Carregar os Imóveis', 'Erro!');
       },
       complete: () => this.spinner.hide()
     });
     }

  openModal(event: any, template: TemplateRef<any>, imovelId: number): void {
    event.stopPropagation();
    this.imovelId = imovelId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }


  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.imovelService.deleteImovel(this.imovelId).subscribe(
      (result: any) => {
        if (result.message === 'Deletado'){
          this.toastr.success('O Imóvel foi deletado com sucesso', 'Deletado!');

          this.carregarImoveis();
        }
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(`Erro ao tentar deletar o evento ${this.imovelId}`, 'Erro');

      },
    ).add(() => this.spinner.hide());

  }


    decline(): void {
      this.modalRef.hide();
    }

    detalheImovel(id: number): void{
      this.router.navigate([`imoveis/detalhe/${id}`]);
    }


}
