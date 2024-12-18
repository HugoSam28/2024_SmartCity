import AddButton from "./AddButton.jsx";
import UpdateButton from "./UpdateButton.jsx";
import Model from "./Model.jsx";
import {Divider, Input, Typography} from 'antd';
import { IoSearch } from "react-icons/io5";
import Icon from "./Icon.jsx";
import {useDataContext} from "../contexts/DataTransferContext.jsx";
import {useState} from "react";
import {useLanguageContext} from "../contexts/LanguageContext.jsx";

const { Title } = Typography;
const {Search} = Input;

function TopBar({children}) {
  const {t} = useLanguageContext();
  const {setSearchValue} = useDataContext()
  const [search, setSearch] = useState("");

  const onOk = () => {
    setSearchValue(search);
  }
  return (
    <>
      <div
        id="topBar"
        style={{
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
        <div style={{display: "flex", alignItems: "center", width:'100%', justifyContent: "flex-end", paddingRight: 20}}>
          <Search
            prefix={<IoSearch/>}
            size="large"
            style={{margin: '0 10px 0 10px'}}
            placeholder={`${t('search')}...`}
            onChange={(e)=>setSearch(e.target.value)}
            enterButton={t('search')}
            onSearch={onOk}
            onPressEnter={onOk}
          />
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