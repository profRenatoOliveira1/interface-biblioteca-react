// Importa as configurações do servidor (como a URL base da API)
import { SERVER_CFG } from "../appConfig";
import EmprestimoDTO from "../interfaces/EmprestimoInterface";

/**
 * Classe responsável por fazer as requisições da entidade Empréstimo.
 * Com essa classe, conseguimos listar, cadastrar, atualizar e remover empréstimos no sistema.
 */
class EmprestimoRequests {

    private serverURL: string;                  // Variável para o endereço do servidor
    private routeListaEmprestimos: string;      // Variável para a rota de listagem de empréstimos
    private routeCadastraEmprestimo: string;    // Variável para a rota de cadastro de empréstimo
    private routeAtualizaEmprestimo: string;    // Variável para a rota de atualiação de aluno
    private routeRemoveEmprestimo: string;      // Variável para a rota de remoção do aluno

    /**
     * O construtor é executado automaticamente quando a classe é instanciada.
     * Ele define as rotas e configurações iniciais, com base na configuração do servidor.
     */
    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;               // Endereço do servidor web
        this.routeListaEmprestimos = SERVER_CFG.ENDPOINT_LISTAR_EMPRESTIMOS;    // Rota para buscar todos os empréstimos
        this.routeCadastraEmprestimo = SERVER_CFG.ENDPOINT_CADASTRAR_EMPRESTIMO;    // Rota para cadastrar um novo empréstimo
        this.routeAtualizaEmprestimo = SERVER_CFG.ENDPOINT_ATUALIZAR_EMPRESTIMO;// Rota para atualizar um empréstimo existente
        this.routeRemoveEmprestimo = SERVER_CFG.ENDPOINT_REMOVER_EMPRESTIMO;    // Rota para remover um empréstimo
    }

    /**
     * Método assíncrono que faz uma requisição GET para a API buscando todos os empréstimos cadastrados.
     * @returns Um objeto JSON contendo a lista de empréstimos, ou null em caso de erro
     */
    async listarEmprestimos(): Promise<EmprestimoDTO | null> {
        const token = localStorage.getItem('token'); // recupera o token do localStorage
        try {
            // Envia a requisição para a rota de listagem de empréstimos
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaEmprestimos}`, {
                headers: {
                    'x-access-token': `${token}`
                }
            });

            // Verifica se a resposta foi bem-sucedida (status HTTP 200-299)
            if (respostaAPI.ok) {
                // Converte a resposta em JSON
                const listaDeEmprestimos: EmprestimoDTO = await respostaAPI.json();

                // Retorna a lista obtida
                return listaDeEmprestimos;
            }

            // retorna um valor nulo caso o servidor não envie a resposta
            return null;
        } catch (error) {
            // Exibe o erro no console, útil para depuração
            console.error(`Erro ao fazer a consulta de livros: ${error}`);

            // Retorna null em caso de falha
            return null;
        }
    }

    /**
     * Envia os dados do formulário de empréstimo para a API
     * @param formEmprestimo Objeto com os valores do formulário
     * @returns **true** se cadastro com sucesso, **false** se falha
     */
    async enviaFormularioEmprestimo(formEmprestimo: object): Promise<boolean> {
        const token = localStorage.getItem('token'); // recupera o token do localStorage
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeCadastraEmprestimo}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formEmprestimo)
            });

            if (!respostaAPI.ok) {
                throw new Error('Erro ao fazer requisiççao com o servidor.');
            }

            return true;
        } catch (error) {
            console.error(`Erro ao enviar formulário. ${error}`);
            return false;
        }
    }

    /**
     * Envia requisição para a API solicitando a remoção de um recurso
     * @param idEmprestimo ID do empréstimo a ser removido
     * @returns **true** se cadastro com sucesso, **false** se falha
     */
    async removerEmprestimo(idEmprestimo: number): Promise<boolean> {
        const token = localStorage.getItem('token');
        try {
            const repostaAPI = await fetch(`${this.serverURL}${this.routeRemoveEmprestimo}?idEmprestimo=${idEmprestimo}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (!repostaAPI.ok) {
                throw new Error('Erro ao fazer requisição com o servidor.');
            }

            return true;
        } catch (error) {
            console.error(`Erro ao remover empréstimo. ${error}`);
            return false;
        }
    }

    /**
     * Envia os dados de atualização do formulário empréstimo para a API
     * @param formEmprestimo Objeto com os valores do formulário
     * @returns **true** se cadastro com sucesso, **false** se falha
     */
    async enviarFormularioAtualizacaoEmprestimo(formEmprestimo: EmprestimoDTO): Promise<boolean> {
        const token = localStorage.getItem('token');

        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeAtualizaEmprestimo}?idEmprestimo=${formEmprestimo.idEmprestimo}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formEmprestimo)
            });

            if (!respostaAPI.ok) throw new Error('Erro ao fazer requisição para o servidor.');

            return true;
        } catch (error) {
            console.error(`Erro ao enviar o formuário. ${error}`);
            return false;
        }
    }
}

// Exporta a classe já instanciada, pronta para ser utilizada em outras partes do sistema
export default new EmprestimoRequests();
