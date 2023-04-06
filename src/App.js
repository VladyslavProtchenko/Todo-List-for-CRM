import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import Select from "./UI/Select";

import { brandsLogos } from "./DB";
import { data } from "./DB";


function App() {
  const [onFocus, setOnfocus] = useState(false)
  const [isAnybody, setIsAnybody] = useState(false)
  const [brands, setBrands] = useState(brandsLogos)
  const [items, setItems] = useState(data)


  useEffect(()=>{
    setIsAnybody(false)
    items.map((item) => {if(item.isChosen) return setIsAnybody(true)})
  },[items])

  function deleteItem(id){
    setItems(items.filter(item=>item.id !==id))
  }

  function setItemStatus(id, status){
      setItems(items.map(item=> {
        if(item.id === id) item.status = status
        return item
      }));
  }

  function clearAll(){
    setItems(items.filter(item=> !item.isChosen));
  }
  
  function chooseItem(id){
    
    setItems(items.map(item=> {

      if(item.id === id) {
        item.isChosen?item.isChosen = false:item.isChosen = true;
      }
      return item
    }));
  }

  function addNewItem(){
    const newItem = {
              id:'',
              type:'xxxx-',
              status: false,
              isChosen: false,
              name:'',
            }
    setItems([
      newItem,
      ...items
    ])
  }

  return (
    <div className={box} >
      <div className={container}  onMouseEnter={()=>setOnfocus(true)}  onMouseLeave={()=>setOnfocus(false)}>

        <nav className={navigation}>
            <Select data={items} styles='w-[60px]' label='Статус' type={'status'} onFocus={onFocus}/>
            <Select styles='w-[60px]' label='Товар'  data={items} type={'type'} onFocus={onFocus}/>
            <Select styles='w-[40px]' label='ID'  data={items} type={'id'} onFocus={onFocus}/>
            <Select styles='w-[120px]' label='Название'  data={items} type={'name'} onFocus={onFocus}/>

            <div className='flex flex-col w-[24px] justify-between'>
              <button className={addBtn} onClick={()=>addNewItem()}><span className="material-symbols-outlined text-base">add</span></button>
              {isAnybody && <button className={addBtn} onClick={()=>clearAll()}><span className="material-symbols-outlined  text-base">close</span></button>}
            </div>
        </nav>


        <ul className={list}>
            {items.map((item,index)=>(
              <ListItem  
                key={item.id} 
                data={item} 
                id={item.id}
                brands={brands}
                setBrands={setBrands}
                onFocus={onFocus}
                remove={deleteItem}
                setItemStatus={setItemStatus} 
                chooseItem={chooseItem}
              />
            ))}
        </ul>
        
      </div> 
    </div>
  );
}

export default App;

const addBtn = 'font-bold text-zinc-400 border rounded flex items-center justify-center w-5 h-5 hover:border-zinc-600  hover:text-zinc-600'
const list = 'flex flex-col -ml-3 '

const box = 'flex flex-col w-screen h-screen items-center justify-center text-sm'
const container = 'flex flex-col items-center '
const navigation = 'flex p-4  gap-3 '