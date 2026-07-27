import { createContext, useContext, useState } from "react";

const LoadingContext = createContext<any>(null);

export const LoadingProvider = ({ children }: any) => {
   const [loading, setLoadingState] = useState(false);
   const [variant, setVariant] = useState<"fullscreen" | "content">("fullscreen");
   const setLoading = (
  loading: boolean,
  variant: "fullscreen" | "content" = "fullscreen"
) => {
  setLoadingState(loading);
  setVariant(variant);
};


    return (
        <LoadingContext.Provider value={{ loading, variant, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
