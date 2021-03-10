import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import UserContext from '../context/UserContext';

/** Home Page */
function Home() {
	const user = useContext(UserContext);
	let content;
	if (Object.keys(user).length) {
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
