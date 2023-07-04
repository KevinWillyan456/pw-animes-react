import { useState } from 'react'
import './SearchInput.css'
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

export function SearchInput() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!search) return

        navigate(`/search?q=${search}`, { replace: true })
        setSearch('')
    }

    return (
        <div className="pesquisa">
            <form onSubmit={handleSubmit}>
                <button type="submit">
                    <AiOutlineSearch className="icon" />
                </button>
                <input
                    type="text"
                    placeholder="Digite o nome do anime..."
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </form>
        </div>
    )
}
