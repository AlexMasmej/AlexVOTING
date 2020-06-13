import React from 'react'
import { PageHeader } from 'antd';

export default function Header(props) {
  return (
    <div onClick={()=>{
      window.open("https://twitter.com/AlexMasmej");
    }}>
      <PageHeader
        title="VOTE ON MY LIFE via $ALEX"
        subTitle="Pick one challenge, and I will do it next month."
        style={{cursor:'pointer'}}
      />
    </div>
  );
}
