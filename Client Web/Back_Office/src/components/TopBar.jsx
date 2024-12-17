import AddButton from "./AddButton.jsx";
import UpdateButton from "./UpdateButton.jsx";
import Model from "./Model.jsx";
import {Divider, Input, Typography} from 'antd';
import { IoSearch } from "react-icons/io5";
import Icon from "./Icon.jsx";

const { Title } = Typography;

function TopBar({children}) {
  return (
    <>
      <div
        id="topBar"
        style={{
          marginLeft: -257,
          paddingLeft: 257,
          width: "100%",
          height: '80px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <span style={{display: "flex", alignItems: "center", gap: 10, width: 390, paddingLeft: '20px' }}>
          <Title id={"titleIcon"} level={2} >{Icon()}</Title>
          <Title id={"titleLabel"} level={3} >{Model()}</Title>
        </span>
        <Divider type="vertical"
                 style={{height: '80px', backgroundColor: '#9A9A9970'}}/>
        <div style={{display: "flex", alignItems: "center", width:'100%', justifyContent: "flex-end", paddingRight: 15}}>
          <Input prefix={<IoSearch/>} size="large" style={{margin: '0 10px 0 10px'}} placeholder={"Search..."}/>
          <UpdateButton />
          <AddButton />
        </div>
      </div>
        <div style={{
          height: '100%',
          padding: '20px',
        }}>
          {children}
      </div>
    </>
  )
}

export default TopBar;