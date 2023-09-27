import { Link } from 'react-router-dom';
import './register.scss';
import { useState } from 'react';
import { baseReq } from '../../requestMethods';


const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: ""
  });

  const [err, setErr] = useState(false);

  const handleInputs = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await baseReq.post("/auth/register", inputs);
    } catch (err) {
      console.log(err);
      setErr(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Howitter</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
            voluptatem voluptatibus tempora minus blanditiis at? Libero
            repellat, amet fuga enim delectus officiis. Modi aut et optio
            laudantium placeat temporibus veniam.
          </p>
          <span>Do you have an account?</span>
          <Link to='/login' className='link'>
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" name='username' onChange={handleInputs} placeholder='Username' />
            <input type="email" name='email' onChange={handleInputs} placeholder='Email' />
            <input type="password" name='password' onChange={handleInputs} placeholder='Password' />
            <input type="text" name='name' onChange={handleInputs} placeholder='Name' />
            {err && <span style={{ color: "crimson" }}>{err}</span>}
            <button onClick={handleSubmit}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register