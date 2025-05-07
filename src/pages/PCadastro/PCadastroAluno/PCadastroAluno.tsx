import Cabecalho from "../../../components/Cabecalho/Cabecalho";
import FormAluno from "../../../components/Formularios/FormAluno/FormAluno";
import Rodape from "../../../components/Rodape/Rodape";

function PCadastroAluno() {
    return (
        <div className="pagina-grid">
            {/* Renderiza o cabeçalho da página */}
            <Cabecalho />

            {/* Renderiza o formulário de login */}
            <FormAluno />

            {/* Renderiza o rodapé da página */}
            <Rodape />
        </div>
    );
}

export default PCadastroAluno;