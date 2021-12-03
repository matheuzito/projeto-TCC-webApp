import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ToastrService } from 'ngx-toastr';

import { ImovelService } from '../../services/imovel.service';
import { Imovel } from '../../models/Imovel';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-imoveis',
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.scss']
})
export class ImoveisComponent implements OnInit {

  public ngOnInit(): void {


  }
}
