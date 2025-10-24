import { SERVER_CFG, APP_ROUTES } from '../appConfig';

class UsuarioRequests {
    private serverUrl: string;
    private routeCadastroUsuario: string;

    /**
     * Construtor das rotas e do endereço do servidor
     */
    constructor() {
        // endereço do servidor
        this.serverUrl = SERVER_CFG.SERVER_URL;
        // rota do servidor
        this.routeCadastroUsuario = SERVER_CFG.ENDPOINT_CADASTRO_USUARIO;
    }

    // criar função para enviar formulário do aluno
    
}

export default new UsuarioRequests();