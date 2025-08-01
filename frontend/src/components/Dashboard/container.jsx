import React, { useState } from 'react'
import '../../styles/container.css'
import BrokerCheck from './brokercheck'
import LiveData from '../LiveFeed/livedata'
import History from '../HistoryModal/history'

const Container = () => {
  const [showTable, setShowTable] = useState(false);

  return (
    <div className='container'>
      <h1 className='header' style={{ marginBottom: '1.5rem' }}>MQTT LIVE DASHBOARD</h1>
      {showTable ? (
        <History showTable={showTable} setShowTable={setShowTable} />
      ) : (
        <div className='dashboard-content'>
          <History showTable={showTable} setShowTable={setShowTable}>
            <BrokerCheck />
            <LiveData />
          </History>
        </div>
      )}
    </div>
  )
}

export default Container