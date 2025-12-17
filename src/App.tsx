/**
In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id).
 Questa funzione accetta un id di una ricetta e deve:

Recuperare la ricetta da https://dummyjson.com/recipes/{id}

Estrarre la proprietà userId dalla ricetta

Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}

Restituire la data di nascita dello chef

Note del docente
Scrivi la funzione getChefBirthday(id), che deve:
Essere asincrona (async).
Utilizzare await per chiamare le API.
Restituire una Promise con la data di nascita dello chef.
Gestire gli errori con try/catch */



async function getChefBirthday(id:number): Promise<string | null> {
  
  try{
  const response = await fetch(`https://dummyjson.com/recipes/${id}`)
  const resultId = await response.json()
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

getChefBirthday(1)


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
