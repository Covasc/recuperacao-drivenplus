import axios from 'axios';
import styled from 'styled-components'
import { useContext, useState, useEffect } from 'react';
import { ArrowBackOutline, ReaderOutline, CashOutline, CloseOutline } from 'react-ionicons'
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';


export default function PlanInfo () {

    const { userData, setUserData } = useContext(UserContext);
    const [planInfo, setPlanInfo] = useState({});
    const [active, setActive] = useState(false);
    const [entry, setEntry] = useState({});
    const { image, name, perks, price } = planInfo;
    const { planID } = useParams();
    const navigate = useNavigate();
    const planURL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${planID}`;
    const buyURL = 'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions';

    useEffect( () => {
        const config = { headers: {Authorization:`Bearer ${userData.token}`} };
        const promisse = axios.get(planURL, config);
        promisse.then((response) => {
            setPlanInfo(response.data);
            setEntry({...entry, membershipId: response.data.id});
        });
    }, [] );

    function sendObject () {
        const config = { headers: {Authorization:`Bearer ${userData.token}`} };
        const promisse = axios.post(buyURL, entry, config);
        promisse.then((response) => {
            // ADRIANO: setting Context for content show on first buy
            setUserData({...userData, membership: response.data.membership});
            navigate('/home');
        });
        promisse.catch(() => {
            alert("Dados inválidos. Verifique a entrada e tente novamente")
        });
    }

    return (
        <Plan>
            <Return
                onClick={() => navigate(-1)}
                color={'white'} 
                height="28px"
                width="28px"
            />
            <PlanImage>
                <img src={image} alt="Image"/>
                <h1>{name}</h1>
            </PlanImage>
            <Benefits>
                <ReaderOutline
                    color={'#ff4791'} 
                    height="16px"
                    width="16px"
                />
                <span> Benefícios:</span>
                <ol>
                    {perks?.map( (perk) => (
                        <li key={ perk.id }>{perk.title === "Solicitar brindes" ? `Brindes exclusivos` : perk.title }</li>
                    ) )}
                </ol>
            </Benefits>
            <div>
                <CashOutline
                    color={'#ff4791'} 
                    height="16px"
                    width="16px"
                />
                <span> Preço:</span>
                <p>{`R$ ${price} cobrados mensalmente`}</p>
            </div>
            <input 
                type='text' 
                placeholder='Nome impresso no cartão' 
                onChange={(e) => setEntry({...entry, cardName: e.target.value})} value={entry.cardName}>
            </input>
            <input 
                type='text' 
                placeholder='Digitos do cartão'
                onChange={(e) => setEntry({...entry, cardNumber: e.target.value})} value={entry.cardNumber}>
            </input>
            <Security>
                <input 
                    type='text' 
                    placeholder='Código de segurança'
                    onChange={(e) => setEntry({...entry, securityNumber: Number(e.target.value)})} value={entry.securityNumber}>
                </input>
                <input 
                    type='text' 
                    placeholder='Validade'
                    onChange={(e) => setEntry({...entry, expirationDate: e.target.value})} value={entry.expirationDate}>
                </input>
            </Security>
            <button onClick={() => setActive(true)} >ASSINAR</button>
            <Confirm active={active}>
                <div>
                    <h2>{`Tem certeza que deseja assinar o plano ${name} (R$ ${price})?`}</h2>
                    <div>
                        <button onClick={() => setActive(false)}>Não</button>
                        <button onClick={sendObject} >SIM</button>
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
        </Plan>
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

        button:nth-child(1){
            background: #CECECE;
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

const Return = styled(ArrowBackOutline)`
    cursor: pointer;
`

const Plan = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0 42px;
    margin-top: 24px;
    font-family: 'Roboto', sans-serif;
    color: white;

    h1 {
        font-size: 32px;
        font-weight: 700;
        margin: 25px 0;
    }

    span {
        font-size: 16px;
    }

    ol {
        font-size: 14px;
        margin: 10px 0;
        list-style: decimal inside;
    }

    p {
        font-size: 14px;
        margin-top: 10px;
        margin-bottom: 34px;
    }

    img {
        width: 140px;
        height: 95px;
    }

    input {
        width: 100%;
        height: 52px;
        border-radius: 8px;
        padding: 14px;
        font-size: 14px;
        margin-bottom: 8px;

        ::placeholder {
            color: #7E7E7E;
        }
    }

    button {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 52px;
        border-radius: 8px;
        background: #FF4791;
        font-size: 14px;
        font-weight: 700;
        color: white;
        margin: 8px 0 24px 0;
        border: 0px none;
    }
`

const Security = styled.div`
    display: flex;
    
    input:nth-child(1) {
        margin-right: 8px;
        padding: 6px;
    }
`

const Benefits = styled.div`
`

const PlanImage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`


