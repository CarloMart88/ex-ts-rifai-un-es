/**
In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id).
 Questa funzione accetta un id di una ricetta e deve:

Recuperare la ricetta da https://dummyjson.com/recipes/{id}

Estrarre la proprietà userId dalla ricetta

Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}

Restituire la data di nascita dello chef

*/
//creo un type guard personalizzato per resultId

type Recipes = {
  id: number,
  name: string,
  ingredients: string[],
  userId:number
}


type Chef = {
  id: number,
  firstName: string,
  lastName: string,
  age:number
}


function isId(dati:unknown): dati is Recipesc {
  if(
    dati && typeof dati === "object" &&
    "id" in dati && typeof dati.id === "number" &&
    "name" in dati && typeof dati.name === "string" &&
    "ingredients"  in dati &&  dati.ingredients instanceof Array &&
    "userId" in dati && typeof dati.userId === "number" 


  ){return true }else{
    return false
  }
}


async function getChefBirthday(id:number): Promise<string | null> {
  
  try{
  const response = await fetch(`https://dummyjson.com/recipes/${id}`)
  const resultId:unknown = await response.json()
  if(isId(resultId))
  console.log(resultId)

  const { userId } = resultId


  const secondResponse = await fetch(`https://dummyjson.com/users/${userId}`)
  const chef = await secondResponse.json()
  console.log(chef)
  
  const {birthDate } = chef

  console.log(birthDate)

  return birthDate

  }
  catch(error:unknown)
  {
    if(typeof error === "string"){
      throw new Error("errore generico di tipo"+error)
    }else{
      return null
    }

  }
  

  
  
}

getChefBirthday(2)


function App() {



  return (
    
  <div className="container">
      <div className="row">
        <div className="col-12">

        </div>
      </div>
    </div>  )
}

export default App
