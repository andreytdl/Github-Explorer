import React from 'react';
import { Title, Form, Repositories } from './styles';

import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
return (
    <>
        <img src={logoImg} alt="Github Explorer" />

        <Title>Explore repositórios no Github</Title>

        <Form>
            <input placeholder="Digite o nome do repositório" />
            <button type="submit">Pesquisar</button>
        </Form>

        <Repositories>
            <a href="teste">
                <img 
                src="https://avatars1.githubusercontent.com/u/19430333?s=460&u=ee87346ac19a4042142fd9cf55b01c7d7b9953c3&v=4" 
                alt="Andrey Torres" />
                <div>
                    <strong>andreytdl/GoStack-Fundamentos</strong>
                    <p>Os fundamentos do NodeJS, ReactJS e React Native foram estudados através do desenvolvimento dessa aplicação</p>
                </div>

            </a>
        </Repositories>

    </>
    )
};

export default Dashboard;