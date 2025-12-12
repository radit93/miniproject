import { createContext, useContext, useState } from "react";

const HeroContext = createContext();

export function HeroProvider({ children }) {
  const [isOnHero, setIsOnHero] = useState(false);
  return (
    <HeroContext.Provider value={{ isOnHero, setIsOnHero }}>
      {children}
    </HeroContext.Provider>
  );
}

export function useHero() {
  return useContext(HeroContext);
}
