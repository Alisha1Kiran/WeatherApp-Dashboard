import React, { useState, useEffect} from 'react'

const DarkmodeToggle = () => {

    const [darkMode, setDarkMode] = useState();

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
          } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
          }
    }, [darkMode])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
      };
  return (
    <>
    {/* <h1>jjnreigjk</h1> */}
    {/* <button onClick={toggleDarkMode}>
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button> */}
    <div style={{ padding: '16px', textAlign: 'center', backgroundColor: '#f0f0f0', border: '1px solid #ccc' }}>
      <h3>Custom Sidebar</h3>
      <p>This is custom sidebar content.</p>
    </div>
    </>
  )
}

export default DarkmodeToggle