import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import App from '../App';

function Home() {
	const user = useContext(App.UserContext);
	let content;
	if (user) {
		content = (
      <h3>Welcome Back, {user.firstName}!</h3>
    );
	} else {
    content = (
      <>
        <Link to={`/login`}>
          <button>Log in</button>
        </Link>
        <Link to={`/signup`}>
          <button>Sign up</button>
        </Link>
      </>
    )
	}

	return (
		<div className="Home">
			<h1>Jobly</h1>
			<p>All the jobs in one, convenient place.</p>
			{content}
		</div>
	);
}

export default Home;
