import React from 'react'
import './Products.css'

export default function Propducts(props) {
  return (
    <div className='products mt-24 mb-10 bg-black py-10'>
      <ul className='flex flex-wrap justify-around items-center'> 
         <li><div><a target="_blank" title="Bấm để mở trang trên cửa số mới" href="http://nhl-honda.surge.sh">HONDA</a></div></li>
         <li><div><a target="_blank" title="Bấm để mở trang trên cửa số mới" href="http://nhl-myportfolio.surge.sh">MY PORTFOLIO</a></div></li>
         <li><div><a target="_blank" title="Bấm để mở trang trên cửa số mới" href="http://nhl-meipaly.surge.sh">MEIPALY</a></div></li>
         <li><div><a target="_blank" title="Bấm để mở trang trên cửa số mới" href="http://nhl-newshop.surge.sh">NEW SHOP</a></div></li>
         <li><div><a target="_blank" title="Bấm để mở trang trên cửa số mới" href="http://nhl-travel.surge.sh">TRAVEL</a></div></li>
         <li><div><a target="_blank" title="Bấm để mở trang trên cửa số mới" href="http://nlh-stalwart.surge.sh">STALWART</a></div></li>
         <li><div><a target="_blank" title="Bấm để mở trang trên cửa số mới" href="http://nhl-mastery.surge.sh">MASTERY</a></div></li>
         <li><div><a target="_blank" title="Bấm để mở trang trên cửa số mới" href="http://nhl-camping.surge.sh">CAMPING</a></div></li>
      </ul>      
    </div>
  )
}
