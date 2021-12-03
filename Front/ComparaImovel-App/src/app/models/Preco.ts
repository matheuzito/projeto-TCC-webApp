import { Imovel } from './Imovel';

export interface Preco {
    id: number;
    descricao: string;
    valor: number;
    imovelId: number;
    imovel: Imovel;
}
