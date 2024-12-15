import AddButton from "./AddButton.jsx";
import UpdateButton from "./UpdateButton.jsx";

function TopBar({children}) {
  return (
    <div
      className="top-bar"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: 'red',
        width: '100%',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <UpdateButton/>
      <AddButton/>
      <div style={{
        position: 'fixed',
        top: 80,
        left: 257,
        width: '100%',
        height: '100%',
        border: '2px solid blue',
        padding: 20,
      }}>
        {children}
      </div>
    </div>
  )
}
export default TopBar;