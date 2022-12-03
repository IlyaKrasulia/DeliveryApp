import React, { useState } from 'react';

import './App.css';

import Tab from './components/Tab';
import Shares from './components/Shares';
import TimePickup from './components/TimePickup';
import TimeDelivery from './components/TimeDelivery';
import PriceDelivery from './components/PriceDelivery';
import OffApp from './components/OffApp';

function App() {
  const [ activeTab, setActiveTab ] = useState(0);

  const changeTabActive = (index) => {
    index === activeTab ? setActiveTab(0) : setActiveTab(index);
  }

  return (
    <div className="App">           
      <div className='tabWrapper'>
        <Tab 
          title={"Час самовивозу"} 
          handleClick={() => changeTabActive(1)} 
          opened={activeTab===1 ? true : false}
        />
       {activeTab===1 && 
          <TimePickup />
       }
      </div>
      <div className='tabWrapper'>
        <Tab 
          title={"Час доставки"} 
          handleClick={() => changeTabActive(2)}
          opened={activeTab===2 ? true : false}
        />
        {activeTab===2 && <TimeDelivery />}
      </div>
      <div className='tabWrapper'>
        <Tab 
          title={"Вартість доставки"} 
          handleClick={() => changeTabActive(3)}
          opened={activeTab===3 ? true : false}
        />
        {activeTab===3 && <PriceDelivery />}
      </div>
      <div className='tabWrapper'>
        <Tab 
          title={"Акційні пропозиції"} 
          handleClick={() => changeTabActive(4)}
          opened={activeTab===4 ? true : false}
        />
        {activeTab===4 && <Shares />}
      </div>
      <div className='tabWrapper'>
        <Tab 
          title={"Вимкнути додаток"} 
          inline={{color: "#F80F39"}} 
          handleClick={() => changeTabActive(5)}
          opened={activeTab===5 ? true : false}
        />
        {activeTab===5 && <OffApp />}
      </div>
    </div>
  );
}

export default App;
