import { useState, useRef, useEffect } from "react";

function WordGame(startingTime = 10) {
    const STARTING_TIME = startingTime

    const [text, setText] = useState({ text: '' })
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const textareaRef = useRef(null)

    function startGame() {
        if (timeRemaining !== 0) {
            setIsTimeRunning(true)
            setText({ text: '' })
            textareaRef.current.disabled = false
            textareaRef.current.focus()
        } else if (timeRemaining === 0) {
            setTimeRemaining(startingTime)
            setIsTimeRunning(true)
            setText({ text: '' })
            textareaRef.current.disabled = false
            textareaRef.current.focus()
        }
    }

    function endGame() {
        setIsTimeRunning(false)
        setWordCount(countWords(text.text))
    }

    useEffect(() => {
        if (isTimeRunning) {
            const Timer = setTimeout(() => {
                setTimeRemaining(prevState => prevState - 1)
            }, 1000)
            if (timeRemaining === 0) {
                clearInterval(Timer)
                endGame()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeRemaining, isTimeRunning])


    const handleChange = (e) => {
        const { name, value } = e.target
        setText({
            [name]: value
        })
    }

    function countWords(text) {
        const wordsArray = text.trim().split(' ')
        const filteredWords = wordsArray.filter(word => word !== '')
        return filteredWords.length
    }

    return { textareaRef, handleChange, text, isTimeRunning, timeRemaining, wordCount, startGame }
}

export default WordGame