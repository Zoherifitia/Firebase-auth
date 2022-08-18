import {useContext, useRef, useState} from "react";
import {Button, Container, Form} from "react-bootstrap"
import { AuthContext } from "./context/AuthContext";
import { auth } from "./Config/Config";
import './App.css'
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    //  constante user pour utiliser le context définie dans le fichier AuthContext.tsx
    const user = useContext(AuthContext);
    // emailRef pour prendre la valeur de l'email dans le Form
    const emailRef = useRef<HTMLInputElement>(null);
    // passwordRef pour prendre la valeur du password dans le Form
    const passwordRef = useRef<HTMLInputElement>(null);

    // showAlert pour afficher l'Alert en cas d'erreur(si le boolean est true) setShowAlert pour modifier sa valeur
    const[showAlert, setShowAlert] =  useState(false);
    //signOut fonction pour se déconnecter
    const signOut = async () => {
        await auth.signOut();
    };

    // createAccount pour crée un compte avec le type d'insciption que vous avez définie dans Firebase
    const createAccount = async () => {
        try {
            //  createUserWithEmailAndPassword fonction dans firebase
            await auth.createUserWithEmailAndPassword(
                emailRef.current!.value,
                passwordRef.current!.value
            );
        } catch (error) {
            console.error(error);
        }
    };

    //signIn fonction pour se connecter
    const signIn = async () => {
        try {
            //  signInWithEmailAndPassword fonction dans firebase
            await auth.signInWithEmailAndPassword(
                emailRef.current!.value,
                passwordRef.current!.value
            );
        } catch (error) {
            setShowAlert(true);
            console.error(error);
        }
    };


  return (
    <>
      <div>
      <div className="Navbar">
          <span className="">
              {user && <Button onClick={signOut}> Sign Out </Button>}
          </span>
      </div>
      {/*  Afficahe jsx, s'il n'y a pas un user connecté, on affiche cette partie sinon, on affiche <h2>...</h2>*/}
      {!user ? (
        <div className="input">
          {(
            <div>
                <div className="Container">
                        <h2>Fill this form</h2>
                        <div>
                            <label htmlFor="inputEmail" className="form-label"></label>
                            <input ref={emailRef} type="email" placeholder="email" />
                        </div>

                        <div className="Password">
                            <label htmlFor="pasword" className="form-label"></label>
                            <input ref={passwordRef} type="password" placeholder="password"/>
                        </div>
                        <div className="singUp">
                        <Button type="button" onClick={() =>
                            <div className="confirmPassword">
                                <label htmlFor="formGroupExampleInput" className="form-label"></label>
                                <input ref={passwordRef} type="password" placeholder="Confirm password"/>
                            </div>}>Sign Up</Button>
                    </div>
                    <div className="singIn">
                        <Button type="button" onClick={signIn}>Sign In</Button>
                    </div>
                </div>

                </div>
              )
          }

                
        </div>
      ) : (
        <h2 className="welcome">Welcome {user.email}</h2>
      )}
        </div>

    </>
  );
}

export default App;




