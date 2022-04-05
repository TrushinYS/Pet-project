import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NewsListPage from "./components/pages/MainPage/NewsListPage";
import NewsItemPage from "./components/pages/NewsPage/NewsItemPage";


export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element = {<NewsListPage/>}/>
				<Route path ='/:id' element ={<NewsItemPage/>} />
			</Routes>
		</BrowserRouter>
		
	);
}
