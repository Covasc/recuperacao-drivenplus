import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../contexts/UserContext';


export default function Subscriptions () {

    const plansListURL = 'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships';
    const { userData } = useContext(UserContext);
    const [plansList, setPlansList] = useState([]);

    useEffect( () => {
        const config = { headers: {Authorization:`Bearer ${userData.token}`} };
        const promisse = axios.get(plansListURL, config);
        promisse.then((response) => {
            setPlansList(response.data);
        });
    }, [] );

    function PlansList( { plan } ) {

        const { id, image, price } = plan;

        return (
            <Link to={`/subscriptions/${id}`}>
                <div>
                    <img src={image} alt='Image' />
                    <p>{`R$ ${price}`}</p>
                </div>
            </Link>
        );
    }

    return (
        <Plans>
            <h1>Escolha seu Plano:</h1>
            {plansList.map((plan) => (<PlansList plan={plan} key={plan.id}/>))}
        </Plans>
    );
}

const Plans = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 0 42px;
    font-family: 'Lexend Deca';
    color: white;

    h1 {
        font-size: 32px;
        font-weight: 700;
        margin: 25px 0;
    }

    a {
        width: 100%;
        text-decoration: none;
        color: white;
        margin-bottom: 10px;
    }

    div {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 180px;
        padding: 16px;
        border: 3px solid #7E7E7E;
        border-radius: 12px;
    }
    
    img {
        width: 140px;
        height: 95px;
    }

    p {
        font-size: 24px;
        font-weight: 700;
    }
`