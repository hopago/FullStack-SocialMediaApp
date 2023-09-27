import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';


const Login = () => {

  const { currentUser, login } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
            voluptatem voluptatibus tempora minus blanditiis at? Libero
            repellat, amet fuga enim delectus officiis. Modi aut et optio
            laudantium placeat temporibus veniam.
          </p>
          <span>Don't you have an account?</span>
          <Link to='/register' className='link'>
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input name='username' onChange={handleChange} type="text" placeholder='Username' />
            <input name='password' onChange={handleChange} type="password" placeholder='Password' />
            {err && <span style={{ color: "red" }}>{err}</span>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login
