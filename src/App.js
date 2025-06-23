import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SignIn from './Pages/Sign-in';
import SignUp from './Pages/Sign-up';

function App() {

	return (
		<div>
			<BrowserRouter>
				<Routes>

 					<Route path='/sign-in' element={<SignIn />} />
 					<Route path='/sign-up' element={<SignUp />} />

				</Routes>
			</BrowserRouter>

		</div>

	)
}

export default App;
