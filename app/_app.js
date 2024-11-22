// app/_app.js
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css'; // Adjust the path as necessary

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
