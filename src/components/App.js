import styled from 'styled-components';
import { useState } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserContext from '../contexts/UserContext';
import Login from './Login';
import SignIn from './SignIn';
import Subscriptions from './Subscriptions';
import PlanInfo from './PlanInfo';
import Home from './Home';


export default function App () {

const [ userData, setUserData ] = useState({});

    return (
        <Container>
            <UserContext.Provider value={{userData, setUserData}}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />}/>
                    <Route path='/signin' element={<SignIn />}/>
                    <Route path='/subscriptions' element={<Subscriptions />}/>
                    <Route path='home' element={<Home />}/>
                    <Route path='/subscriptions/:planID' element={<PlanInfo />} />
                </Routes>
            </BrowserRouter>
            </UserContext.Provider>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    height: 100%;
    align-items: center;
`