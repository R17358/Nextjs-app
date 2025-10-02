// app/layout.
"use client";
import { ClerkProvider } from '@clerk/nextjs'
import { Provider } from 'react-redux'
import store from '../redux/store'
import './globals.css'
import Header from '../components/Header'


export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: ['dark', 'simple'] }}>
      <Provider store={store}>
        <html lang="en">
          <body>
            <Header />
            {children}
          </body>
        </html>
      </Provider>
    </ClerkProvider>
  )
}
