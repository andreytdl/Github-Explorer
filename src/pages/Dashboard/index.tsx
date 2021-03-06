import React, { useState, FormEvent, useEffect } from 'react';
import { Title, Form, Repositories, Error } from './styles';

import { FiChevronRight } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {

    //Estado para o input do formulário
    const [newRepo, setNewRepo] = useState('');

    //Tratamento de erros
    const [inputError, setInputError] = useState('');
    
    //Estado para armazenar os repositórios obtidos -> O valor padrão provém de uma função
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        
        //Verificamos se já existe alguma coisa salva
        const storageRepositories = localStorage.getItem(
            '@GithubExplorer:repositories',
        );

        //Caso tenha
        if(storageRepositories){
            return JSON.parse(storageRepositories);
        }

        //Caso não tenha
        else{
            return []
        }

    });

    useEffect(() => {
        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
    }, [repositories])

    //Adicionar um novo repositorio
    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        
        //Agora ele não fica redirecionando mais a tela
        event.preventDefault();
        
        //Caso tenha enviado o campo em branco
        if(!newRepo){
            setInputError('Digite o autor/nome do repositório'); 
            return;
        }

        try{
            //Buscando o repositório na api do github
            const response = await api.get<Repository>(`repos/${newRepo}`);
    
            //Obtendo o repositório
            const repository = response.data;
    
            //Adicionando o repositorio a nossa lista
            setRepositories([...repositories, repository]);
    
            //Limpando o campo do input
            setNewRepo('');

            //Retirando o erro caso haja
            setInputError('');
        }catch(err){
            setInputError('O repositório não existe ou é privado');
        }



    }


    return (
    <>
        <img src={logoImg} alt="Github Explorer" />

        <Title>Explore repositórios no Github</Title>

        {/* Repare que inventamos a propriedade hasError e reutilizamos ela no styles.ts para colocar borda vermelha  */}
        <Form hasError={Boolean(inputError)} onSubmit={handleAddRepository}>
            <input 
            value={newRepo}
            onChange= {(e) => setNewRepo(e.target.value)}
            placeholder="Digite o nome do repositório" />
            <button type="submit">Pesquisar</button>
        </Form>

        {/* If - Caso tenha o inputError então faremos oq está após o && */}
        { inputError && <Error>{inputError}</Error> }

        <Repositories>
            {repositories.map(repository => (
                <Link key={repository.full_name} to={`/repositories/${repository.full_name}`}>
                    <img 
                    src= {repository.owner.avatar_url} 
                    alt= {repository.owner.login}
                     />
                    <div>
                        <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>

                    <FiChevronRight size={20} />

                </Link>
            ))}


        </Repositories>

    </>
    )
};

export default Dashboard;