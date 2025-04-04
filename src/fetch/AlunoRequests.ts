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
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaAluno}`);

            if(respostaAPI.ok) {
                const listaDeAlunos = await respostaAPI.json();
                return listaDeAlunos;
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta: ${error}`);
            return null;
        }
    }
}

export default new AlunoRequests();