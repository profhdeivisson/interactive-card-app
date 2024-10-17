import { createContext, useState, useContext } from "react";


const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expDate: "",
    cvc: "",
    cardType: "default",
  });

  const [confirmed, setConfirmed] = useState(false); 

  return (
    <CardContext.Provider
      value={{ cardDetails, setCardDetails, confirmed, setConfirmed }}
    >
      {children}
    </CardContext.Provider>
  );
};


export const useCard = () => useContext(CardContext);
