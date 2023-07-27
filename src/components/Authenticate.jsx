import { useState } from "react"

export default function Authenticate({token}) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [userNum, setUserNum] = useState(null)

  async function handleClick() {
    try{
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      const result = await response.json()
      setSuccessMessage(result.message)
      setUserNum(result.data.username)
      console.log(result)

    } catch(error){
      setError(error.message)
    }  
  }

  return (
    <div className="authenticateContainer">
      <h2>Authenticate</h2>
      <button onClick={handleClick}>Authenticate Token!</button>
      {successMessage && <p className="success">{successMessage}</p>}
      {userNum && <p className="success">Welcome back {userNum}</p>}
      {error && <p className="error">{error}</p>}
    </div>  
  )

}