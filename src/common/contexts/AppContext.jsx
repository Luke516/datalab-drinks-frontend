import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { menu } from "../../modules/api/drinkMenuBackup";
import { getMenu } from "../../modules/api/drinkMenu";

export const AppContext = createContext();

export function AppContextProvider(props) {
  // const menu = menu; //TODO
  const [drinkData, setDrinkData] = useState(menu);
  const [fallback, setFallback] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [focusDrinkId, setFocusDrinkId] = useState("");
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    //   setLoading(false);
  }, []);

  const router = useRouter();


  //TODO

  useEffect(() => {
    // TODO
    getMenu()
      .then(items => {
        console.log(items);
        console.log(items.payload);
        setDrinkData(items.payload);
      })
      .catch((error) => {
        console.error(error);
        setFallback(true);
      })
      .finally(() => {
        setTimeout(() => {
          if (window._jf) window._jf.flush();
        }, 500);
      })
  }, [])

  const contextValue = {

    drinkData,
    showSuccessModal,
    setShowSuccessModal,
    focusDrinkId,
    setFocusDrinkId,
    fallback
  };

  return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
