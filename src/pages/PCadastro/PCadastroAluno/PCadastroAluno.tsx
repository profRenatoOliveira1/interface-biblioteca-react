import Cabecalho from "../../../components/Cabecalho/Cabecalho";
import FormAluno from "../../../components/Formularios/FormAluno/FormAluno";
import Rodape from "../../../components/Rodape/Rodape";

import FormEmprestimo from "../../../components/Formularios/FormEmprestimo/FormEmprestimo";

function PCadastroAluno() {
    return (
        <div className="pagina-grid">
            {/* Renderiza o cabeçalho da página */}
            <Cabecalho />

            {/* Renderiza o formulário de login */}
            {/* <FormAluno /> */}
            <FormEmprestimo />

            {/* Renderiza o rodapé da página */}
            <Rodape />
        </div>
    );
}

export default PCadastroAluno;