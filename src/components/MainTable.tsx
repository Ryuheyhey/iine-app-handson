import axios from "axios"
import React, { FC, useEffect, useState } from "react"
import {InputForm, ImageTable} from "./index"

type typeImages = {
  url: string[];
  height: string[];
  source: string[];
  max_id: string;
}


const twitterAPI = (screen_name: string, max_id: string) => {
  let endpoint = `${process.env.REACT_APP_API_ENDPOINT_URL}/fav?name=${screen_name}&maxid=${max_id}`
  return new Promise((resolve, reject) => {
    axios.get(endpoint)
      .then((res) => {
        resolve(res.data);
        console.log(endpoint)
        console.log(res.data)
      })
      .catch((err) => {
        reject(err);
      });
    })
}

const MainTable: FC = () => {
  const [message, setMessage] = useState("")
  const [images, setImages] = useState({
    url: [],
    height: [],
    source: [],
    max_id: "",
  })
  const [screenName, setScreenName] = useState("")


  const handleSubmit = (screen_name: string) => {
    
    // スクリーンネームが更新されたらImagesを初期化する
    if(screen_name !== screenName) {
      setMessage("Loading...")
      twitterAPI(screen_name, images.max_id).then((results: any) => {
        setImages({
          url: results.url, 
          height: results.height, 
          source: results.source, 
          max_id: results.max_id
        })
        setMessage("")
        setScreenName(screen_name)
      }).catch(() => {
        setMessage("取得に失敗しました。入力内容を確認してください。")
      })
      // この時点ではリセットされてる
      console.log(images)
    } else {
        setScreenName(screen_name)
        setMessage("Loading...")
  
        getIine(screen_name)
    }

    
  }

  const getIine = (screen_name: string) => {
    twitterAPI(screen_name, images.max_id).then((res: any) => {
      // if(screen_name !== screenName) {
      //   setImages({
      //     url: [], 
      //     height: [], 
      //     source: [], 
      //     max_id: ""
      //   })
      // }
      console.log(res)
      //ここでなぜかimagesが初期化させてない（一旦は初期化されている
      console.log(images)
      setIineImages(res)
    }).catch(() => {
      setMessage("取得に失敗しました。入力内容を確認してください。")
    })
  }
  
  const setIineImages = (results: any) => {
    // 既存のImagesにAPIの結果を追加で結合していく処理
    setImages({
      url: images.url.concat(results.url), 
      height: images.height.concat(results.height), 
      source: images.source.concat(results.source), 
      max_id: String(results.max_id)
    })

      if(results.url.length === 0) {
        setMessage("いいねした画像がありませんでした。")
      }
      setMessage("")
      console.log(images)
    }

    console.log(screenName)


    useEffect(() => {
      let queue: NodeJS.Timeout;
      window.addEventListener("scroll", () => {
      clearTimeout(queue);
      queue = setTimeout(() => {
        const scroll_Y = document.documentElement.scrollTop + window.innerHeight;
        const offsetHeight = document.documentElement.offsetHeight;
        if (
          offsetHeight - scroll_Y <= 1000 &&
          message !== "Loading..." &&
          offsetHeight > 1500
        ) {
          setMessage("Loading...")
          getIine(screenName);
        }
      }, 500);
      })
    },[])
    

  return (
    <div>
      <InputForm onSubmit={(screen_name: string) => handleSubmit(screen_name)} />
      <ImageTable images={images} />
      <div className="box h-64 text-center m-5 p-4 ...">
        {message}
      </div> 
    </div>
  )
}

export default MainTable