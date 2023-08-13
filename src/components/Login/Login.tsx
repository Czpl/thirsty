import {useState, useEffect} from 'react';
import {  signInWithEmailAndPassword, onAuthStateChanged   } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { NavLink, useNavigate } from 'react-router-dom'
 
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });

  },)

  const onLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/")
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
       
  }
 
  return(
    <>
      <div>                                            
        <h2> Login </h2>
        <form>                                              
          <div>
            <label htmlFor="email-address">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"                                    
              required                                                                                
              placeholder="Email address"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"                                    
              required                                                                                
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
                                                
          <div>
            <button                                    
              onClick={onLogin}                                        
            >      
              Login                                                                  
            </button>
          </div>                               
        </form>
                       
        <p>
           No account yet? {' '}
          <NavLink to="/signup">
            Sign up
          </NavLink>
        </p>
                                                   
      </div>
    </>
  )
}
 
export default Login