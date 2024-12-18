import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({ elements: [], nbPages: 0 });
  const [rowsToUpdate, setRowsToUpdate] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [orderBy, setOrderBy] = useState("");

    return (
      <DataContext.Provider
        value={{
          data, setData,
          rowsToUpdate, setRowsToUpdate,
          page, setPage,
          searchValue, setSearchValue,
          orderBy, setOrderBy,
        }}
      >
        {children}
      </DataContext.Provider>
    );
};

export const useDataContext = () => {
    return useContext(DataContext);
};