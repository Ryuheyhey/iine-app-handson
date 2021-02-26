import React, { useCallback, useState } from "react"

type typeInputFormState = {
  screen_name: string
}

type typeInputFormProps = {
  onSubmit: any
}

const InputForm = (props: typeInputFormProps) => {
  const [screen_name, setScreenName] = useState("")

  const handleChange = useCallback((e: {target: {value: string}}) => {
    setScreenName(e.target.value)
  },[setScreenName])

  const handleSubmit = useCallback((e:any) => {
    props.onSubmit(screen_name)
    e.preventDefault()
  },[screen_name])

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-5 mx-5">
            <p className="md-5">
              twitterのスクリーンネームを入力してください（例：@hukurouo）
              <br />
              <br />
              その人がいいねした画像が良い感じに表示されます。
            </p>
          </div>
          <div className="flex mb-5 mx-auto max-w-xs">
            <div className="mt-1 relative rounded-md shadow-sm mx-5 w-11/12">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">@</span>
              </div>
              <input
                type="text"
                autoCapitalize="off"
                name="screen_name"
                value={screen_name}
                onChange={handleChange}
                className="bg-white focus:outline-none focus:shadow-outline py-2 px-8 rounded-md w-full"
              />
            </div>
          </div>
          <div className="flex justify-center mb-5 mx-5">
            <input
              type="submit"
              value="取得"
              disabled={screen_name === ""}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mx-2 rounded w-20 mb-10"
            />
          </div>
        </form>
      </div>

  )
}

export default InputForm