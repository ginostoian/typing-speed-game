import useWordGame from './hooks/useWordGame'

function App() {
  const { textareaRef, handleChange, text, isTimeRunning, timeRemaining, wordCount, startGame } = useWordGame(15)

  return (
    <>
      <h1>How fast can you type?</h1>
      <textarea
        ref={textareaRef}
        onChange={handleChange}
        name="text"
        value={text.text}
        placeholder="The highest typing speed ever recorded is 216 words per minute"
        disabled={!isTimeRunning}
      />
      <h4>Time remaining: {timeRemaining}s</h4>
      <button disabled={isTimeRunning} onClick={startGame}>{timeRemaining !== 0 ? 'Start' : 'Play again'}</button>
      <h4>You typed {wordCount} words in 15 seconds</h4>
      <h2>Your speed is: {wordCount * 4} wpm</h2>
    </>
  )
}

export default App;
