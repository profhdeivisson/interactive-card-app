import { createContext, useState, useContext } from "react";

// Criar o contexto do cartão
const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expDate: "",
    cvc: "",
    cardType: "default",
  });

  const [confirmed, setConfirmed] = useState(false); // Estado de confirmação

  return (
    <CardContext.Provider
      value={{ cardDetails, setCardDetails, confirmed, setConfirmed }}
    >
      {children}
    </CardContext.Provider>
  );
};

// Hook para usar o contexto do cartão
export const useCard = () => useContext(CardContext);
