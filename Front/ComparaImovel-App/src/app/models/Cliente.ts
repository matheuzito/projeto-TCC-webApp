import { Imovel } from './Imovel';
import { RedeSocial } from './RedeSocial';

export interface Cliente {
    id: number;
    nome: string;
    ocupacao: string;
    imagemURL: string;
    telefone: string;
    email: string;
    redesSociais: RedeSocial[];
    clientesImoveis: Imovel[];

}
