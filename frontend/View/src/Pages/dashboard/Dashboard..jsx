import React from "react";
import DefaultPage from "../../components/defaultPage/DefaultPage";
import BlockCoinsValue from "./blockCoins/BlockCoinsValue";
import { getValueCoins } from "../../utils/requests/getFuncionalidades";
import style from "./dashboard.module.css";
import BlockTotal from "./blockTotals/BlockTotal";
import AvaragesGraphics from "./averages/AvaragesGraphics";
function Dashboard() {
  return (
    <div>
      <DefaultPage>
        <div>
          <div className={style.container_block}>
            <BlockCoinsValue request={getValueCoins} />
            <BlockTotal />
          </div>
          <AvaragesGraphics />
        </div>
      </DefaultPage>
    </div>
  );
}

export default Dashboard;
