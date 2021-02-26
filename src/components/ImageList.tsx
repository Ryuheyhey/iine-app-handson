import React from "react"

type RaneItems = {
  url: string
  source: string
}
type ImageListProps = {
  raneItems: RaneItems[]
}

const ListItem = (props: RaneItems) => {
  return (
    <a href={props.source} target="_blank" rel="noopener noreferrer">
      <img src={props.url} alt=""/>
    </a>
  )
}

const ImageList = (props: ImageListProps) => {
  

  const listItems = (items: RaneItems[]) => {
    return (
      <div className="flex flex-col">
        {items.map((item:RaneItems, index:number) => {
          return (
            <div key={index}>
              <div className="m-1 max-w-xs">
                <ListItem url={item.url} source={item.source} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div>
      {listItems(props.raneItems)}
    </div>
  )
}

export default ImageList