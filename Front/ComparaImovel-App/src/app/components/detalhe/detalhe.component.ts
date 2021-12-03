import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Imovel } from 'src/app/models/Imovel';
import { Preco } from 'src/app/models/Preco';
import { ImovelService } from 'src/app/services/imovel.service';
import { PrecoService } from 'src/app/services/preco.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.scss']
})
export class DetalheComponent implements OnInit {

  imovelId: number;
  public precosDetalhe: Preco[] = [];
  imovel = {} as Imovel;
  form!: FormGroup;
  imagemURL = 'assets/img/upload.png';

  get precos(): FormArray{
    return this.form.get('precos') as FormArray;
  }

  get f(): any{
    return this.form.controls;
  }

  constructor(private activatedRouter: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private imovelService: ImovelService,
              private toastr: ToastrService,
              private precoService: PrecoService,
              private fb: FormBuilder
              ) { }

  ngOnInit(): void {
    this.detalheImovel();
    this.carregarPrecosDetalhe(this.imovelId);

    // let loader = new Loader({
    //   apiKey: 'AIzaSyDWfzrv_ZKqknp7z1iyriLSDsWfyKr63sM',
    //   // url: `https://www.google.com/maps/search/?&q=${this.imovel.endereco}`
    // })

    // loader.load().then(() =>{
    //   new google.maps.Map(document.getElementById("map"),{
    //     center: {lat: -8.762848301118039, lng: -63.895481222397116},
    //     zoom:15.33,
        
    //   })
    // })

  }

  public detalheImovel(): void{
    this.imovelId = +this.activatedRouter.snapshot.paramMap.get('id');

    if (this.imovelId !== null && this.imovelId !== 0){
      this.spinner.show();

      // this.estadoSalvar = 'put';

      this.imovelService.getImovelDetalheById(this.imovelId).subscribe({
        next: (imovel: Imovel) => {
          this.imovel = {...imovel};
          this.form.patchValue(this.imovel);
          if (this.imovel.imagemURL !== ''){
            this.imagemURL = environment.apiURL + 'resources/images/' + this.imovel.imagemURL;
          }
          // this.carregarPrecos();
          this.imovel.precos.forEach(preco => {
            // this.precos.push(this.criarPreco(preco));
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
          this.precos.push(this.criarPrecoDetalhe(preco));
        });
      },
      (error: any) => {
        this.toastr.error('Erro ao tentar carregar preços', 'Erro');
        console.log(error);
      }
    ).add(() => this.spinner.hide());
  }

  public mostraImagemDetalhe(imagemURL: string): string {
    return(imagemURL !== '')
    ? `${environment.apiURL}resources/images/${imagemURL}`
    : 'assets/img/semImagem.jpeg';
  }

   criarPrecoDetalhe(preco: Preco): FormGroup{
     return this.fb.group({
       id: [preco.id],
       descricao: [preco.descricao, Validators.required],
       valor:  [preco.valor, Validators.required]
     });
     }


     public carregarPrecosDetalhe(imovelid: number): void{
      this.precoService.getPrecosByImovelId(imovelid).subscribe({
        next: (precosDetalhe: Preco[]) => {
          this.precosDetalhe = precosDetalhe;
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao carregar os preços', 'Erro');
        },
        complete: () => this.spinner.hide()
      });
     }
}
