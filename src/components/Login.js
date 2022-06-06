import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner';
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import logo from './images/logoDrivenPlus.png';


export default function Login () {

    const disable = false;
    const { setUserData } = useContext(UserContext);
    const logInURL = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/login";
    const navigate = useNavigate();
    const [entry, setEntry] = useState({email:"", password:""});

    function sendObject() {

        const promisse = axios.post(logInURL, entry);

        promisse.then((response) => {
            setUserData(response.data);
            if (response.data.membership == null) {
                navigate('subscriptions');
            } else {
                navigate('home');
            };
        promisse.catch(() => {
            alert('Informações inválidas. Verifique as entradas e tente novamente');
        });
        });
    }

    return (
        <Logon>
            <img src={logo} alt="TrackIt" />
            <input type='email' placeholder='E-mail' onChange={(e) => setEntry({...entry ,email: e.target.value})} value={entry.email}></input>
            <input type='password' placeholder='Senha' onChange={(e) => setEntry({...entry, password: e.target.value})} value={entry.password}></input>
            <button onClick={sendObject}> { disable === false ? "ENTRAR" : <ThreeDots color="white" height={80} width={80} />} </button>
            <a onClick={() => navigate("/signin")}>Não possui uma conta? Cadastre-se!</a>
        </Logon>
    )
}

const Logon = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 0 38px;
    
    img {
        margin-top: 134px;
        margin-bottom: 100px;
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
        font-weight: 700;
        color: white;
        margin: 8px 0 24px 0;
        border: 0px none;
    }

    a {
        cursor: pointer;
        font-size: 14px;
        color: white;
        font-family: 'Lexend Deca';
        text-decoration: underline;
    }
`