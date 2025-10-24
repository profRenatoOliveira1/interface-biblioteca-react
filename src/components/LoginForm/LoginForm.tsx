import { JSX, useState } from 'react';
import estilo from './LoginForm.module.css';
import AuthRequests from '../../fetch/AuthRequests';
import { BiShow, BiHide } from "react-icons/bi";

function LoginForm(): JSX.Element {
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    interface LoginData {
        username: string;
        senha: string;
    }

    interface FormEvent {
        preventDefault: () => void;
    }

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        const login: LoginData = { username, senha };

        try {
            if (await AuthRequests.login(login)) {
                window.location.href = '/';
            }
        } catch (error) {
            console.error(`Erro ao tentar fazer login: ${error}`);
            alert('Erro ao fazer login, verifique se usuário e/ou senha estão corretos.');
        }
    };

    const alternarVisibilidadeSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    return (
        <section className={estilo['form-section']}>
            <h3>LOGIN</h3>

            <form action="submit" className={estilo['form-login']} onSubmit={handleSubmit}>
                <label>
                    Username
                    <input
                        type="text"
                        placeholder="Informe o seu username"
                        className={estilo['input-email-login']}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Senha
                    <div style={{ position: 'relative' }}>
                        <input
                            type={mostrarSenha ? 'text' : 'password'}
                            placeholder="Informe sua senha"
                            className={estilo['input-password-login']}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                        <span
                            onClick={alternarVisibilidadeSenha}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-25%)',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                            }}
                            aria-label="Mostrar ou ocultar senha"
                        >
                            {mostrarSenha ? <BiHide style={{ color: '#0e0e0e'}} /> : <BiShow style={{ color: '#0e0e0e'}} />}
                        </span>
                    </div>
                </label>

                <input
                    type="submit"
                    value="Entrar"
                    className={estilo['input-button-login']}
                />
            </form>
        </section>
    );
}

export default LoginForm;