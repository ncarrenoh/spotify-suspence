import React from 'react';
import { getClientCredentials } from '../../api/create-token';
export const useFetchToken = () => {
  const [token, setToken] = React.useState(null);
  React.useEffect(() => {
    const getToken = async () => {
      const res = await getClientCredentials();
      const { access_token } = res;
      setToken(access_token);
    };
    getToken();
  }, [])
  return token;
}