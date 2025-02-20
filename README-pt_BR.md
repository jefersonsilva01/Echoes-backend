# ECHOES Backend

<details>
  <summary>
    <h2>Índice</h2>
  </summary>

- [ECHOES Backend](#echoes-backend)
  - [Sobre o projeto](#sobre-o-projeto)
    - [📖 Para escritores](#-para-escritores)
    - [👀 Para leitores](#-para-leitores)
    - [🔐 Autenticação e comunidade](#-autenticação-e-comunidade)
    - [⚡ Extras](#-extras)
  - [Variáveis de ambiente](#variáveis-de-ambiente)
    - [Atenção!!! ⚠️](#atenção-️)
    - [Mongo Atlas](#mongo-atlas)
    - [Google passport](#google-passport)
    - [Cloudinary](#cloudinary)
  - [Como rodar o projeto](#como-rodar-o-projeto)
  - [Licença](#licença)

## Sobre o projeto

O Echoes é uma plataforma de publicação de artigos inspirada no Medium, oferecendo um ambiente intuitivo e dinâmico para escritores compartilharem suas ideias e leitores explorarem conteúdos de qualidade. Com um design minimalista e funcionalidades avançadas, o Echoes permite a criação, edição e formatação de textos de forma fluida, além de proporcionar interações por meio de curtidas. A plataforma também inclui um sistema de recomendação inteligente, conectando os usuários a conteúdos relevantes com base em seus interesses. Desenvolvido com tecnologias modernas, o Echoes busca democratizar a escrita e promover a disseminação de conhecimento.

Você pode ver uma demonstração [aqui](https://echoes-frontend-ten.vercel.app/).

<details>
  O Echoes oferece um conjunto de funcionalidades projetadas para criar uma experiência fluida e envolvente para escritores e leitores. Aqui estão algumas das principais funcionalidades:
  <summary>
    <h2>Funcionalidades</h2>
  </summary>

### 📖 Para escritores

- **Editor de texto avançado** – Permite formatar textos e adicionar imagens.
- **Publicação** – Publicaque e edite artigos já publicados.

### 👀 Para leitores

- **Curtidas** – Interaja com os autores.
- **Sistema de bookmarking** – Salve artigos para ler mais tarde.

### 🔐 Autenticação e comunidade

- **Cadastro e login** – Acesso via e-mail/senha ou redes sociais.
- **Perfis de usuário** – Personalize foto.

### ⚡ Extras

- **Design Responsivo** - O site é totalmente responsivo, garantindo uma boa experiência de navegação em dispositivos móveis, tablets e desktops.
</details>

<details>
  <summary>
    <h2>Tecnologias</h2>
  </summary>

- [x] Figma
- [x] React
- [x] Styled Component
- [x] Javascript
- [x] NodeJS
- [x] Express
- [x] MongoDB
- [x] Git
- [x] Github
- [x] Vercel
- [x] Google Services
- [x] Cloudinary
</details>

## Variáveis de ambiente

### Atenção!!! ⚠️

Dependendo de quando estiver vendo este projeto o modo de acesso para conseguir as váriaveis de ambiente podem ter mudado em cada serviço.

### Mongo Atlas

O projeto utiliza como banco de dados o [MongoDB](https://www.mongodb.com/), e o [Mongo Atlas](https://www.mongodb.com/en-us/cloud/atlas/register) como servidor de banco de dados, será necessário utilizar configurarmos a URL deste ambiente para que nossos dados sejam devidamente armazenados e acessados.

### Google passport

Para utilizar o método de autenticação do Google passport é necessário obter seu Client ID e Client Secret através de um projeto criado no [Console Google Cloud](https://console.cloud.google.com/).

### Cloudinary

O upload de arquivos de imagem ocorre através do serviço do [Cloudinary](https://cloudinary.com/), onde nossos arquivos ficam armazenados e podem ser acessados, para utilizar o serviço precisamos configuras as credenciais NAME, KEY e SECRET.

## Como rodar o projeto

Este projeto é divido em dois repósitórios Backend e Frontend, Frontend está [aqui](https://github.com/jefersonsilva01/Echoes-frontend)

Para rodar este projeto você pode realizar o download ou fazer um fork para sua conta do github e executar o comando git clone.

```shell
git clone https://github.com/<user>/Echoes-backend.git
```

Após acesse o diretório `./Echoes-backend` e instale as dependências do projeto, as dependências podem ser encontradas através do arquivo `package.json`, uma vez instaladas o projeto pode ser rodado em modo desenvolvimento.

```shell
cd Echoes-backend

npm install

npm run dev
```

Depois [vá para](https://github.com/jefersonsilva01/Echoes-frontend)

## Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENÇA](https://github.com/jefersonsilva01/Echoes-frontend/blob/main/LICENSE) para mais detalhes.
