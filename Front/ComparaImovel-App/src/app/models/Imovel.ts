import { Cliente } from './Cliente';
import { Preco } from './Preco';
import { RedeSocial } from './RedeSocial';

export interface Imovel {
    id: number;
    endereco: string;
    dataImovelCadastrado?: Date;
    nome: string;
    tipoImovel: string;
    descricaoImovel: string;
    qtdQuartos: number;
    area: string;
    imagemURL: string;
    telefone: string;
    email: string;
    precos: Preco[];
    redesSociais: RedeSocial[];
    clientesImoveis: Cliente[];

}
