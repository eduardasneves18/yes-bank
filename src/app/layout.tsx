'use client'
import { Provider } from 'react-redux';
import Dashboard from './components/dashboard/dashboard';
import { Header } from 'yes-bank-components';
import "./globals.css";
import React from 'react';
import store from './store/store';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en">
      <body className='main-layout'>
        <Provider store={store}>
        <Header user="N" type="S"/>
          <Dashboard>
            {props.children}
          </Dashboard>
        </Provider>
      </body>
    </html>
  );
}
