"use client"

import React, {useState, useRef} from 'react'
import {LuckyGrid} from '@lucky-canvas/react'

export function LuckyGridPage(){
    // 背景
    const [blocks] = useState([
        {padding: '10px', background: '#869cfa'}
    ])

    const [prizes] = useState([
        {x: 0, y: 0, fonts: [{text: 'A', top: '35%'}]},
        {x: 1, y: 0, fonts: [{text: 'B', top: '35%'}]},
        {x: 2, y: 0, fonts: [{text: 'C', top: '35%'}]},
        {x: 2, y: 1, fonts: [{text: 'D', top: '35%'}]},
        {x: 2, y: 2, fonts: [{text: 'E', top: '35%'}]},
        {x: 1, y: 2, fonts: [{text: 'F', top: '35%'}]},
        {x: 0, y: 2, fonts: [{text: 'G', top: '35%'}]},
        {x: 0, y: 1, fonts: [{text: 'H', top: '35%'}]},
    ])

    const [buttons] = useState([
        {x: 1, y: 1, background: "#7f95d1", fonts: [{text: '开始', top: '35%'}]}
    ])

    const [defaultStyle] = useState([{background: "#b8c5f2"}])

    const myLucky = useRef(null)

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
                    const index = Math.random() * 6 >> 0
                    myLucky.current.stop(index)
                }, 2500)
            }}
            onEnd={
                prize => {
                    alert('恭喜你抽到 ' + prize.fonts[0].text + ' 号奖品！')
                }
            }>
        </LuckyGrid>
    </>
}