import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from 'redux/user';

function App() {
	useEffect(() => {}, [authenticated]);

	return <div className="App"></div>;
}

export default App;
