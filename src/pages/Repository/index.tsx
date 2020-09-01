import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link} from 'react-router-dom'

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { Header, RepositoryInfo, Issues } from './styles';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

interface RepositoryParams {
    repository: string;
}

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
}

interface Issue {
    id: number;
    title: string;
    html_url: string;
    user : {
        login: string;
    }
}

const Repository: React.FC = () => {
    const [repository, setRepository] = useState<Repository | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    const { params } = useRouteMatch<RepositoryParams>();

    // A variavel em observação é a params.repository, pois se a informação for alterada (Através de um Link para uma próxima pagina por exemplo)
    // teremos de verificar as informações que foram alteradas 
    useEffect(() => {
        
        //  MANEIRA 1
        api.get(`repos/${params.repository}`).then(response => {
            setRepository(response.data);
        })
        api.get(`repos/${params.repository}/issues`).then(response => {
            setIssues(response.data);
        })

        //  MANEIRA 2 - Retorna assim como o que foi feito acima
        // async function loadData(): Promise<void> {
        //     const [repository, issues] = await Promise.all([
        //         api.get(`repos/${params.repository}`),
        //         api.get(`repos/${params.repository}/issues`),
        //     ])


        // }

        // //  MANEIRA 3 - Retorna aquele que a requisição finalizar primeiro
        // async function loadData(): Promise<void> {
        //     const response = await Promise.race([
        //         api.get(`repos/${params.repository}`),
        //         api.get(`repos/${params.repository}/issues`),
        //     ])
        // }

    }, [issues, params.repository, repository]);

return(
    <>
        <Header>
            <img src={logoImg} alt="Github Explorer" />
            <Link to="/">
                <FiChevronLeft size={16}/>
                Voltar
            </Link>
        </Header>

        {/* Caso exista um repositório  */}
        {repository ? (

            <RepositoryInfo>
                <header>
                    <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                    <div>
                        <strong>{repository.owner.login} </strong>
                        <p>{repository.description}</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>{repository.stargazers_count}</strong>
                        <span>Stars</span>
                    </li>
                    <li>
                        <strong>{repository.open_issues_count}</strong>
                        <span>forks</span>
                    </li>
                    <li>
                        <strong>67</strong>
                        <span>Issues abertas</span>
                    </li>
                </ul>
            </RepositoryInfo>

        ) : (
            <p>Carregando...</p>
        )}

        <Issues>
            {issues.map((issue) => (
                <a key={issue.id} href={issue.html_url}>
                    <div>
                        <strong>{issue.title}</strong>
                        <p>{issue.user.login}</p>
                    </div>

                    <FiChevronRight size={20} />

                </a>
            ))}
        </Issues>
    
    </>
)


};

export default Repository;