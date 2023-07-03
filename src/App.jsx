import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Anime } from './pages/Anime'
import { Search } from './pages/Search'

import './styles/globalStyles.css'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/anime/:id" element={<Anime />} />
                    <Route path="search" element={<Search />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
