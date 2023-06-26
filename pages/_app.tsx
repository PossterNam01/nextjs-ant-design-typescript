import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';

import 'antd/dist/antd.less';
import '../components/Layout.css';

const AppLayout = dynamic(() => import('../components/Layout'), { ssr: false });
const SignInLayout = dynamic(() => import('../pages/authentication/sign-in'), {
  ssr: false,
});
export default function MyApp({ Component, pageProps }: AppProps) {
  const [checkToken, setCheckToken] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setCheckToken(true);
    }
  }, []);

  return (
    <div>
      {!checkToken ? (
        <SignInLayout />
      ) : (
        <AppLayout>
          {/* <Head> */}
          <title>NextJs Antdesign Typescript</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* </Head> */}
          <Component {...pageProps} />
        </AppLayout>
      )}
    </div>
  );
}
