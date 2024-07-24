"use client"

import React, { useState, useRef, useEffect } from 'react'
import { LuckyWheel } from '@lucky-canvas/react'
import { queryRaffleAwardList, randomRaffle } from '@/src/apis/index'
import { RaffleAwardVO } from '@/src/types/RaffleAwardVO'

export function LuckyWheelPage() {
  const queryParams = new URLSearchParams(window.location.search)
  const strategyId = Number(queryParams.get('strategyId'))
  const [prizes, setPrizes] = useState([{}])
  const myLucky = useRef(null)

  const [blocks] = useState([
    { padding: '10px', background: '#869cfa', imgs: [{src: "https://bugstack.cn/images/system/blog-03.png"}] }
  ])

  const [buttons] = useState([
    { radius: '40%', background: '#617df2' },
    { radius: '35%', background: '#afc8ff' },
    {
      radius: '30%', background: '#869cfa',
      pointer: true,
      fonts: [{ text: '开始', top: '-10px' }]
    }
  ])

  // 查询奖品列表
  const queryRaffleAWardListHandle = async () => {
    const result = await queryRaffleAwardList(strategyId)
    const {code, info, data} = await result.json()
    if(code != "0000"){
      window.alert("获取抽奖奖品列表失败 code:" + code + " info:" + info)
      return;
    }

    // 创建一个新的奖品数组
    const prizes = data.map((award: RaffleAwardVO, index: number) => {
      const background = index % 2 === 0 ? '#e9e8f3' : '#b8c5f2'
      return {
        background: background,
        fonts: [{id: award.awardId, text: award.awardTitle, top: '15px'}]
      }
    })

    // 设置奖品数据
    setPrizes(prizes)
  }

  const randomRaffleHandle = async () => {
    const result = await randomRaffle(strategyId)
    const {code, info, data} = await result.json()
    if(code != "0000"){
      window.alert("获取抽奖奖品列表失败 code:" + code + " info:" + info)
      return;
    }
    // 为方便测试，mock接口直接返回 awardIndex
    return data.awardIndex ? data.awardIndex : prizes.findIndex(prize => 
      prize.fonts.some(font => font.id === data.awardId)
    ) + 1
  }

  useEffect(() => {
    queryRaffleAWardListHandle().then(r => {})
  }, [])

  
  return <>
    <LuckyWheel
      ref={myLucky}
      width="300px"
      height="300px"
      blocks={blocks}
      prizes={prizes}
      buttons={buttons}
      onStart={() => { // 点击抽奖按钮会触发star回调
        myLucky.current.play()
        setTimeout(() => {
          randomRaffleHandle().then(prizeIndex => {
            myLucky.current.stop(prizeIndex)
          })
        }, 2500)
      }}
      onEnd={
        prize => { // 抽奖结束会触发end回调
          alert('恭喜你抽到【' + prize.fonts[0].text + '】 奖品id：' + prize.fonts[0].id)
        }
      }>
    </LuckyWheel>
  </>
}