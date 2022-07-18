import { expect } from "@jest/globals";
import pegaArquivo from "../index.js";

const arrayResult = [
  {
    FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
  }
]

describe('pegaArquivo::', () => {
  it('deve ser uma função', () => {
    expect(typeof pegaArquivo).toBe('function')
  })
  it('deve retornar array com ressultados', async () => {
    const resultado = await pegaArquivo('./test/arquivos/texto1.md');
    expect(resultado).toEqual(arrayResult)
  })
  it('deve retornar "Não há links"', async () => {
    const resultado = await pegaArquivo('./test/arquivos/texto1_semlinks.md');
    expect(resultado).toBe('Não há links');
  })
  it('deve lançar um erro na falta de arquivo', async () => {
    await expect(pegaArquivo('./test/arquivos/')).rejects.toThrow(/Não há arquivo/);
  })
  it('deve resolver a função com sucesso', async () => {
    await expect(pegaArquivo('./test/arquivos/texto1.md')).resolves.toEqual(arrayResult)
  })
})