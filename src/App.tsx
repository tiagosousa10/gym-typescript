import { useState } from "react"
import Navbar from "./scenes/navbar"  
import { SelectedPage } from "./shared/types"


function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home) // starts with home from enum

  return (
    <div className="app bg-gray-20" >
     <Navbar 
      selectedPage={selectedPage} 
      setSelectedPage={setSelectedPage}
     />
    </div>
  )
}

export default App
