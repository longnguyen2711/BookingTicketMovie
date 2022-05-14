import React from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import "./Footer.css";

export default function Footer(props) {
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);

  // Tạo ra mảng ít phức tạp hơn, chỉ chứa những thông tin cần thiết bằng lodash
  const arrHeThongRap = _.map(heThongRapChieu, (heThongRap) =>
    _.pick(heThongRap, ["maHeThongRap", "tenHeThongRap", "logo"])
  );

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

  console.log("arrContact", arrContact);

  return (
    <footer className="py-6 bg-coolGray-100 text-coolGray-900 bg-black">
      <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
        <div className="grid grid-cols-12">
          <div className="pb-6 col-span-full md:pb-0 md:col-span-4">
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
          <div className="footer-partner col-span-6 text-center md:text-left md:col-span-4">
            <p className="pb-1 text-lg font-medium text-white">ĐỐI TÁC</p>
            <div className="flex" style={{ color: "#fff" }}>
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
            </div>
          </div>
          <div className="footer-contact col-span-6 text-center md:text-left md:col-span-4 text-white">
            <p className="pb-1 text-lg font-medium">LIÊN HỆ</p>
            <div>
              <ul className="flex text-white">
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
        <div className="footer__bottom grid justify-center pt-6 lg:justify-between text-white">
          <div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
            <span>©2022 All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
