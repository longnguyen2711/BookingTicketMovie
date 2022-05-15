import React from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import "./Footer.css";

export default function Footer(props) {
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);

  // Tạo ra mảng ít phức tạp hơn, chỉ chứa những thông tin cần thiết bằng lodash
  // Reload lại trang sẽ biến mất
  const arrHeThongRap = _.map(heThongRapChieu, (heThongRap) =>
    _.pick(heThongRap, ["maHeThongRap", "tenHeThongRap", "logo"])
  );
  
  // Viết tay
  const arrPartner = [
    {
      name: "BHD Star Cineplex",
      logo: "https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png",
      href: "https://www.bhdstar.vn/",
    },
    {
      name: "CGV",
      logo: "https://movienew.cybersoft.edu.vn/hinhanh/cgv.png",
      href: "https://www.cgv.vn/",
    },
    {
      name: "CineStar",
      logo: "https://movienew.cybersoft.edu.vn/hinhanh/cinestar.png",
      href: "https://www.cinestar.com.vn/",
    },
    {
      name: "Galaxy Cinema",
      logo: "https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png",
      href: "https://www.cinestar.com.vn/",
    },
    {
      name: "Lotte Cinema",
      logo: "https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png",
      href: "https://www.lottecinemavn.com/",
    },
    {
      name: "MegaGS",
      logo: "https://movienew.cybersoft.edu.vn/hinhanh/megags.png",
      href: "https://www.megagscinemas.vn/",
    },
  ]

  // Viết tay
  const arrContact = [
    {
      title: "Facebook",
      href: "https://www.facebook.com/",
      class: "fab fa-facebook-f",
      color: "#0674e8", 
    },
    {
      title: "Youtube",
      href: "https://www.youtube.com/",
      class: "fab fa-youtube",
      color: "#f00",
    },
    {
      title: "Instagram",
      href: "https://www.instagram.com/",
      class: "fab fa-instagram",
      color: `background: -webkit-linear-gradient(#e9c461, #691dbb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent`,
    },
    {
      title: "Twitter",
      href: "https://www.twitter.com/",
      class: "fab fa-twitter ",
      color: "#0c72b7",
    },
    {
      title: "Linkedin",
      href: "https://www.linkedin.com/",
      class: "fab fa-linkedin-in",
      color: "#5ab0f7",
    },

  ];

  return (
    <footer className="pt-6 mt-0 bg-coolGray-100 text-coolGray-900 bg-black" id="footer">
      <div className="space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
        <div className="container px-6 mx-auto grid grid-cols-12">
          <div className="pb-6 md:pb-0 col-span-full lg:col-span-3 lg:col-start-2 md:mb-10 lg-mb-0">
            <a
              href="https://cybersoft.edu.vn/"
              className="flex justify-center space-x-3 md:justify-start text-black"
              title="CYBERLEARN"
              target="_blank"
            >
              <img
                src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
                alt="cyberlearn.vn"
                className="rounded-full"
              />
            </a>
          </div>
          <div className="footer-partner col-span-full text-center md:text-left md:col-span-7 lg:col-span-4 md:mt-0">
            <p className="pb-1 text-lg font-medium text-white">ĐỐI TÁC</p>
            {/* <div className="flex justify-center md:justify-start" style={{ color: "#fff" }}>
              {arrHeThongRap.map((heThongRap, index) => {
                return (
                  <a
                    key={index}
                    href="#"
                    className="mr-5"
                    title={heThongRap.tenHeThongRap}
                  >
                    <img
                      src={heThongRap.logo}
                      style={{ width: 35 }}
                      className="hover:scale-150 ease-in duration-300"
                    />
                  </a>
                );
              })}
            </div> */}
            <div className="flex justify-center md:justify-start" style={{ color: "#fff" }}>
              {arrPartner.map((partner, index) => {
                return (
                  <a
                    key={index}
                    href={partner.href}                   
                    title={partner.name}
                    target="_blank"
                    className="mr-5"
                  >
                    <img
                      src={partner.logo}
                      style={{ width: 35 }}
                      className="hover:scale-150 ease-in duration-300"
                    />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="footer-contact col-span-full text-center mb-5 lg:mb-0 md:text-left md:col-span-5 lg:col-span-4 text-white mt-10 md:mt-0">
            <p className="pb-1 text-lg font-medium">LIÊN HỆ</p>
            <div>
              <ul className="flex text-white justify-center md:justify-start">
                {arrContact.map((contact, index) => {
                  return (
                    <li key={index}>
                      <a
                        target="blank"
                        title={contact.title}
                        href={contact.href}
                      >
                        <i
                          className={contact.class} style={{color:`${contact.color}`}}
                        ></i>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__bottom ">
          <div className="text-sm">
            <p className="mb-0 p-4 text-white flex justify-center">©2022 All rights reserved</p>
          </div>
        </div>
      </div>
    </footer> 
  );
}
