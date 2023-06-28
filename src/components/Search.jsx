import './Search.css'
import { AiOutlineSearch } from 'react-icons/ai'

export function Search() {
    return (
        <div className="pesquisa">
            <AiOutlineSearch className="icon" />
            <input type="text" placeholder="Digite o nome do anime..." />
        </div>
    )
}
