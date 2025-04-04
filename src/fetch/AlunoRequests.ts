import { SERVER_CFG } from '../appConfig';

class AlunoRequests {

    private serverURL;
    private routeListaAluno;
    private routeCadastraAluno;
    private routeAtualizaAluno;
    private routeRemoveAluno;

    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;
        this.routeListaAluno = '/lista/alunos'; // Rota configurada na API
        this.routeCadastraAluno = '/novo/aluno'; // Rota configurada na API
        this.routeAtualizaAluno = '/atualiza/aluno'; // Rota configurada na API
        this.routeRemoveAluno = '/remove/aluno'; // Rota configurada na API
    }

    /**
     * Função que busca a lista de alunos na API
     * @returns Lista com os alunos cadastrados no sistema
     */
    async listarAlunos() {
        try {
            // faz a requisição no servidor
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaAluno}`);

            // verifica se a resposta é bem sucedida
            if(respostaAPI.ok) {
                // converte a reposta para um JSON
                const listaDeAlunos = await respostaAPI.json();
                // retorna a resposta
                return listaDeAlunos;
            }
        } catch (error) {
            // exibe detalhes do erro no console
            console.error(`Erro ao fazer a consulta: ${error}`);
            // retorna um valor nulo
            return null;
        }
    }
}

export default new AlunoRequests();