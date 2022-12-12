## Personalized Contact App

* In this project, an online contact application has been developed in the React environment.
* HTTP methods such as CREATE, GET, POST, PUT are implemented using Google Firebase's Realtime Database.
* This project is enhanced version of [Firebase Contact App](https://github.com/kerimmstfdemir/Firebase-Contact-App) project.
* By creating a registration, people can create, delete or update their contact information.
* You can access the live version of the project from the following link.

  https://personalizedcontactapp.onrender.com

## Project Skeleton

```
Personalized-Contact-App (main folder)
|
├── README.md 
├── node_modules
├── LICENSE
├── .gitignore     
├── public
│     └── index.html
├── src
|    ├── assets
|    |     └── images
│    ├── authentication
│    │     └── firebase.js
│    ├── components
│    │     ├── Appbar.jsx
|    |     ├── EditTableData.jsx
|    |     ├── Form.jsx
|    |     ├── Form.styled.jsx
|    |     ├── Table.jsx
│    │     ├── Table.styled.jsx
|    |     └── table.css
|    ├── notifies
|    |     └── ToastifyNotifies.js
│    ├── redux
|    |     ├── app
|    |     |     └── store.jsx
|    |     └── features
|    |           ├── loginInfoSlice.jsx
|    |           └── registerSlice.jsx
│    ├── pages
|    |     ├── home
|    |     |     ├── Home.jsx
|    |     |     └── Home.styled.jsx
|    |     ├── login
|    |     |     ├── Login.jsx
|    |     |     └── ForgotPassword.jsx
|    |     └── register
|    |           └── Register.jsx
│    ├── router
│    │     └── PrivateRouter.jsx
│    ├── App.js
│    ├── App.css
│    ├── index.js
│    └── index.css
├── package.json
├── .env
└── yarn.lock
```

## Useful Resources

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Firebase](https://firebase.google.com/)
- [Material-UI](https://mui.com/)
- [W3 Schools](https://www.w3schools.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Styled Components](https://styled-components.com/)