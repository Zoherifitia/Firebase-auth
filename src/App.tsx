import {useContext, useRef, useState} from "react";
import {Button, Container, Form} from "react-bootstrap"
import { AuthContext } from "./context/AuthContext";
import { auth } from "./Config/Config";
import './App.css'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    //  constante user pour utiliser le context définie dans le fichier AuthContext.tsx
    const user = useContext(AuthContext);

    // emailRef pour prendre la valeur de l'email dans le Form
    const emailRef = useRef<HTMLInputElement>(null);
    // passwordRef pour prendre la valeur du password dans le Form
    const passwordRef = useRef<HTMLInputElement>(null);
    const ConfpasswordRef = useRef<HTMLInputElement>(null);
    const[showAlert, setShowAlert] =  useState(false);
    const[isSignin, setIsSignin] =  useState(true);
    const[isSignUp, setIsSignUp] =  useState(true);
    //signOut fonction pour se déconnecter
    const [estConnecter, setEstConnecter] = useState(false);
    const [messageErrorSignIn, setMessageErrorSignIn] = useState(false);
    const [messageErrorSignUp, setMessageErrorSignUp] = useState(false);

    const signOut = async () => {
        await auth.signOut();
        setIsSignin(true);
        setEstConnecter(false);
    };



    //signIn fonction pour se connecter
    const signIn = async () => {
        try {
            //  signInWithEmailAndPassword fonction dans firebase
            await auth.signInWithEmailAndPassword(
                emailRef.current!.value,
                passwordRef.current!.value
            );
            setEstConnecter(true);
        } catch (error) {
            setMessageErrorSignIn(true)
            console.error(error);
        }
    };

    const createAccount = async () => {
        console.log(passwordRef.current!.value)
        console.log(ConfpasswordRef.current!.value)
        try {
            if(passwordRef.current!.value === ConfpasswordRef.current!.value){
                console.log("Miditra ato")
                await auth.createUserWithEmailAndPassword(
                    emailRef.current!.value,
                    passwordRef.current!.value
                );
                setEstConnecter(true);
            }
            else{
                setMessageErrorSignUp(true)
                setIsSignin(false);
            }

        } catch (error) {
            console.error(error);
        }
    };

    const toSignUp = () =>{
        setIsSignin(false);
    }

    const toSignIn = () =>{
        setIsSignin(true);
    }

  return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    {estConnecter && <Button style={{textAlign: "center"}} onClick={signOut}>Sign Out</Button>}
                </div>
            </nav>
            {!estConnecter ? (
                <div>
                    {isSignin ? (
                        <div className="input">
                            <div>
                                <div className="Container">
                                    <h2>Fill this form SignIn</h2>
                                    <div>
                                        <label htmlFor="inputEmail" className="form-label"></label>
                                        <input ref={emailRef} type="email" placeholder="email" />
                                    </div>
                                    <div className="Password">
                                        <label htmlFor="pasword" className="form-label"></label>
                                        <input ref={passwordRef} type="password" placeholder="password"/>
                                    </div>
                                    <div className="singUp">
                                        <Button type="button" onClick={toSignUp}>Sign Up</Button>
                                    </div>
                                    <div className="singIn">
                                        <Button type="button" onClick={signIn}>Sign In</Button>
                                    </div>
                                    {messageErrorSignIn && <h3 className="mt-4 text-center" style={{color:"red"}}>Erreur de connexion</h3>}
                                </div>
                            </div>
                        </div>
                    ):(
                        <div>
                            <div className="input">
                                <div className="Container">
                                    <h2>Fill this form SignUp</h2>
                                    <div className="Email">
                                        <label htmlFor="inputEmail" className="form-label"></label>
                                        <input ref={emailRef} type="email" placeholder="email" />
                                    </div>
                                    <div className="Password">
                                        <label htmlFor="pasword" className="form-label"></label>
                                        <input ref={passwordRef} type="password" placeholder="password"/>
                                    </div>
                                    <div className="Password">
                                        <label htmlFor="pasword" className="form-label"></label>
                                        <input ref={ConfpasswordRef} type="password" placeholder="Confirm password"/>
                                    </div>
                                    <div className="singUp">
                                        <Button type="button" onClick={createAccount}>Sign Up</Button>
                                    </div>
                                    <div className="singIn">
                                        <Button type="button" onClick={toSignIn}>Sign In</Button>
                                    </div>
                                    {messageErrorSignUp && <h3 className="mt-4 text-center" style={{color:"red"}}>Erreur d'inscription</h3>}
                                </div>
                            </div>
                        </div>

                    )};
                </div>
            ) : (
                <h2 className="mt-4 text-center">Welcome</h2>
            )}
        </>
  );
}

export default App;