import { Link } from "react-router-dom";

export default function Login({ email, setEmail, password, setPassword, loginHandler }) {
  return (
    <form onSubmit={loginHandler}>
      <h1>Welcome to the MERN To-Do App</h1>
      <h3>Login</h3>

      <input
        className="inputbox"
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <br />
      <br />

      <input
        className="inputbox"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <br />
      <br />

      <button type="submit">Login</button>

      <p>
        New user? <Link to="/signup">Create account</Link>
      </p>
    </form>
  );
}