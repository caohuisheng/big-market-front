import { mock } from "node:test"

const apiHostUrl = process.env.API_HOST_URL ? process.env.API_HOST_URL : "https://mock.apipost.net/mock/2ebf1227a066000"

/**
 * 查询抽奖奖品列表
 * @param strategyId 策略id
 * @returns 奖品列表
 */
export const queryRaffleAwardList = (strategyId: number) => {
    try{
        return fetch(`${apiHostUrl}/api/v1/raffle/query_raffle_award_list?apipost_id=2c1e24f0766003&strategyId=${strategyId}`,{
            method: 'get',
            headers: {
                'Content-Type': 'application/json:charset=utf-8'
            }
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
export const randomRaffle = (strategyId: number) => {
    try{
        return fetch(`${apiHostUrl}/api/v1/raffle/random_raffle?apipost_id=2c1edb0bb66004&strategyId=${strategyId}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json:charset=utf-8'
            }
        })
    }catch(error){
        return fetch("{\"code\":\"0001\", \"info\":\"请求失败\", \"data\":\"\"}")
    }
}