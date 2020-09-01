import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';


const Routes: React.FC = () => {
    return(
        <Switch>
            <Route path="/" exact={true} component={Dashboard} />

            {/* indicamos que após o /repository vem o nome do repositório. O "+" indica que tudo que vier após ele é o nome 
            Isso fazemos para não confundir o router que pode pensar que autor/nome_do_repositorio são duas rotas */}
            <Route path="/repositories/:repository+" component={Repository}/>
        </Switch>
    )
}

export default Routes;