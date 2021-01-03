import React, { useState, useEffect } from 'react';
import './App.css';
import './Normalize.css';

const App = () => {

  const [isActive, setIsActive] = useState(false);
  const [ss, setSs] = useState(0);
  const [mm, setMm] = useState(0);
  const [hh, setHh] = useState(0);

  const toggle = () => {
    setIsActive(!isActive)
  }

  const reset = () => {
    setIsActive(false);
    setSs(0);
    setMm(0);
    setHh(0);
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setSs(ss => ss + 1)
        if (ss === 59) {
          setSs(0)
          setMm(mm => mm + 1)
          if (mm === 59 && ss === 59) {
            setMm(0)
            setHh(hh => hh + 1)
            if (hh === 23 && mm === 59 && ss === 59) {
              reset()
            }
          }
        }
      }, 1000)
    }

    if (!isActive && ss !== 0) {
        return () => clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive, hh, mm, ss])

  return(
    <div className="App">
      <header>
        <nav className="App-Nav">
          <a href="/" className="App-NavLogo">Alessandro</a>
          <div className="App-NavItems">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="https://github.com/alessandrohenriqueramos" target="_blank" rel="noreferrer">GitHub</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <section>
        <div className="App-Container">
          <div className="buttons">
            <i className="fas fa-clock" onClick={toggle}></i>
            <i className="fas fa-sync" onClick={reset}></i>
          </div>
          <div className="stopwatch">
            <p>{hh < 10 ? '0' + hh : hh}:{mm < 10 ? '0' + mm : mm}:{ss < 10 ? '0' + ss : ss}</p>
          </div>
        </div>
      </section>
      <footer>
        <p>Veja o código fonte no meu <a href="https://github.com/alessandrohenriqueramos/stop-watch">GitHub <i className="fab fa-github"></i></a></p>
        <p>Desenvolvido por Alessandro Henrique Ramos.</p>
      </footer>
    </div>
  );
}

export default App;
