import estilo from './Cabecalho.module.css';

function Cabecalho() {
    return (
        <header className={estilo.cabecalho}>
            <h1>Logotipo</h1>
            <a href="#">Login</a>
        </header>
    );
}

export default Cabecalho;