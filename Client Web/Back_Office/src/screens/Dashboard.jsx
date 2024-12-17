import {MainMenu} from "../components/MainMenu.jsx";
import TopBar from "../components/TopBar.jsx";

export default function Dashboard({children}) {
  return (
      <MainMenu>
        <TopBar>
          {children}
        </TopBar>
      </MainMenu>
  )
}