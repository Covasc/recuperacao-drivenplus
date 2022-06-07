import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { PersonCircle, CloseOutline } from 'react-ionicons'
import UserContext from '../contexts/UserContext';


export default function Home () {

    const { userData } = useContext(UserContext);
    const { name, image, perks } = userData.membership;
    const [active, setActive] = useState(false);
    const navigate = useNavigate();
    const cancelURL = 'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions';

    function planChange() {
        // PARA O ADRIANO: A URL de alteração do plano é a mesma da aquisição, e a rota "/planos" não foi especificada. Deixei como eu acredito que seja o correto
        navigate('/subscriptions')
    }

    function planCancel() {
        const config = { headers: {Authorization:`Bearer ${userData.token}`} };
        const promisse = axios.delete(cancelURL, config);
        promisse.then(() => {
            navigate('/subscriptions')
        });
    }

    return (
        <PlanMenu>
            <Header>
                <img src={image} alt='Image'/>
                <UserMenu
                    color={'#ffffff'} 
                    height="34px"
                    width="43px"
                />
            </Header>
            <h1>{`Olá, ${userData.name}`}</h1>
            {perks?.map((perk) => (<button key={perk.id} onClick={() => window.open(perk.link)}>{perk.title}</button>))}
            <Footer>
                <button onClick={planChange} >Mudar Plano</button>
                <button onClick={() => setActive(true)} >Cancelar Plano</button>
            </Footer>
            <Confirm active={active}>
                <div>
                    <h2>{`Tem certeza que deseja cancelar a assinatura do plano ${name}?`}</h2>
                    <div>
                        <button onClick={() => setActive(false)}>Não</button>
                        <button onClick={planCancel} >Sim</button>
                    </div>
                </div>
                <button className='closeIcon' onClick={() => setActive(false)}>
                    <CloseOutline
                        color={'#000000'} 
                        height="20px"
                        width="20px"
                    />
                </button>
            </Confirm>
        </PlanMenu>
    );
}

const Confirm = styled.div`
    display: ${ (props) => (props.active ? "flex" : "none") };
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    padding: 38px;
    background: rgba(0, 0, 0, 0.7);

    h2 {
        font-weight: 700;
        font-size: 18px;
        color: black;   
    }

    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #FFFFFF;
        border-radius: 12px;
        padding: 22px;
        text-align: center;

        div {
            display: flex;
        }

        button {
            cursor: pointer;
            margin: 40px 5px 0 5px;
            width: 95px;
            height: 52px;
        }
    }

    .closeIcon {
        cursor: pointer;
        position: absolute;
        display: flex;
        width: 25px;
        height: 25px;
        top: 20px;
        right: 20px;
        align-items: center;
        justify-content: center;
        background-color: white;
    }
`


const UserMenu = styled(PersonCircle)`
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 0;
`

const PlanMenu = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    padding: 0 38px;
    margin-top: 32px;
    font-family: 'Roboto', sans-serif;
    color: white;

    h1 {
        margin-top: 13px;
        margin-bottom: 50px;
        font-weight: 700;
        font-size: 24px;
    }

    button {
        cursor: pointer;
        width: 100%;
        height: 52px;
        font-weight: 700;
        font-size: 14px;
        background: #FF4791;
        border-radius: 8px;
        border: 0px none;
        margin-bottom: 8px;
    }

`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    img {
        width: 75px;
        height: 51px;
    }
`

const Footer = styled.div`
    position: fixed;
    bottom: 20px;
    width: 100%;
    max-width: 400px;
    padding: 0 38px;

`