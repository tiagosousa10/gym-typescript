import { useEffect, useState } from "react"
import Navbar from "./scenes/navbar"  
import Home from "./scenes/home"  
import { SelectedPage } from "./shared/types"


function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home) // starts with home from enum
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY === 0) { // if at the top of the page
        setIsTopOfPage(true)
        setSelectedPage(SelectedPage.Home)
      }

      if(window.scrollY !== 0) {
        setIsTopOfPage(false) // if not at the top of the page
      }
    }
    window.addEventListener("scroll", handleScroll) // add the scroll event listener

    return () => window.removeEventListener("scroll", handleScroll)

  },[])


  return (
    <div className="app bg-gray-20" >
     <Navbar 
      isTopOfPage={isTopOfPage}
      selectedPage={selectedPage} 
      setSelectedPage={setSelectedPage}
     />
     <Home selectedPage={selectedPage} />
    </div>
  )
}

export default App
