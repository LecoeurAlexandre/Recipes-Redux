const Recipes = (props) => {
    const displayRecipeModal = (b) => {
        props.setRecipeModalVisible(true)
        console.log("méthode ouverture de modal")
    }


    return (
            <div className="container">
                <div className="my-3 row">
                    <div className="col-10 offset-3 bg-dark text-light p-3 rounded mx-auto">
                        <div className="d-flex justify-content-between">
                            <h4>Liste des recettes</h4>
                            {props.isLogged && <button type="button" onClick={() => displayRecipeModal()} className="btn btn-outline-info">Ajouter une recette</button>}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Recipes