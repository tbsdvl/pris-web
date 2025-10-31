import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";

const apiScope = import.meta.env.VITE_API_SCOPE;

export const useAcquireToken = () => {
  const { instance, accounts } = useMsal();
  const [tokenResult, setTokenResult] = useState('');

  useEffect(() => {
    (async () => {
      const account = accounts[0];
      if (account) {
        const authenticationResult = await instance.acquireTokenSilent({
          account: account,
          scopes: [apiScope],
        });

        setTokenResult(authenticationResult.accessToken);
      }
    })();
  }, [instance, accounts]);

  return tokenResult;
}