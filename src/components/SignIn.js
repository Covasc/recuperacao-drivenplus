import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner';

export default function SignIn () {

    const disable = false;
    const signInURL = 'https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up';
    const navigate = useNavigate();
    const [entry, setEntry] = useState({email:"", name:"", cpf:"", password:""});

    function sendObject() {
        
        console.log(entry);
        const promisse = axios.post(signInURL, entry);

        promisse.then((response) => {
            alert('Conta criada com sucesso. Faça o Login para acessar');
            navigate('/');
        });
        promisse.catch(() => {
            alert('Informações inválidas. Verifique as entradas e tente novamente');
        });
    }

    return (
        <Logon>
            <div></div>
            <input type='text' placeholder='Nome' onChange={(e) => setEntry({...entry ,name: e.target.value})} value={entry.name}></input>
            <input type='text' placeholder='CPF' onChange={(e) => setEntry({...entry ,cpf: e.target.value})} value={entry.cpf}></input>
            <input type='email' placeholder='E-mail' onChange={(e) => setEntry({...entry ,email: e.target.value})} value={entry.email}></input>
            <input type='password' placeholder='Senha' onChange={(e) => setEntry({...entry, password: e.target.value})} value={entry.password}></input>
            <button onClick={sendObject}> { disable === false ? "CADASTRAR" : <ThreeDots color="white" height={80} width={80} />} </button>
            <a onClick={() => navigate('/')}>Já possui uma conta? Faça Login</a>
        </Logon>
    )
}

const Logon = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 0 38px;
    
    div {
        margin-top: 147px;
    }

    input {
        width: 299px;
        height: 52px;
        border: 1px solid #D5D5D5;
        border-radius: 8px;
        padding: 9px;
        font-size: 14px;
        margin-bottom: 16px;

        ::placeholder {
            color: #7E7E7E;
        }
    }

    button {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 299px;
        height: 52px;
        border-radius: 8px;
        background: #FF4791;
        font-size: 14px;
        
        color: white;
        margin: 8px 0 24px 0;
        border: 0px none;
    }

    a {
        cursor: pointer;
        font-size: 14px;
        color: white;
        font-family: 'Roboto', sans-serif;
        text-decoration: underline;
    }
`