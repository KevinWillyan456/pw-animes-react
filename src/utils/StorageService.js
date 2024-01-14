export default class StorageService {
    create(id, number) {
        const values = localStorage.getItem('history')
        if (values) {
            const history = JSON.parse(values)
            const item = history.find((item) => item.id === id)
            if (item) {
                item.number = number
                localStorage.setItem('history', JSON.stringify(history))
                return
            }
            history.push({ id: id, number: number })
            localStorage.setItem('history', JSON.stringify(history))
            return
        } else {
            const data = {
                id: id,
                number: number,
            }
            localStorage.setItem('history', JSON.stringify([data]))
        }
    }

    read(id) {
        const value = localStorage.getItem('history')
        if (value) {
            const history = JSON.parse(value)
            const item = history.find((item) => item.id === id)
            if (item) {
                return item.number
            }
        }
        return 0
    }
}
