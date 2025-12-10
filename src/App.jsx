// import './App.css'

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Clock from "./components/clock/Clock"
import Taskbar from "./components/taskbar/Taskbar"
import Window from "./components/window/Window"

function App() {
  // const [windowState, setWindowState] = useState([]);
  const dispatch = useDispatch();
  const windowState = useSelector(state => state.win);

  // console.log(windowState);
  

  return (
    <div id='screen-bg' className='relative h-screen w-full overflow-hidden bg-cover bg-center bg-zinc-600' style={{backgroundImage: "url('../bg-images/lofi-bg.jpg')"}}>

      {/* Clock and day info will be here */}
      <Clock />

      {/* App will be here */}
      {windowState.windows.map(window => (
        <Window windowData={window} key={window.id} />
        // <Window toolName={window.toolName} toolWidget={window.element} key={window.id} />
      ))}
      {/* <Window toolName="To-Do" toolWidget={<p>This is a todo widget</p>} /> */}

      <Taskbar />
    </div>
  )
}

export default App