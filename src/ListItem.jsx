import React, { useEffect, useState } from 'react'


export default function ListItem({data, id, brands, onFocus, setBrands, remove, setItemStatus, chooseItem}) {
    const [enable, setEnable] = useState(true)
    const [readyToDelete, setReadyToDelete] = useState(false)
    const [brandsSubMnu, setBrandsSubMnu] = useState(false)

    const [newId, setNewId] = useState(data.id)
    const [newName, setNewName] = useState(data.name)

    const [activeBrandLabel, setActiveBrandLabel] = useState(brands[0]) // Тут я не то чтобы ленился, просто не успел сменить бредны на разные поэтому остался дефолтный(! 

    useEffect(()=>{
        brands.map(item => { if(item.id === activeBrandLabel.id) item.isActive = true })
        setBrands(brands)
    },[activeBrandLabel])




//Никогда так не красиво код не писал, впервые такое  о_О, завтра будет лучше !)
  return (
    <div className={`${box}  ${readyToDelete &&  !data.isChosen &&'bg-white hover:bg-white'} `} onMouseLeave={()=>setBrandsSubMnu(false)}>
        <div className={`${container} ${readyToDelete && !data.isChosen &&'opacity-30'} ${data.isChosen && 'bg-zinc-500 hover:bg-zinc-500'}` } onClick={()=>chooseItem(id)}>
            <div className={` w-3 group-hover:bg-zinc-600 rounded-l ${data.isChosen && 'bg-zinc-600'} ${readyToDelete && 'bg-white group-hover:bg-transparent'}`}></div>

            <div className={switcher}>
                <div className={` ${enable?switchContainerON:switchContainerOF}`} 
                    onClick={(e)=> {
                        e.stopPropagation()
                        setEnable(!enable)
                        setItemStatus(id,enable)
                    }}>

                    <div className={`${switchButton} ${enable?'':'bg-zinc-600'}`}></div>
                </div>
            </div>
            <div className={ItemType}>{data.type}</div>
            
            <input className={ItemId} 
                value={newId} 
                readOnly={!enable && true}
                placeholder=' id'
                onClick={(e)=>{ if(enable) {e.stopPropagation()}}}
                onChange={(e)=>{
                            if(e.target.value.length>3) return;
                            setNewId(e.target.value.replace(/[^0-9.]/g, ''))
                }}/>

            <div className={ItemName} >

                <div className={BrandLabel} 
                    onClick={(e)=>{
                        e.stopPropagation()
                        setBrandsSubMnu(!brandsSubMnu)
                    }}>

                    <div className={brandsItem} style={{backgroundImage:`url(${activeBrandLabel.link})`}}></div>
                    <div className={`${brandsSubmenu} ${brandsSubMnu?'flex':'hidden'} ${!enable && 'hidden'}`}>
                        {brands.map((item,index)=>(
                            <li 
                                key={index} 
                                className={`${brandsItem} ${item.isActive && 'opacity-30'}`} 
                                onClick={(e)=>{
                                    e.stopPropagation()
                                    if(!item.isActive) setActiveBrandLabel(item)
                                    setBrandsSubMnu(false)
                                }} 
                                style={{backgroundImage:`url(${item.link})`}}
                            ></li>
                        ))}
                    </div> 
                </div>
                
                <input 
                    className={nameInput}
                    value={newName} 
                    readOnly={!enable && true}
                    placeholder=' name'
                    onFocus={()=>setBrandsSubMnu(true)}
                    onClick={(e)=>{ if(enable) {e.stopPropagation()}}} 
                    onChange={(e)=>setNewName(e.target.value)}
                />
            </div>

        </div>    

        <div 
            className={`${ItemRemove} ${data.isChosen && 'bg-white'} ${!onFocus && 'text-white'} group/item`} 
            onClick={()=>remove(id)}
            onMouseEnter={()=>setReadyToDelete(true)}  
            onMouseLeave={()=>setReadyToDelete(false)}
        >
            <span className="material-symbols-outlined  text-base">close</span>
            {readyToDelete && <div className={deleteNote}>You can delete this element, no problem bro, do this</div>}
        </div>
    </div>
  )
}




const brandsSubmenu = 'absolute  flex-wrap w-[100px] bg-white shadow z-20 p-4 top-[100%] space-x-[2px] space-y-[2px]'
const BrandLabel = 'w-1/6 h-full relative flex items-center' 
const brandsItem = 'w-4 h-4 bg-contain bg-center bg-no-repeat '
const nameInput = 'outline-none bg-transparent w-full'

const switchContainerON ='bg-zinc-400 w-[24px] h-[13px] rounded-full flex items-center pl-[13px]'
const switchContainerOF ='bg-zinc-400 w-[24px] h-[13px] rounded-full flex items-center pl-[2px]'
const switchButton = ' bg-white w-[10px] h-[10px] rounded-full' 

const box = 'flex  cursor-pointer  -ml-4'
const container = 'flex group hover:bg-zinc-300   rounded-l'
const switcher = 'w-[60px]  mr-3 ml-3 flex items-center justify-start'
const ItemType = 'w-[60px]  mr-3'
const ItemId = 'w-[40px]  mr-3 outline-none bg-transparent'
const ItemName = 'w-[120px] flex items-center outline-none bg-transparent '
const ItemRemove = 'w-1/12  group-hover:bg-white pl-3 relative z-20'
const deleteNote = 'absolute p-1 text-[10px] shadow w-max top-100 left-[100%] ml-2 opacity-[100%] bg-white'





