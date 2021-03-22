import './scss/app.scss';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';

const App = () => {
	return (
		<div className="app">
			<div className="conteiner">
				<div className="app__body">
					<Header />
					<Main />
					<Footer />
				</div>
			</div>
		</div>
	);
}

export default App;
