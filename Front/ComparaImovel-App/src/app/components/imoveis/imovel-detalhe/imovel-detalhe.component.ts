import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Imovel } from 'src/app/models/Imovel';
import { Preco } from 'src/app/models/Preco';
import { ImovelService } from 'src/app/services/imovel.service';
import { PrecoService } from 'src/app/services/preco.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-imovel-detalhe',
  templateUrl: './imovel-detalhe.component.html',
  styleUrls: ['./imovel-detalhe.component.scss']
})
export class ImovelDetalheComponent implements OnInit {

  modalRef: BsModalRef;
  imovel = {} as Imovel;
  form!: FormGroup;
  estadoSalvar = 'post';
  precoAtual = {id: 0, descricao: '', indice: 0};
  imagemURL = 'assets/img/upload.png';
  imovelId: number;
  file: File[];

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put';
  }


  get precos(): FormArray{
    return this.form.get('precos') as FormArray;
  }

  get f(): any{
    return this.form.controls;
  }

  constructor(private fb: FormBuilder,
              private localeService: BsLocaleService,
              private activatedRouter: ActivatedRoute,
              private imovelService: ImovelService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private modalService: BsModalService,
              private router: Router,
              private precoService: PrecoService )
              {
                this.localeService.use('pt-br');
              }

              public carregarImovel(): void{
                this.imovelId = +this.activatedRouter.snapshot.paramMap.get('id');

                if (this.imovelId !== null && this.imovelId !== 0){
                  this.spinner.show();

                  this.estadoSalvar = 'put';

                  this.imovelService.getImovelById(this.imovelId).subscribe({
                    next: (imovel: Imovel) => {
                      this.imovel = {...imovel};
                      this.form.patchValue(this.imovel);
                      if (this.imovel.imagemURL !== ''){
                        this.imagemURL = environment.apiURL + 'resources/images/' + this.imovel.imagemURL;
                      }
                     // this.carregarPrecos();
                      this.imovel.precos.forEach(preco => {
                        this.precos.push(this.criarPreco(preco));
                      });
                    },
                    error: (error: any) => {
                      this.toastr.error('Erro ao tentar carregar Imóvel');
                      console.error(error);
                    },
                  }).add(() => this.spinner.hide());
                }
              }


  public carregarPrecos(): void {
    this.precoService.getPrecosByImovelId(this.imovelId).subscribe(
      (precosRetorno: Preco[]) => {
        precosRetorno.forEach(preco => {
          this.precos.push(this.criarPreco(preco));
        });
      },
      (error: any) => {
        this.toastr.error('Erro ao tentar carregar preços', 'Erro');
        console.log(error);
      }
    ).add(() => this.spinner.hide());
  }



  ngOnInit(): void {
    this.carregarImovel();
    this.validation();
  }

  get bsConfig(): any{
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-default',
      showWeekNumbers: false,
      // showTodayButton: true
   };
  }



  public validation(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      endereco: ['', Validators.required],
      dataImovelCadastrado: ['', Validators.required],
      tipoImovel: ['', Validators.required],
      area: ['', Validators.required],
      descricaoImovel: ['', Validators.required],
      qtdQuartos: ['', [Validators.required, Validators.max(4)]],
      imagemURL: [''],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      precos: this.fb.array([])
    });
  }

  adicionarPreco(): void {
    this.precos.push(this.criarPreco({id: 0} as Preco));
  }

  criarPreco(preco: Preco): FormGroup{
    return this.fb.group({
      id: [preco.id],
      descricao: [preco.descricao, Validators.required],
      valor:  [preco.valor, Validators.required]
    });
    }

    public retornaTituloPreco(descricao: string): string{
      return descricao === null || descricao === '' ? 'Descrição do imóvel' : descricao;
    }


  public resetForm(): void{
    this.form.reset();
  }

  public salvarImovel(): void{
    this.spinner.show();
    if (this.form.valid){

      if (this.estadoSalvar === 'post'){
        this.imovel = {...this.form.value};
        this.imovelService['post'](this.imovel).subscribe(
          (imovelRetorno: Imovel) => {
          this.toastr.success('Imóvel salvo com sucesso!', 'Sucesso');
          this.router.navigate([`imoveis/detalhe/${imovelRetorno.id}`]);
        },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao salvar imóvel', 'Erro');
          },
          () => this.spinner.hide()
        );
      } else {
        this.imovel = {id: this.imovel.id, ...this.form.value};
        this.imovelService['put'](this.imovel).subscribe(
          () => this.toastr.success('Imóvel salvo com sucesso!', 'Sucesso'),
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao salvar imóvel', 'Erro');
          },
          () => this.spinner.hide()
        );
      }


    }
  }

  public salvarPrecos(): void{
    if (this.form.controls.precos.valid){
      this.spinner.show();
      this.precoService
      .savePreco(this.imovelId, this.form.value.precos)
      .subscribe(
        () => {
          this.toastr.success('Preços salvos com sucesso!', 'Sucesso');
        },
        (error: any) => {
          this.toastr.error('Erro ao tentar salvar Preço.', 'Erro');
          console.log(error);
        },
        () => {}
      ).add(() => this.spinner.hide());
    }
  }


  public removerPreco(template: TemplateRef<any>, indice: number): void{

    this.precoAtual.id = this.precos.get(indice + '.id').value;
    this.precoAtual.descricao = this.precos.get(indice + '.descricao').value;
    this.precoAtual.indice = indice;

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});


  }

  confirmDeletePreco(): void{
    this.modalRef.hide();
    this.spinner.show();

    this.precoService.deletePreco(this.imovelId, this.precoAtual.id)
      .subscribe(
        () => {
         this.toastr.success('Preço deletado com sucesso', 'Sucesso');
         this.precos.removeAt(this.precoAtual.indice);
        },
        (error: any) => {
          this.toastr.error(`Erro ao tentar deletar o Preço ${this.precoAtual.id}`, 'Erro');
          console.error(error);
        }
      ).add(() => this.spinner.hide());
  }

  declineDeletePreco(): void{
    this.modalRef.hide();
  }

  onFileChange(imov: any): void{
    const reader = new FileReader();

    reader.onload = (event: any) => this.imagemURL = event.target.result;

    this.file = imov.target.files;
    reader.readAsDataURL(this.file[0]);

    this.uploadImage();
  }


  uploadImage(): void {
    this.spinner.show();
    this.imovelService.postUpload(this.imovelId, this.file).subscribe(
      () => {
        // this.carregarImovel();
        this.toastr.success('Imagem atualizada com Sucesso', 'Sucesso!');
      },
      (error: any) => {
        this.toastr.error('Erro ao fazer upload de imagem', 'Erro!');
        console.log(error);
      }
    ).add(() => this.spinner.hide());
  }


}
