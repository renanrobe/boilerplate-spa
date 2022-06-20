# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn generate NamePage`

Rodar esse comando dentro do projeto.
Esse comando irá gerar os arquivos de Página Padrão com Grid, Edição e Exclusão.

Será gerado:

- Na pasta /container uma pasta com o nome escolhido. ex: /Namepage
- Na pasta /models um arquivo referente a página criada. ex: Namepage.model.tsx
- Na pasta /services um arquivo referente a página criada. ex: Namepage.service.tsx

Após a criação desse arquivos, precisa ir nas rotas e add essa rota para os arquivos gerados. Ex:

```
import NamePage from "../containers/NamePage";
import { NamePageRegister } from "../containers/NamePage/register";


<RouteWithSidebar exact path='/name-page' component={NamePage} />
<RouteWithSidebar exact path='/name-page/add' component={NamePageRegister} />
<RouteWithSidebar
  exact
  path='/name-page/edit/:id'
  component={NamePageRegister}
/>
```

### `Documentação react-checkbox-tree`

https://github.com/jakezatecky/react-checkbox-tree
