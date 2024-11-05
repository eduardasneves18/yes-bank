'use client'
import Dashboard from './components/dashboard/dashboard';
import Header from './components/header/header';
import "./globals.css";
import React from 'react';

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en">
      <body className='main-layout'>
        <Header user="N"></Header>
        <Dashboard>
          {props.children}
        </Dashboard>
      </body>
    </html>
  );
}
