// Importa os hooks e componentes necessários
import { JSX, useEffect, useState } from 'react'; // Hooks do React para trabalhar com estado e efeitos colaterais

// Importa os componentes da biblioteca PrimeReact
import { DataTable } from 'primereact/datatable'; // Componente de tabela da biblioteca PrimeReact
import { Column } from 'primereact/column'; // Componente de coluna da tabela

// Importa o serviço responsável pelas requisições relacionadas a alunos
import AlunoRequests from '../../../fetch/AlunoRequests'; // Importa a classe responsável pelas requisições dos alunos

// Importa o arquivo CSS com estilos específicos para este componente
import estilo from './TabelaAluno.module.css'; // Importa os estilos específicos para este componente
import AlunoDTO from '../../../interfaces/AlunoInterface';
import { APP_ROUTES } from '../../../appConfig';

/**
 * Componente que exibe uma tabela com os dados dos alunos.
 * Os dados são carregados da API assim que o componente é montado na tela.
 */
function TabelaAluno(): JSX.Element {
    // Hook useState: cria uma variável de estado chamada `alunos` para armazenar os dados dos alunos
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);

    /**
     * Hook useEffect: executa a função `fetchAlunos` assim que o componente for renderizado.
     * A função busca os alunos na API e armazena no estado.
     */
    useEffect(() => {
        const fetchAlunos = async () => {   // função para fazer a consulta de alunos
            try {
                const listaDeAlunos = await AlunoRequests.listarAlunos(); // Requisição à API
                setAlunos(Array.isArray(listaDeAlunos) ? listaDeAlunos : []); // Atualiza o estado com os dados
            } catch (error) {
                console.error(`Erro ao buscar alunos: ${error}`); // Exibe erro no console se a requisição falhar
            }
        };

        fetchAlunos();  // Executa a função de busca
    }, []); // Array vazio garante que será executado apenas uma vez (montagem do componente)

    /**
     * Função para remover aluno
     */
    const deletar = async (aluno: AlunoDTO) => {
        const confirmar = window.confirm(`Deseja mesmo deletar ${aluno.nome}?`);

        if (confirmar && typeof aluno.idAluno === 'number') {
            const removido = await AlunoRequests.removerAluno(aluno.idAluno);
            if (removido) {
                // Atualize a lista de alunos após remoção, se necessário
                // setAlunos((prevAlunos) => prevAlunos.filter(a => a.idAluno !== aluno.idAluno));
                window.location.reload();
            } else {
                alert('Erro ao remover aluno.');
            }
        } else if (confirmar) {
            alert('ID do aluno inválido.');
        }
    }

    return (
        <main>
            {/* Título da tabela com classe personalizada */}
            <h1 className={estilo['header-tabela-aluno']}>Lista de Alunos</h1>
            <a
                href={APP_ROUTES.ROUTE_CADASTRO_ALUNO}
                className={estilo['anc-pag-cadastro']}
            >
                CADASTRAR ALUNO
            </a>

            {/* Componente DataTable: renderiza a tabela com os dados dos alunos */}
            <DataTable
                value={alunos} // Define os dados que serão exibidos
                paginator // Habilita paginação
                rows={5} // Quantidade de linhas por página
                rowsPerPageOptions={[5, 10, 25, 50]} // Opções de linhas por página
                tableStyle={{ minWidth: '50rem' }} // Estilização mínima da tabela
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" // Template da paginação
                currentPageReportTemplate="{first} de {last} total {totalRecords}" // Template do relatório da página
                className={estilo['data-table']} // Classe CSS personalizada
            >
                {/* Colunas da tabela, baseadas nos campos dos objetos de aluno */}
                <Column field="nome" header="Nome" headerStyle={{ backgroundColor: 'var(--cor-primaria)', color: 'var(--font-color)' }} style={{ width: '15%', color: 'var(--font-color)' }} />
                <Column field="sobrenome" header="Sobrenome" headerStyle={{ backgroundColor: 'var(--cor-primaria)', color: 'var(--font-color)' }} style={{ width: '15%', color: 'var(--font-color)' }} />
                <Column field="endereco" header="Endereço" headerStyle={{ backgroundColor: 'var(--cor-primaria)', color: 'var(--font-color)' }} style={{ width: '20%', color: 'var(--font-color)' }} />
                <Column field="email" header="E-mail" headerStyle={{ backgroundColor: 'var(--cor-primaria)', color: 'var(--font-color)' }} style={{ width: '20%', color: 'var(--font-color)' }} />

                {/* Coluna personalizada para exibir a data formatada */}
                <Column
                    field="dataNascimento"
                    header="Data Nascimento"
                    headerStyle={{ backgroundColor: 'var(--cor-primaria)', color: 'var(--font-color)' }}
                    style={{ width: '15%', color: 'var(--font-color)' }}
                    body={(rowData) => {
                        const data = new Date(rowData.dataNascimento);
                        const dia = String(data.getDate()).padStart(2, '0');
                        const mes = String(data.getMonth() + 1).padStart(2, '0');
                        const ano = data.getFullYear();
                        return `${dia}/${mes}/${ano}`;
                    }}
                />

                {/* Coluna personalizada para exibir o celular formatado */}
                <Column
                    field="celular"
                    header="Celular"
                    headerStyle={{ backgroundColor: 'var(--cor-primaria)', color: 'var(--font-color)' }}
                    style={{ width: '15%', color: 'var(--font-color)' }}
                    body={(rowData) => {
                        const celular = rowData.celular?.replace(/\D/g, '');
                        if (!celular || celular.length < 10) return celular;
                        return celular.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
                    }}
                />
                <Column
                    field="idAluno"
                    header="Ação"
                    headerStyle={{ backgroundColor: 'var(--cor-primaria)', color: 'var(--font-color)' }}
                    style={{ width: '15%', color: 'var(--font-color)' }}
                    body={(rowdata) => (
                        <>
                            <button 
                                style={{ width: '100%' }}
                                onClick={() => alert(`Atualizar ${rowdata.idAluno}`)}
                            >
                                Atualizar
                            </button>
                            <button 
                                style={{ width: '100%' }}
                                onClick={() => deletar(rowdata)}    
                            >
                                Deletar
                            </button>
                        </>
                    )}
                />
            </DataTable>
        </main>
    );
}

export default TabelaAluno;
