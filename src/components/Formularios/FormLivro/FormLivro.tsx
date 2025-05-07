import { JSX, useState } from "react";
import LivroRequests from "../../../fetch/LivroRequests";

function FormLivro(): JSX.Element {
    const [formData, setFormData] = useState({
        titulo: '',
        autor: '',
        editora: '',
        anoPublicacao: 0,
        isbn: '',
        quantTotal: 0,
        quantDisponivel: 0,
        valorAquisicao: 0
    });

    // Função para atualizar o state
    const handleChange = (nome: string, valor: string) => {
        setFormData({ ...formData, [nome]: valor });
    };

    // função para recuperar dados do formulário e enviar para a requisição
    const handleSubmit = async () => {
        const resposta = await LivroRequests.enviaFormularioLivro(JSON.stringify(formData));
        if (resposta) {
            alert('Livro cadastrado com sucesso.');
        } else {
            alert('Erro ao cadastrar livro.');
        }
    }

    return (
        <section>
            <form action="" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <label htmlFor="">
                    Título
                    <input
                        type="text"
                        name="titulo"
                        id="titulo"
                        required
                        onChange={(e) => handleChange("titulo", e.target.value)} />
                </label>

                <label htmlFor="">
                    Autor
                    <input
                        type="text"
                        name="autor"
                        id="autor"
                        required
                        onChange={(e) => handleChange("autor", e.target.value)} />
                </label>

                <label htmlFor="">
                    Editora
                    <input
                        type="text"
                        name="editora"
                        id="editora"
                        required
                        onChange={(e) => handleChange("editora", e.target.value)} />
                </label>

                <label htmlFor="">
                    Ano de Publicação
                    <input
                        type="number"
                        name="anoPublicacao"
                        id="anoPublicacao"
                        onChange={(e) => handleChange("anoPublicacao", e.target.value)} />
                </label>

                <label htmlFor="">
                    ISBN
                    <input
                        type="text"
                        name="isbn"
                        id="isbn"
                        onChange={(e) => handleChange("isbn", e.target.value)} />
                </label>

                <label htmlFor="">
                    Quantidade Total
                    <input
                        type="number"
                        name="quantTotal"
                        id="quantTotal"
                        required
                        onChange={(e) => handleChange("quantTotal", e.target.value)} />
                </label>

                <label htmlFor="">
                    Quantidade Disponível
                    <input
                        type="number"
                        name="quantDisponivel"
                        id="quantDisponivel"
                        required
                        onChange={(e) => handleChange("quantDisponivel", e.target.value)} />
                </label>

                <label htmlFor="">
                    Valor da Aquisição
                    <input
                        type="number"
                        name="valorAquisicao"
                        id="valorAquisicao"
                        step={0.01}
                        onChange={(e) => handleChange("valorAquisicao", e.target.value)} />
                </label>

                <input type="submit" value="ENVIAR" />
            </form>
        </section>
    );
}

export default FormLivro;