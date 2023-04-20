import React from "react";
import { ThemesProvider } from "./ThemesContext";
import { KycProvider } from "./KycContext";
import { VeridaProvider } from "./VeridaContext";
import MetamaskContext from "./MetamaskContext";

type Props = {
  children?: React.ReactNode;
};

export const AppContextProvider: React.FunctionComponent<Props> = (props) => {
  return (
    <VeridaProvider>
      <KycProvider>
        <MetamaskContext>
          <ThemesProvider>{props.children}</ThemesProvider>
        </MetamaskContext>
      </KycProvider>
    </VeridaProvider>
  );
};
