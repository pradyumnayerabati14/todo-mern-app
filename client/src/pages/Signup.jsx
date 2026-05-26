import { Link } from "react-router-dom";

export default function Signup({
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
  signupHandler
}) {
  return (
    <form onSubmit={signupHandler}>
      <h1>Create Account</h1>
      <input
        className="inputbox"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        />

        <br />
        <br />

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

      <button type="submit">Signup</button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}