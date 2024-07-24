"use client"

import React, {useState, useRef, useEffect} from 'react'
import {LuckyGrid} from '@lucky-canvas/react'
import {queryRaffleAwardList, randomRaffle} from '@/src/apis/index'
import { RaffleAwardVO } from '@/src/types/RaffleAwardVO'

export function LuckyGridPage(){
    const queryParams = new URLSearchParams(window.location.search)
    const strategyId = Number(queryParams.get('strategyId'))
    const [prizes, setPrizes] = useState([{}])
    const myLucky = useRef(null)
    const [defaultStyle] = useState([{background: "#b8c5f2"}])

    // 背景
    const [blocks] = useState([
        {padding: '10px', background: '#869cfa'}
    ])

    const [buttons] = useState([
        {x: 1, y: 1, background: "#7f95d1", fonts: [{text: '开始', top: '35%'}]}
    ])

    const queryRaffleAwardListHandle = async() => {
        const result = await queryRaffleAwardList(strategyId)
        const {code, info, data} = await result.json()
        if(code != "0000"){
            window.alert("获取抽奖奖品列表失败 code:" + code + " info:" + info)
            return;
        }

        // 创建一个新的奖品数组
        const prizes = data.map((award: RaffleAwardVO, index: number) => {
            const px = [0, 1, 2, 2, 2, 1, 0, 0]
            const py = [0, 0, 0, 1, 2, 2, 2, 1]
            return {
                x: px[index],
                y: py[index],
                fonts: [{id: award.awardId, text: award.awardTitle, top: '35%'}]
            }
        })
        // 设置奖品数据
        setPrizes(prizes)
    }

    const randomRaffleHandle = async () => {
        const result = await randomRaffle(strategyId)
        const {code, data, info} = await result.json()
        if(code != "0000"){
            window.alert("抽奖失败 code:" + code + " info:" + info)
            return;
        }

        // 获取抽取的奖品在奖品列表中的索引
        return data.awardIndex ? data.awardIndex : prizes.findIndex(prize => {
            prize.fonts.some(font => font.id = data.awardId)
        }) + 1
    }       

    useEffect(() => {
        queryRaffleAwardListHandle().then(res => {})
    }, [])

    
    return <>
        <LuckyGrid
            ref={myLucky}
            width="300px"
            height="300px"s
            rows="3"
            cols="3"
            prizes={prizes}
            defaultStyle={defaultStyle}
            buttons={buttons}
            onStart={() => {
                myLucky.current.play()
                setTimeout(() => {
                    randomRaffleHandle().then(prizeIndex => {
                        myLucky.current.stop(prizeIndex)
                    })
                }, 2500)
            }}
            onEnd={
                prize => {
                    alert('恭喜你抽到 【' + prize.fonts[0].text + '】奖品id：' + prize.fonts[0].id)
                }
            }>
        </LuckyGrid>
    </>
}