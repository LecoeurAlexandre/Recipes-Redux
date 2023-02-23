import './App.css';
import Header from './Components/Header';
import Recipes from './Components/RecipesComponent';
import RecipeForm from './Components/RecipeForm'
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import ModalComponent from './Components/shared/ModalComponent'
import { API_KEY, BASE_DB_URL } from './apiKey';

function App() {

  const [modalVisible, setModalVisible] = useState(false)
  const [recipeModalVisible, setRecipeModalVisible] = useState(false)
  const [modalConnect, setModalConnect] = useState()
  const [isLogged, setIsLogged] = useState(false)
  const [recipeFormMode, setRecipeFormMode] = useState("")
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const emailRef = useRef();
  const passwordRef = useRef()

  const submitFormHandler = async (event) => {
    event.preventDefault()
    //console.log(modalConnect)
    let BASE_URL = ""
    if (modalConnect) {
      BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    } else {
      BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    }

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body : JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true
        })
      })
  
      // Si la réponse n'a pas comme code de retour un OK (200), alors on va envoyer une erreur
      if(!response.ok) {
        throw new Error("Il y a eu une erreur !")
      } 

      // Si la réponse est concluante, il va nous falloir extraire les données de la réponse (le body). Pour ce faire, on utilise la méthode asynchrone .json()
      const data = await response.json()
      
      // Dans la réponse se trouve un token qui nous servira par la suite pour faire notre requêtes de gestion de la base de données Firestore. Pour le moment, l'endroit le plus utile où le stocker est le stockage local de notre navigateur
      localStorage.setItem('token', data.idToken)

      emailRef.current.value = ""
      passwordRef.current.value = ""

      setIsLogged(true)
      setModalVisible(false)
    } catch (error) {
      console.error(error.message);
    }
  }

  const logOutHandler = () => {
    localStorage.removeItem('token')
    setIsLogged(false)
    alert("Déconnexion réussie")
  }

  const addRecipeHandler = async (recipe) => {
    if (isLogged) {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await fetch(`${BASE_DB_URL}recipes.json?auth=${token}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(recipe)
          })

          if (!response.ok) {
            throw new Error("Il y a eu un soucis lors de l'ajout d'une recette.")
          }

          const data = await response.json()

          setRecipes([...recipes, {id: data.name, ...recipe}])
          setRecipeFormMode("")

        } catch (error) {
          console.error(error.message);
        }
      }
    }
  }



  return (
    <>
      {modalVisible && createPortal(<ModalComponent closeModal={() => setModalVisible(false)}>
        <div className="d-flex justify-content-between align-items center">
        <h3>{modalConnect ? "S'inscrire" : "Se connecter"}</h3>
        <button onClick={() =>setModalVisible(false)} className="btn btn-outline-dark rounded-circle"><i className="bi bi-x"></i></button>
        </div>
        <hr />
        <form onSubmit={submitFormHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email : </label>
            <input type="text" required ref={emailRef} className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe : </label>
            <input type="password" required ref={passwordRef} className="form-control" />
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-outline-info me-2">{modalConnect ? "S'inscrire" : "Se connecter"}</button>
          </div>
        </form>
      </ModalComponent>, document.getElementById("modal-root"))}
      {recipeModalVisible && createPortal(<ModalComponent closeModal={() => setModalVisible(false)}>
        <RecipeForm setRecipeModalVisible={setRecipeModalVisible}/>
      </ModalComponent>, document.getElementById("modal-root"))}
      <Header setModalVisible={setModalVisible} setModalConnect={setModalConnect} isLogged={isLogged} logOutHandler={logOutHandler}/>
      <Recipes isLogged={isLogged} setRecipeModalVisible={setRecipeModalVisible}/>
    </>
  );
}

export default App;
