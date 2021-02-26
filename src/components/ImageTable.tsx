import React, { FC, useEffect, useState } from "react"
import {ImageList} from "./index"

type ImageTableProps = {
  images: Items
}

type Items = {
  url: string[]
  height: number[]
  source: string[]
  max_id: string
}

type RaneItems = {
  url: string
  source: string
}

// レーンの数だけRaneItemを生成
const createRaneItems = (rane_num: number, items: Items): RaneItems[][] => {
  // [][]は、配列が入った配列
  // ３つ配列を生成して、fillで[]の形に初期化
  const RaneItems: RaneItems[][] = Array(rane_num).fill([]).map(_i=>([]))
  // 配列の中身を０に初期化したもの
  const RaneHeights: number[] = Array(rane_num).fill(0);
  // 一個一個の画像をitemに入れる
  items.url.forEach((item: string, index: number) => {
    const minHeightIndex = searchMinHeightIndex(RaneHeights);
    RaneHeights[minHeightIndex] += items.height[index];
    RaneItems[minHeightIndex].push({ url: item, source: items.source[index] });
    
  });
  return RaneItems;
}

const searchMinHeightIndex = (RaneHeights: number[]) => {
  let minIndex = 0
  let minHeight = 100000
  RaneHeights.forEach((RaneHeight, index) => {
    if (minHeight > RaneHeight) {
      minIndex = index
      minHeight = RaneHeight
    }
  })
  return minIndex
}

const ImageTable = (props: ImageTableProps) => {
  const [raneNum, setRaneNum] = useState(
    window.innerWidth > 600 ? Math.floor(window.innerWidth / 300) : 2
  )

  useEffect(() => {
    let queue: NodeJS.Timeout
    // 0.5秒間、画面サイズが変更されなかったら画面更新
    window.addEventListener("resize", () => {
      clearTimeout(queue)
      queue = setTimeout(() => {
        const raneNum = window.innerWidth > 600 ? Math.floor(window.innerWidth / 300) : 2
        setRaneNum(raneNum)
      }, 500)
    })
  },[])


  return (
     <div className="flex m-1">
       {createRaneItems(raneNum, props.images).map((items: RaneItems[], index) => (
         <div key={index}>
           <ImageList raneItems={items}/>
         </div>
         )
       )}
     </div>
   )
}


export default ImageTable