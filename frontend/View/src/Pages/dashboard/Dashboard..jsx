import React from 'react'
import DefaultPage from '../../components/defaultPage/DefaultPage';
import BlockCoinsValue from '../../components/block/BlockCoinsValue';
import { getValueCoins } from '../../utils/requests/getFuncionalidades';
function Dashboard() {
 
  return (
    <div>
      <DefaultPage>
        <BlockCoinsValue request={getValueCoins}/>
      </DefaultPage>
    </div>
  )
}

export default Dashboard