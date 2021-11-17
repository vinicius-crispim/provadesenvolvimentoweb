export type Carro = {
    id: number;
    nome: string,
    preço:number;
    marca:Marca;
    status:string;
}

export type Marca = {
    id: number,
    nome: string,
}
