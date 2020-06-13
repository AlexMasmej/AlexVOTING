import React from 'react'
import { PageHeader } from 'antd';

export default function Header(props) {
  return (
    <div onClick={()=>{
      window.open("https://twitter.com/AlexMasmej");
    }}>
      <PageHeader
        title="CONTROL MY LIFE via $ALEX"
        style={{cursor:'pointer'}}
      />
    </div>
  );
}
