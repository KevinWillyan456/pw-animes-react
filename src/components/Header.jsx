import './Header.css'
import { Search } from './Search'

export function Header() {
    return (
        <>
            <header className="cabecalho">
                <div className="logo">
                    <div className="part-1">Pw</div>
                    <div className="part-2">Animes</div>
                </div>
                <nav className="navbar">
                    <ul className="navbar-ul">
                        <li>
                            <a href="#">Início</a>
                        </li>
                        <li>
                            <a href="#">Lista de Animes</a>
                        </li>
                        <li>
                            <a href="#">Favoritos</a>
                        </li>
                        <li>
                            <a href="#">Mangás</a>
                        </li>
                        <li>
                            <a href="#">Calendário</a>
                        </li>
                        <li>
                            <a href="#">Como assistir?</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <Search />
        </>
    )
}
