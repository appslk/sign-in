import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from "../src/Pages/Home";
import CarrotechChecker from './Pages/carrotechChecker';
import SignIn from './Pages/Sign-in';
import SignUp from './Pages/Sign-up';

function App() {

	return (
		<div>
			<BrowserRouter>
				<Routes>

 					<Route path='/s' element={<Home />} />
 					<Route path='/sign-in' element={<SignIn />} />
 					<Route path='/sign-up' element={<SignUp />} />

				</Routes>
			</BrowserRouter>

		</div>

	)
}

export default App;
