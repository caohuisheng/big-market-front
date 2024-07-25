"use client"

import {strategyArmory} from '@/src/apis/index'

export function StrategyArmory(){
    const StrategyArmoryHandle = async () => {
        const queryParams = new URLSearchParams(window.location.search)
        const strategyId = Number(queryParams.get('strategyId'))
        if(!strategyId){
            window.alert('请在url中配置策略id参数！')
        }
        const res = await strategyArmory(strategyId)
        const {code, info} = await res.json()
        if(code != "0000"){
            window.alert('策略装配失败')
            return
        }
        window.alert('策略装配成功！')
    }

    return <div
        className="px-6 py-2 mb-8 text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none 
        focus:ring-2 focus:ring-blue-300"
        style={{cursor: "pointer"}}
        onClick={StrategyArmoryHandle}
    >
        装配抽奖
    </div>
}