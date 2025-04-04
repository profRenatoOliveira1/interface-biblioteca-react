import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import AlunoRequests from '../../../fetch/AlunoRequests';
import estilo from './TabelaAluno.module.css';


function TabelaAluno() {
    const [alunos, setAlunos] = useState([]);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const listaDeAlunos = await AlunoRequests.listarAlunos();
                console.table(listaDeAlunos);
                setAlunos(listaDeAlunos);
            } catch (error) {
                console.error(`Erro ao buscar alunos: ${error}`);
            }
        };
        fetchAlunos();
    }, [alunos]);

    return (
        <>
            <DataTable value={alunos} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                className={estilo['data-table']}
            >
                <Column field="nome" header="Nome" style={{ width: '25%' }}></Column>
                <Column field="sobrenome" header="Sobrenome" style={{ width: '25%' }}></Column>
                <Column field="endereco" header="Endereço" style={{ width: '25%' }}></Column>
                <Column field="email" header="E-mail" style={{ width: '25%' }}></Column>
                <Column
                    field="dataNascimento"
                    header="Data Nascimento"
                    style={{ width: '25%' }}
                    body={(rowData) => {
                        const data = new Date(rowData.dataNascimento);
                        const dia = String(data.getDate()).padStart(2, '0');
                        const mes = String(data.getMonth() + 1).padStart(2, '0');
                        const ano = data.getFullYear();
                        return `${dia}/${mes}/${ano}`;
                    }}
                ></Column>
                <Column
                    field="celular"
                    header="Celular"
                    style={{ width: '25%' }}
                    body={(rowData) => {
                        const celular = rowData.celular?.replace(/\D/g, ''); // remove tudo que não for número
                        if (!celular || celular.length < 10) return celular; // se for inválido, retorna como está

                        // Formato: (00) 0 0000-0000
                        return celular.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
                    }}
                ></Column>

            </DataTable>
        </>
    );
}

export default TabelaAluno;