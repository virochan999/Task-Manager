import { useState } from "react"

interface NavigationPropTypes {
  filterTasksStatus: (status: string) => void
}

const Navigation = ({filterTasksStatus} : NavigationPropTypes) => {
  const [activeTab, setActiveTab] = useState(0)

  /* All nav links */
  const navData = [
    'All',
    'To-Do',
    'InProgress',
    'Done'
  ]

  /* Change the active tab */
  const changeActiveTab = (index: number, link: string) => {
    setActiveTab(index)
    filterTasksStatus(link)
  }

  /* Handle enter key press for tab change */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>, index: number, link: string) => {
    if(e && e.key === 'Enter') {
      changeActiveTab(index, link)
    }
  }

  return (
    <div className="home-page__navlinks-wrapper">
      { navData.map((link, index) => (
        <div 
          key={`tabs-${link}`} 
          className={`home-page__link-container ${activeTab == index ? 'active' : ''}`}
          onClick={() => changeActiveTab(index, link)}
          tabIndex={0}
          onKeyDown={(event) => handleKeyPress(event, index, link)}
        >
          <span className={`home-page__link-indicator ${link.toLowerCase()}`}></span>
          <span className="home-page__link">
            {link}
          </span>
        </div>
      )) }
    </div>
  )
}

export default Navigation