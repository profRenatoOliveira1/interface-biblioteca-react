import { JSX, useState, useEffect } from "react";
import AlunoDTO from "../../../interfaces/AlunoInterface";
import LivroDTO from "../../../interfaces/LivroInterface";
import AlunoRequests from "../../../fetch/AlunoRequests";
import LivroRequests from "../../../fetch/LivroRequests";
import { STATUS_EMPRESTIMO } from "../../../appConfig";
import EmprestimoRequests from "../../../fetch/EmprestimoRequests";
import estilo from './FormEmprestimo.module.css';

function FormEmprestimo(): JSX.Element {
    const [statusEmprestimo, setStatusEmprestimo] = useState<string[]>([]);
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
    const [livros, setLivros] = useState<LivroDTO[]>([]);
    const [formData, setFormData] = useState({
        idAluno: 0,
        idLivro: 0,
        dataEmprestimo: new Date().toISOString().slice(0, 10),
        dataDevolucao: '',
        statusEmprestimo: ''
    });

    // busca a lista de alunos e livros ao carregar o formulário
    useEffect(() => {
        /**
         * Busca a lista de alunos no servidor para preencher as opções do usuário
         */
        const fetchAlunos = async () => {
            try {
                const alunos: AlunoDTO | AlunoDTO[] | null = await AlunoRequests.listarAlunos();
                setAlunos(alunos ? (Array.isArray(alunos) ? alunos : [alunos]) : []);
            } catch (error) {
                console.error(`Erro ao recuperar lista de alunos. ${error}`);
                alert('Erro ao recuperar lista de alunos.');
            }
        };

        /**
         * Busca a lista de livros no servidor para preencher as opções do usuário
         */
        const fetchLivros = async () => {
            try {
                const livros: LivroDTO | LivroDTO[] | null = await LivroRequests.listarLivros();
                setLivros(livros ? (Array.isArray(livros) ? livros : [livros]) : []);
            } catch (error) {
                console.error(`Erro ao recuperar lista de livros. ${error}`);
                alert('Erro ao recuperar lista de livros');
            }
        }

        fetchAlunos();
        fetchLivros();
        setStatusEmprestimo(Object.values(STATUS_EMPRESTIMO))
    }, []);

    useEffect(() => {
        if (formData.dataEmprestimo && !formData.dataDevolucao) {
            const dataEmprestimo = new Date(formData.dataEmprestimo);
            const sugestaoDevolucao = new Date(dataEmprestimo);
            sugestaoDevolucao.setDate(dataEmprestimo.getDate() + 7);

            const dataFormatada = sugestaoDevolucao.toISOString().slice(0, 10);

            setFormData(prev => ({
                ...prev,
                dataDevolucao: dataFormatada
            }));
        }
    }, [formData.dataEmprestimo]);

    /**
     * Atualiza o valor do input
     * @param {*} e evento de atualização
     */
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    /**
     * Sumete o formulário à API
     * @param formData Dados preenchidos pelo usuário
     * @returns 
     */
    const handleSubmit = async (formData: { idAluno: number, idLivro: number, dataEmprestimo: string, dataDevolucao: string, statusEmprestimo: string }) => {
        if (new Date(formData.dataDevolucao) <= new Date(formData.dataEmprestimo)) {
            alert('A data de devolução deve ser posterior à data de empréstimo.');
            return;
        }

        const resposta = await EmprestimoRequests.enviaFormularioEmprestimo(formData);
        resposta
            ? alert('Empréstimo cadastrado com sucesso')
            : alert('Erro ao cadastrar empréstimo');
    };

    return (
        <section className={estilo['sec-form-emprestimo']}>
            <h1>Cadastro de Empréstimo</h1>
            <form action="" method="post"
                onSubmit={(e) => { e.preventDefault(); handleSubmit(formData); }}
                className={estilo['form-emprestimo']}>

                <div className={estilo['input-group']}>

                </div>

                <label htmlFor="">
                    Aluno
                    <select
                        value={formData.idAluno}
                        onChange={handleChange}
                        name="idAluno"
                        required
                    >
                        <option value="">Selecione o Aluno</option>
                        {alunos.map(aluno => (
                            <option key={aluno.idAluno} value={aluno.idAluno}>
                                {aluno.nome} {aluno.sobrenome}
                            </option>
                        ))}
                    </select>
                </label>

                <label htmlFor="">
                    Livro
                    <select
                        value={formData.idLivro}
                        onChange={handleChange}
                        name="idLivro"
                        required
                    >
                        <option value="">Selecione o Livro</option>
                        {livros.map(livro => (
                            <option key={livro.idLivro} value={livro.idLivro}>
                                {livro.titulo}
                            </option>
                        ))}
                    </select>
                </label>

                <label htmlFor="">
                    Data do empréstimo
                    <input
                        type="date"
                        value={formData.dataEmprestimo.slice(0, 10)}
                        name="dataEmprestimo"
                        id="dataEmprestimo"
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="">
                    Data de devolução
                    <input
                        type="date"
                        value={
                            formData.dataEmprestimo
                                ? new Date(
                                    new Date(formData.dataEmprestimo).setDate(
                                        new Date(formData.dataEmprestimo).getDate() + 7
                                    )
                                )
                                    .toISOString()
                                    .slice(0, 10)
                                : ''
                        }
                        name="dataDevolucao"
                        id="dataDevolucao"
                        readOnly
                    />
                </label>

                <label htmlFor="">
                    Status do empréstimo
                    <select
                        value={formData.statusEmprestimo}
                        onChange={handleChange}
                        name="statusEmprestimo"
                        required
                    >
                        <option value="">Selecione o Status do Empréstimo</option>
                        {statusEmprestimo.map((status, idx) => (
                            <option key={idx} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </label>

                <input type="submit" value="ENVIAR" />
            </form>
        </section>
    );
}

export default FormEmprestimo;