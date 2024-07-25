import { mock } from "node:test"

const apiHostUrl = process.env.API_HOST_URL ? process.env.API_HOST_URL : "http://localhost:8091"

/**
 * 装配抽奖
 * @param strategyId 策略id
 * @returns 
 */
 export const strategyArmory = (strategyId?: number) => {
    return fetch(`${apiHostUrl}/api/v1/raffle/strategy_armory?strategyId=${strategyId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

/**
 * 查询抽奖奖品列表
 * @param strategyId 策略id
 * @returns 奖品列表
 */
export const queryRaffleAwardList = (strategyId: number) => {
    try{
        return fetch(`${apiHostUrl}/api/v1/raffle/query_raffle_award_list`,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'strategyId': strategyId
            })
        })
    }catch(error){
        return fetch("{\"code\":\"0001\", \"info\":\"请求失败\", \"data\":[]}")
    }
}

/**
 * 随机抽奖
 * @param strategyId 策略id
 * @returns 抽奖结果
 */
export const randomRaffle = (strategyId: Number) => {
    try{
        return fetch(`${apiHostUrl}/api/v1/raffle/random_raffle`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'strategyId': strategyId
            })
        })
    }catch(error){
        return fetch("{\"code\":\"0001\", \"info\":\"请求失败\", \"data\":\"\"}")
    }
}



