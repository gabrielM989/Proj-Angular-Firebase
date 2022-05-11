export interface Cargo{
    id?: string, // Tendo em vista que em alguns momentos o ID será nulo, precisamos colocar o ?
    cargo: string,
    descricao: string,
    salarioBase: number

}