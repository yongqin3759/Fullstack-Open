import { useState } from "react"

const LoginForm = ({ login }) => {
	const [loginVisible, setLoginVisible] = useState(false)
	const hideWhenVisible = { display: loginVisible ? "none" : "" }
	const showWhenVisible = { display: loginVisible ? "" : "none" }
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const handleLogin = (e) => {
    e.preventDefault()
    login(username,password)
    setUsername('')
    setPassword('')
  }
	return (
    <div>
			<div style={hideWhenVisible}>
				<button onClick={() => setLoginVisible(true)}>log in</button>
			</div>
			<div style={showWhenVisible}>
			<div>
				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							type="text"
							value={username}
							name="Username"
							onChange={(e)=> setUsername(e.target.value)}
						/>
					</div>
					<div>
						password
						<input
							type="password"
							value={password}
							name="Password"
							onChange={(e)=> setPassword(e.target.value)}
						/>
					</div>
					<button type="submit">login</button>
				</form>
        </div>
			<button onClick={() => setLoginVisible(false)}>cancel</button>
			</div>
		</div>
	)
}

export default LoginForm
