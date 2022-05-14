import React from 'react'
import './Products.css'

export default function Propducts(props) {
  return (
    <div className='products mt-10 mb-10 bg-black py-10'>
      <ul className='flex flex-wrap justify-around items-center'> 
         <li><a target="_blank" title="Bấm để mở trang trên cửa số mới" href="http://nhl-honda.surge.sh">HONDA</a></li>
         <li><a target="_blank" title="Bấm để mở trang trên cửa số mới" href="http://nhl-myportfolio.surge.sh">MY PORTFOLIO</a></li>
         <li><a target="_blank" title="Bấm để mở trang trên cửa số mới" href="http://nhl-meipaly.surge.sh">MEIPALY</a></li>
         <li><a target="_blank" title="Bấm để mở trang trên cửa số mới" href="http://nhl-newshop.surge.sh">NEW SHOP</a></li>
         <li><a target="_blank" title="Bấm để mở trang trên cửa số mới" href="http://nhl-travel.surge.sh">TRAVEL</a></li>
         <li><a target="_blank" title="Bấm để mở trang trên cửa số mới" href="http://nlh-stalwart.surge.sh">STALWART</a></li>
         <li><a target="_blank" title="Bấm để mở trang trên cửa số mới" href="http://nhl-mastery.surge.sh">MASTERY</a></li>
         <li><a target="_blank" title="Bấm để mở trang trên cửa số mới" href="http://nhl-camping.surge.sh">CAMPING</a></li>
      </ul>      
    </div>
  )
}
