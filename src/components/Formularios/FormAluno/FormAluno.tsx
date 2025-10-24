import { JSX, useState } from 'react';
import { InputMask } from 'primereact/inputmask';
import estilo from './FormAluno.module.css';
import AlunoRequests from '../../../fetch/AlunoRequests';

function FormAluno(): JSX.Element {
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        dataNascimento: '',
        endereco: '',
        email: '',
        celular: ''
    });

    // Função para atualizar o state
    const handleChange = (nome: string, valor: string) => {
        setFormData({ ...formData, [nome]: valor });
    };

    // função para recuperar dados do formulário e enviar para a requisição
    const handleSubmit = async (formData: { nome: string; sobrenome: string; dataNascimento: string; endereco: string; email: string; celular: string; }) => {
        const celularLimpo = formData.celular.replace(/\D/g, '');
        const formDataToSend = {
            ...formData,
            celular: celularLimpo,
            dataNascimento: formData.dataNascimento ? new Date(formData.dataNascimento) : undefined
        };

        const resposta = await AlunoRequests.enviaFormularioAluno(JSON.stringify(formDataToSend));

        if (resposta) {
            alert('Aluno cadastrado com sucesso.');
        } else {
            alert('Erro ao cadastrar aluno.');
        }
    }

    return (
        <section className={estilo['sec-form-aluno']}>
            <h1>Cadastro Aluno</h1>
            <form action="post" onSubmit={(e) => { e.preventDefault(); handleSubmit(formData); }}
                className={estilo['form-aluno']}
            >
                <div className={estilo['input-group']}>
                    <label htmlFor="">
                        Nome
                        <input
                            className={estilo['input-field']}
                            type="text"
                            name="nome"
                            id="nome"
                            required
                            minLength={3}
                            onChange={(e) => handleChange("nome", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Sobrenome
                        <input
                            className={estilo['input-field']}
                            type="text"
                            name="sobrenome"
                            id="sobrenome"
                            required
                            minLength={3}
                            onChange={(e) => handleChange("sobrenome", e.target.value)}
                        />
                    </label>
                </div>

                <div className={estilo['input-group']}>
                    <label htmlFor="">
                        Data de Nascimento
                        <input
                            className={estilo['input-field']}
                            type="date"
                            name="dataNascimento"
                            id="dataNascimento"
                            onChange={(e) => handleChange("dataNascimento", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Celular
                        <InputMask
                            className={estilo['input-field']}
                            mask="(99) 9 9999-9999"
                            placeholder="(16) 9 1234-5678"
                            name='celular'
                            id='celular'
                            minLength={10}
                            maxLength={13}
                            onChange={(e) => handleChange("celular", e.target.value ?? "")}
                        />
                    </label>
                </div>

                <div className={estilo['input-group']}>
                    <label htmlFor="">
                        Endereço
                        <input
                            className={estilo['input-field']}
                            type="text"
                            name="endereco"
                            id="endereco"
                            minLength={6}
                            onChange={(e) => handleChange("endereco", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        E-mail
                        <input
                            className={estilo['input-field']}
                            type="email"
                            name="email"
                            id="email"
                            minLength={11}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </label>
                </div>
                <input type="submit" value="ENVIAR" />
            </form>
        </section>
    );
}

export default FormAluno;