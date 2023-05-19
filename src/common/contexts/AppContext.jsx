import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { menu } from "../../modules/api/drinkMenuBackup";
import { getCustomers, getMenu } from "../../modules/api/drinkMenu";

export const AppContext = createContext();

const dummyCustomers = ["老師", "吳義路", "林玉山", "王亨傑","徐偉倫","袁嘉宏","韓宜庭","張育榮","王平郁","何星緯","孫浩倫","蘇瑞揚","林雨萱","羅昱喬","許尊霖","徐郁閎","詹其侁","蔡怡君",
"義路", "玉山", "亨傑","偉倫","嘉宏","宜庭","育榮","平郁","星緯","浩倫","瑞揚","雨萱","昱喬","尊霖","郁閎","其侁","怡君"];

export function AppContextProvider(props) {
  // const menu = menu; //TODO
  const [drinkData, setDrinkData] = useState(menu);
  const [customers, setCustomers] = useState(dummyCustomers);
  const [fallback, setFallback] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [focusDrinkId, setFocusDrinkId] = useState("");
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    //   setLoading(false);
  }, []);

  const router = useRouter();

  useEffect(() => {
    // TODO: better handle fallback
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
          // TODO: move to utils
          if (window._jf && typeof window._jf.flush === "function" ) window._jf.flush();
        }, 500);
      })
    
    getCustomers().then(customers => {
      setCustomers(customers)
    })
  }, [])

  const contextValue = {

    drinkData,
    showSuccessModal,
    setShowSuccessModal,
    focusDrinkId,
    setFocusDrinkId,
    fallback,
    customers
  };

  return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
