import { useRef } from "react"

const RecipeForm = (props) => {

  const titleRef = useRef()
  const instructionsRef = useRef()
  const cookTimeRef = useRef()
  const prepTimeRef = useRef()
  const ingredientRef = useRef()

  const submitFormHandler = (event) => {
    event.preventDefault()


    const title = titleRef.current.value
    const instructions = instructionsRef.current.value
    const cookTime = cookTimeRef.current.value
    const prepTime = prepTimeRef.current.value
    const ingredients = ingredientRef.current.value

    const newRecipeValues = {
      title,
      instructions,
      cookTime,
      prepTime,
      ingredients,
    }

    titleRef.current.value = ""
    instructionsRef.current.value = ""
    cookTimeRef.current.value = ""
    prepTimeRef.current.value = ""
    ingredientRef.current.value = ""
  }

  return (
    <>
    <div className="d-flex justify-content-between align-items center">
        <h3>Ajouter un contact</h3>
        <button onClick={() =>props.setRecipeModalVisible(false)} className="btn btn-outline-dark rounded-circle"><i className="bi bi-x"></i></button>
        </div>
        <hr />
        <form onSubmit={submitFormHandler}>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Nom de la recette : </label>
            <input type="text" required ref={titleRef} className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="instructions" className="form-label">Instructions : </label>
            <input type="text" required ref={instructionsRef} className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="cooktime" className="form-label">Temps de cuisson : </label>
            <input type="text" required ref={cookTimeRef} className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="preptime" className="form-label">Temps de préparation : </label>
            <input type="text" required ref={prepTimeRef} className="form-control" />
          </div>
          <label htmlFor="pet-select">Choississez vos ingrédients</label>
          <select name="ingredients" id="ingredients" ref={ingredientRef}>
              <option value="">--Veuillez choisir un ingrédient--</option>
          </select>
          <div className="text-end">
            <button type="submit" className="btn btn-outline-info me-2">Ajout</button>
          </div>
        </form>
      </>

  )
}

export default RecipeForm