import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Wrapper } from "./Styles/App.styles";
type BitcoinData = {
  "15m": number;
  last: number;
  buy: number;
  sell: number;
  symbol: string;
};
type Currencies = {
  [key: string]: BitcoinData;
};
const getBCdata = async (): Promise<Currencies> =>
  await (await fetch("https://blockchain.info/ticker")).json();
const INTERVAL_TIME = 30000;
const App = () => {
  const [currency, setCurrnecy] = useState("USD");
  const handleCurrencySelection = (e: any) => {
    setCurrnecy(e.currentTarget.value);
  };
  const { data, isLoading, error, refetch } = useQuery<Currencies>(
    "bc-data",
    getBCdata
  );
  console.log("reftach", refetch);
  useEffect(() => {
    const interval = setInterval(refetch, INTERVAL_TIME);
    return () => clearInterval(interval);
  }, [refetch]);
  if (isLoading) return <div>Loading.....</div>;
  if (error) return <div>Something went wrong...</div>;
  return (
    <Wrapper>
      <>
        <h2>Bitcoin Price</h2>
        <select value={currency} onChange={handleCurrencySelection}>
          {data &&
            Object.keys(data).map((currency) => (
              <option value={currency} key={currency}>
                {currency}
              </option>
            ))}
        </select>
        <div>
          <h2>{data && data[currency].symbol}</h2>
          <h2>{data && data[currency].last}</h2>
        </div>
      </>
    </Wrapper>
  );
};

export default App;
