import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]); // Initialisation du tableau de données
    const [rowsToUpdate, setRowsToUpdate] = useState([]); // Initialisation des lignes à mettre à jour

    return (
        <DataContext.Provider
            value={{
                data, setData,
                rowsToUpdate, setRowsToUpdate
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    return useContext(DataContext);
};