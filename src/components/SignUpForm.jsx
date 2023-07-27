import {useState} from 'react'



export default function SignUpForm({setToken}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault()

    try{

      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
        // fetch()'s second parameter, should be a POST method with a body containing username and password
        method: 'POST',
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      const result = await response.json()
      console.log(result)

      setToken(result.token)

    }catch(error){
      setError(error.message)
    }
  }

  return (
    <div className='signUpFormContainer'>
      <h2>Sign Up</h2>
      {error && <p className='error'>{error}</p>}
      <form onSubmit={handleSubmit}> 
        <label>
          Username: {''}<input type='text' value={username} onChange={(event) => setUsername(event.target.value)}  />
        </label>
        <label>
          Password: {''}<input type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button>Submit</button>
      </form>
    </div>  
  )

}