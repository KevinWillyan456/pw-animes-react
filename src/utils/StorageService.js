export default class StorageService {
    parseHistory() {
        const values = localStorage.getItem('history')
        try {
            return values ? JSON.parse(values) : []
        } catch (error) {
            console.error('Error parsing history:', error)
            return []
        }
    }

    updateHistory(history) {
        localStorage.setItem('history', JSON.stringify(history))
    }

    create(id, number) {
        const history = this.parseHistory()
        const item = history.find((item) => item.id === id)

        if (item) {
            item.number = number
        } else {
            history.push({ id, number })
        }

        this.updateHistory(history)
    }

    read(id, episodes = []) {
        const history = this.parseHistory()
        const item = history.find((item) => item.id === id)

        if (item) {
            let nextEpisodeNumber = item.number + 1

            while (
                nextEpisodeNumber <=
                Math.max(...episodes.map((episode) => episode.episodioNumero))
            ) {
                const episode = episodes.find(
                    (episode) => episode.episodioNumero === nextEpisodeNumber
                )

                if (
                    episode &&
                    episodes.find(
                        (episodeEach) =>
                            episodeEach.episodioNumero ===
                            episode.episodioNumero
                    )
                ) {
                    return item.number
                }

                nextEpisodeNumber++
            }

            const index = history.indexOf(item)
            history[index] = { id, number: 0 }
            this.updateHistory(history)
        }

        return 0
    }
}
