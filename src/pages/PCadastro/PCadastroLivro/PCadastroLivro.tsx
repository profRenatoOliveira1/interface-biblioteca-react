import { JSX } from "react";
import Cabecalho from "../../../components/Cabecalho/Cabecalho";
import FormLivro from "../../../components/Formularios/FormLivro/FormLivro";
import Rodape from "../../../components/Rodape/Rodape";

function PCadastroLivro(): JSX.Element {
    return (
        <div className="pagina-grid">
            <Cabecalho />
            <FormLivro />
            <Rodape />
        </div>
    );
}

export default PCadastroLivro;