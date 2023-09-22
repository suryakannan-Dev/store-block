import React, { useEffect, useState } from "react"
import styleFooter from "./FooterStyle.css"

export type Footer = {
  head: string
  secondLevel: Array<{ subHead: string, href: string }>
}

const CustomFooterDesktop: StorefrontFunctionComponent = ({ footerMenu }: { footerMenu: Footer }) => {
  const [menu, setMenu] = useState<any>()
  const [showList, setShowList] = useState(-1)

  useEffect(() => {
    setMenu(footerMenu)
  }, [footerMenu])

  const handleClick = (index:number) => {
    if (showList === index) {
      setShowList(-1)
    } else {
      setShowList(index)
    }
  }

  return (
    <div className={styleFooter.footer}>
      <div className={styleFooter.c1}>
          {menu?.map((user: Footer, index: number) => (                                                                      
            <div className={styleFooter.bg}>

              <div className={styleFooter.c1r}
                onClick={() => handleClick(index)}>
                <h4 key={index}>{user.head}</h4>
                {showList == index ?
                  <button type="button" className='b--black-0125 bg-transparent'>&#8722;</button> :
                  <button className='b--black-0125 bg-transparent'>&#43;</button>}
              </div>

              {showList == index &&
              <ul>
                {user.secondLevel?.map((item, index) => (
                  <React.Fragment key={index}>
                    <li><a href={item.href}>{item?.subHead}</a></li>
                  </React.Fragment>
                ))} 
              </ul>}

            </div>
          ))} 
      </div>

      <div className={styleFooter.c2}>
        <div className={styleFooter.c2r1}>
          {/* footer-col-2-row-1 */}
          <ul>
              <li>
                <p>Sign up to receive the Project Antelope newsletter</p>
              </li>
              <li>
                <input type="email" placeholder="Enter your email address" />
                <svg className={styleFooter.m} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
              </li>
          </ul>
        </div>
        <div className={styleFooter.c2r2}>
            {/* footer-col-2-row-2 */}
            <ul>
                <li className={styleFooter.mb}>
                    <p>Connect with us</p>
                </li>
                <li>
                    <a href="#" title="instagram"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg></a>
                    <a href="#" title="facbook"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg></a>
                </li>
                <li>
                    <a href="#">Terms of use</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">All rights reserved</a>
                </li>
            </ul>
          </div>
        </div>

    </div>
  )
}


CustomFooterDesktop.schema = {
  title: "Footer Mobile",
  description: "Megamenu Component",
  type: "object",

  properties: {
    footerMenu: {
      type: "array",
      items: {

        properties: {

          head: {
            title: "Menu Display Name",
            type: "string",
          },

          secondLevel: {
            type: "array",
            items: {
              properties: {

                subHead: {
                  title: "Menu Display Name",
                  type: "string",
                },
                href: {
                  type: "string",
                  default: "#",
                  title: "Menu Link",
                }

              }
            }
          },
        },
      },
    },
  }
}

export default CustomFooterDesktop