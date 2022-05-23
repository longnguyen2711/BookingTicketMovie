import React from 'react'
import './Products.scss'
import { LINK_BACKGROUND_HOMEPAGE } from "../../util/settings/config";

export default function Propducts(props) {
  const productTitle = "Bấm để mở trang trên cửa số mới"
  return (
    <div id="products" className='pt-36 pb-8' style={{backgroundImage: `url(${LINK_BACKGROUND_HOMEPAGE})`}}>
      <ul className='flex flex-wrap justify-around items-center'> 
         <li><div><a target="_blank" rel="noreferrer" title={productTitle} href="http://nhl-honda.surge.sh">HONDA</a></div></li>
         <li><div><a target="_blank" rel="noreferrer" title={productTitle} href="http://nhl-myportfolio.surge.sh">MY PORTFOLIO</a></div></li>
         <li><div><a target="_blank" rel="noreferrer" title={productTitle} href="http://nhl-samar.surge.sh">SAMAR</a></div></li>
         <li><div><a target="_blank" rel="noreferrer" title={productTitle} href="http://nhl-meipaly.surge.sh">MEIPALY</a></div></li>
         <li><div><a target="_blank" rel="noreferrer" title={productTitle} href="http://nhl-newshop.surge.sh">NEW SHOP</a></div></li>
         <li><div><a target="_blank" rel="noreferrer" title={productTitle} href="http://nhl-travel.surge.sh">TRAVEL</a></div></li>
         <li><div><a target="_blank" rel="noreferrer" title={productTitle} href="http://nlh-stalwart.surge.sh">STALWART</a></div></li>
         <li><div><a target="_blank" rel="noreferrer" title={productTitle} href="http://nhl-mastery.surge.sh">MASTERY</a></div></li>
         <li><div><a target="_blank" rel="noreferrer" title={productTitle} href="http://nhl-camping.surge.sh">CAMPING</a></div></li>
         <li><div><a target="_blank" rel="noreferrer" title={productTitle} href="http://nhl-react-chooseticket.surge.sh">CHOOSE TICKET</a></div></li>
         <li><div><a target="_blank" rel="noreferrer" title={productTitle} href="http://nhl-react-chooseglasses.surge.sh">CHOOSE GLASSES</a></div></li>
         <li><div><a target="_blank" rel="noreferrer" title={productTitle} href="https://nhl-javascript.surge.sh/">JAVASCRIPT</a></div></li>
      </ul>      
    </div>
  )
}

