import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/app.css'
import FirebaseContext from './context/firebase'
import { firebase, FieldValue } from './lib/firebase'
import './index.css'
//a provider value can be passed to its children and also childrens children
ReactDOM.render(

  < FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />

  </FirebaseContext.Provider >
  ,
  document.getElementById('root')
);

