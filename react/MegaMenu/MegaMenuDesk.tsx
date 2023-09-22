import React, { useEffect, useState } from "react";
import styleMenu from "./MenuStyles.css"

export type Mega = {
  first: string;
  firstlevel: Array<{ second: string, href: string,
  secondLevel: Array<{ third: string, href: string}>}>; 
};

const MegaMenuDesk: StorefrontFunctionComponent = ({ megaMenu }: { megaMenu: Mega }) => {
  const [menu, setMenu] = useState<any>() 
  const [selectedFirst, setSelectedFirst] = useState<string | null>(null);
  const [selectedSecond, setSelectedSecond] = useState<string | null>(null);

  useEffect(() => {
    setMenu(megaMenu)
  }, [megaMenu])

  return (
    <div className={styleMenu.nav} onMouseLeave={() => setSelectedFirst(null)}>

      {/* first-level */}
      <div className={styleMenu.first}>
        <div className={styleMenu.subFirst}>
          {menu?.map((userFirst: Mega, index: number) => (
            <div key={index}
              className={`${styleMenu.sub_first} ${selectedFirst === userFirst.first ? styleMenu.selecting : ''}`}
              onMouseEnter={() => {
                  setSelectedFirst(userFirst.first)
              }}>
              <h4>{userFirst.first}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* second-level */}
      <div className={styleMenu.second}>
        <div className={styleMenu.subSecond}>
          {menu?.map((userFirst: Mega, index: number) => ( 
            <React.Fragment key={index}>
              {selectedFirst === userFirst.first &&
                userFirst.firstlevel?.map((userSecond, index: number) => (
                  <div key={index}
                    className={`${styleMenu.sub_second} ${selectedSecond === userSecond.second ? styleMenu.selected : ''}`}
                    onMouseEnter={() => setSelectedSecond(userSecond.second)}>
                    <h4><a href={`#${userSecond.second}`}>{userSecond.second}</a></h4>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                  </div>
                ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* third-level */}
      <div className={styleMenu.third}>
        <div className={styleMenu.subThird}>
          {menu?.map((userFirst: Mega, index: number) => (
            <React.Fragment key={index}>
              {selectedFirst === userFirst.first &&
                userFirst.firstlevel?.map((userSecond, secondIndex: number) => (
                  <React.Fragment key={secondIndex}>
                    {selectedSecond === userSecond.second &&
                      userSecond.secondLevel?.map((userThird, thirdIndex: number) => (
                        <div className={styleMenu.sub_third} key={thirdIndex}>
                          <a href={`#${userThird.third}`}>{userThird.third}</a>
                        </div>
                      ))}
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}
        </div>
      </div>

    </div> 
  )
}


MegaMenuDesk.schema = {
  title: "MegaMenu desktop",
  description: "Megamenu Component",
  type: "object",

  properties: {
    megaMenu: {
      type: "array",
      items: {

        properties: {

          first: {
            title: "first Menu Display Name",
            type: "string",
          },

          firstlevel: {
            type: "array",
            items: {
              properties: {

                second: {
                  title: "second Menu Display Name",
                  type: "string",
                },
                href: {
                  title: " second Menu link",
                  type: "string",
                  default: "#"
                },
                
                secondLevel: {
                    type: "array",
                    items: {
                        properties: {

                            third: {
                                title: "third Menu Display Name",
                                type: "string"
                            },
                            href: {
                                title: " third Menu link",
                                type: "string",
                                default: "#"
                            }
                        }
                    }
                }

              }
            }
          },
        },
      },
    },
  }
}

export default MegaMenuDesk