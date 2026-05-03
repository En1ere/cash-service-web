import MainPage from './assets/pages/MainPage/MainPage'
import { Header } from './assets/components/Header/Header'
import { store } from '../src/assets/app/store'
import { Provider } from 'react-redux'
import './App.scss'

function App() {
    return (
        <Provider store={store}>
            <Header />
            <MainPage />
        </Provider>
    )
}

export default App
