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
  birthDate:string
}


function isRecipe(dati:unknown): dati is Recipes {
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

function isChef(dati:unknown): dati is Chef {
  if(
    dati && typeof dati === "object" &&
    "id" in dati && typeof dati.id === "number" &&
    "firstName" in dati && typeof dati.firstName === "string" &&
    "lastName" in dati && typeof dati.lastName === "string" &&
    "age" in dati && typeof dati.age === "number" &&
    "birthDate" in dati && typeof dati.birthDate === "string"


  ){return true }else{
    return false
  }
}


async function getChefBirthday(id:number): Promise<string | null> {
  
  try{
  const response = await fetch(`https://dummyjson.com/recipes/${id}`)
  const resultId:unknown = await response.json()
        if(isRecipe(resultId)){
          const { userId } = resultId
              try{
              const secondResponse = await fetch(`https://dummyjson.com/users/${userId}`)
              const chef:unknown = await secondResponse.json()
              console.log(chef)
                if(isChef(chef)){ 
                         const { birthDate } = chef
                                console.log(`complimenti il giorno del compleanno dello chef è ${birthDate}`)
                                 return birthDate
                                 }else{
                                  return null
                                 }
            }catch(error:unknown)
                  {
                    if(typeof error === "string"){
                      throw new Error("errore generico di tipo"+error)
                    }else{
                      return null
                    }

                  }
                    }
                  return null
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
