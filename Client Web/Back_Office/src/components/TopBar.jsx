import AddButton from "./AddButton.jsx";
import UpdateButton from "./UpdateButton.jsx";
import Model from "./Model.jsx";
import {Divider, Input, Typography} from 'antd';
import { IoSearch } from "react-icons/io5";
import Icon from "./Icon.jsx";

const { Title } = Typography;

function TopBar({children}) {
  return (
    <div
      id="topBar"
      style={{
        width: '100%',
        height: '80px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <span style={{display: "flex", alignItems: "center", gap: 10, width: 380, paddingLeft: '20px' }}>
        <Title id={"titleIcon"} level={2} >{Icon()}</Title>
        <Title id={"titleLabel"} level={3} >{Model()}</Title>
      </span>
      <Divider type="vertical"
               style={{height: '80px', backgroundColor: 'rgba(154,154,153,0.44)'}}/>
      <div style={{position: 'absolute', left: 430, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div>

        </div>
      </div>
      <div style={{
        position: 'fixed',
        top: 80,
        left: 257,
        width: '100%',
        height: '100%',
        padding: 20,
      }}>
        {children}
      </div>
    </div>
  )
}

export default TopBar;