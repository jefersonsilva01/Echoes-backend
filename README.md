# ECHOES Backend

<details>
  <summary>
    <h2>Table of content</h2>
  </summary>

- [ECHOES Backend](#echoes-backend)
  - [About project](#about-project)
    - [📖 For writers](#-for-writers)
    - [👀 For readers](#-for-readers)
    - [🔐 Authentication and community](#-authentication-and-community)
    - [⚡ Extras](#-extras)
  - [Environment variables](#environment-variables)
    - [Attention!!! ⚠️](#attention-️)
    - [Mongo Atlas](#mongo-atlas)
    - [Google passport](#google-passport)
    - [Cloudinary](#cloudinary)
  - [How to run the project](#how-to-run-the-project)
  - [License](#license)

</details>

## About project

You can see a version of this readme in Portuguese [here](https://github.com/jefersonsilva01/Echoes-backend/blob/main/README-pt_BR.md).

Echoes is an article publishing platform inspired by Medium, offering an intuitive and dynamic environment for writers to share their ideas and readers to explore quality content. With a minimalist design and advanced features, Echoes allows you to create, edit and format texts fluidly, in addition to providing interactions through likes. The platform also includes an intelligent recommendation system, connecting users to relevant content based on their interests. Developed with modern technologies, Echoes seeks to democratize writing and promote the dissemination of knowledge.

You can see a demo [here](https://echoes-frontend-ten.vercel.app/).

<details>
Echoes offers a suite of features designed to create a fluid and engaging experience for writers and readers. Here are some of the main features:
  <summary>
    <h2>Feature</h2>
  </summary>

### 📖 For writers

- **Advanced text editor** – Allows you to format texts and add images.
- **Publication** – Publish and edit articles already published.

### 👀 For readers

- **Likes** – Interact with the authors.
- **Bookmarking system** – Save articles to read later.

### 🔐 Authentication and community

- **Registration and login** – Access via email/password or social networks.
- **User profiles** – Customize photo.

### ⚡ Extras

- **Responsive Design** - The website is fully responsive, ensuring a good browsing experience on mobile devices, tablets and desktops.
</details>

<details>
  <summary>
    <h2>Stack</h2>
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

## Environment variables

### Attention!!! ⚠️

Depending on when you are viewing this project, the access mode to obtain the environment variables may have changed in each service.

### Mongo Atlas

The project uses as a database the [MongoDB](https://www.mongodb.com/), and the [Mongo Atlas](https://www.mongodb.com/en-us/cloud/atlas/register) as a database server, it will be necessary to use the URL of this environment to be configured so that our data is properly stored and accessed.

### Google passport

To use the Google passport authentication method, you must obtain your Client ID and Client Secret through a project created in [Console Google Cloud](https://console.cloud.google.com/).

### Cloudinary

Image files are uploaded via the [Cloudinary](https://cloudinary.com/), where our files are stored and can be accessed, to use the service we need to configure the NAME, KEY and SECRET credentials.

## How to run the project

This project is divided into two repositories Backend and Frontend, Frontend is [here](https://github.com/jefersonsilva01/Echoes-frontend)

To run this project you can download or fork it to your github account and run the git clone command.

```shell
git clone https://github.com/<user>/Echoes-backend.git
```

After accessing the `./Echoes-backend` directory and installing the project dependencies, the dependencies can be found through the `package.json` file, once installed the project can be run in development mode.

```shell
cd Echoes-backend

npm install

npm run dev
```

Ater [go to](https://github.com/jefersonsilva01/Echoes-frontend)

## License

This project is under the MIT license. See the file [LICENSE](https://github.com/jefersonsilva01/Echoes-backend/blob/main/LICENSE) for more details.
