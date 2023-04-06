import React, { useState } from 'react'



export default function Select({styles,data,type,label, onFocus}) {
    const [isOpen, setIsOpen] =useState(false)
    const [value,setValue] =useState('')

    const [itemStatus, setItemStatus] = useState(false)

    const [searchingItems, setSearchingItems] = useState([])


    function addSearchItem(item){
        if(searchingItems.find(i=>{return i === item})) return;
        setSearchingItems([
            ...searchingItems,
            item
        ])
    }
    function removeSearchItem(item){
        console.log(item);
        setSearchingItems(
            searchingItems.filter(i=> i!=item)
        )
    }


    
    return (
    <div className={`${select} ${styles} group`}>
        <h1>{label}</h1>
        <div className='flex items-center py-1'>
            <div className='flex w-full'>
                {!isOpen && searchingItems.map((item,index)=>(
                    <span key={index} className={searchItem}>
                        {item} 
                        <div className={removeSearch} onClick={()=>removeSearchItem(item)}>x</div>
                    </span>
                ))}
            </div>

            <input className={input} type="text" onChange={e=>setValue(e.target.value)} value={value} />

            <div className={`${arrow} ${isOpen?'rotate-[135deg] mt-2':' -rotate-45'} group-hover:rotate-[135deg] group-hover:mt-2 ${onFocus?'':'opacity-0'}`} onClick={()=>setIsOpen(!isOpen)}></div>
            
            <ul className={`${submenu} list-disc  group-hover:top-[100%]  group-hover:mt-1  group-hover:z-10  group-hover:opacity-100`}>
                <li className={`${defaultItem} ${listElement}`}>все</li>
                {data.filter(item => {
                    if(type && type === 'status'){
                        return item[type] === itemStatus;
                        }
                    return JSON.stringify(item[type]).includes(value)
                }).map((item,index)=>(
                <li key={index} className={`${listElement}`} onClick={()=>addSearchItem(item[type])}>{item[type]}</li>

                ))}    
            </ul> 
        </div>

    </div>
  )
}

const removeSearch = 'cursor-pointer text-black -mt-[2px] pl-1'
const searchItem = 'text-[8px] w-min whitespace-nowrap  flex h-min px-1 rounded mr-[2px] justify-between shadow'
const defaultItem = ''
const listElement = 'h-4 hover:opacity-50 cursor-pointer pl-0 ml-4'

const select = 'border-b-2 border-black flex flex-col text-center relative'  
const input = 'outline-none flex w-full px-1 text-xs text-[8px]'  
const arrow = 'cursor-pointer border-[3px] mx-1 transform border-l-black border-b-black border-r-transparent border-t-transparent h-0 w-0'
const submenu = ' transition-all pb-1 h-0 -z-10 top-[100%] opacity-0 absolute bg-white text-left shadow left-0 right-0  min-w-full h-24 text-[8px] px-1 py-1 overflow-y-scroll'
