import React, { useEffect, useState, useRef } from "react";
import styleMenu from "./MenuStyles.css";

export type Mega = { 
  first: string;
  firstlevel: Array<{
    second: string;
    href: string;
    secondLevel: Array<{ third: string; href: string }>;
  }>;
};

const MegaMenuMob: StorefrontFunctionComponent = ({ megaMenu }: { megaMenu: Mega }) => {
  const [menu, setMenu] = useState<any>();
  const [selectedFirst, setSelectedFirst] = useState<string | null>(null);
  const [selectedSecond, setSelectedSecond] = useState<string | null>(null);
  const [selectedThird, setSelectedThird] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState<string | null>(null);
  const [currentSubLevel, setCurrentSubLevel] = useState<string | null>(null);

  useEffect(() => {
    setMenu(megaMenu);
  }, [megaMenu]);

  const mySidebar: any = useRef();

  const toggleBar = () => {
    if (mySidebar.current.style.left === "0%") {
      mySidebar.current.style.left = "-70%";
      setCurrentLevel(null);
    } else {
      mySidebar.current.style.left = "0%";
    }
  };

  const goBack = () => {
    if (selectedThird !== null) {
      setSelectedThird(null);
    } else if (selectedSecond !== null) {
      setSelectedSecond(null);
      setCurrentLevel(selectedFirst);
      setCurrentSubLevel(null);
    } else if (selectedFirst !== null) {
      setSelectedFirst(null);
      setCurrentLevel(null);
    } else {
      mySidebar.current.style.left = "-70%";
    }
  };

  const renderHeader = () => {
    if (currentLevel !== null) {
      return (
        <React.Fragment>
        <div className={styleMenu.header}>
          <h4>{currentLevel}</h4>
          <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g data-name="Layer 2"> <g data-name="arrow-ios-forward"> <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0"></rect> <path d="M10 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"></path> </g> </g> </g></svg>
        </div>
        <hr />
        </React.Fragment>
      );
    }
    return null;
  };

  const renderSubHeader = () => {
    if (currentSubLevel !== null) {
      return (
        <React.Fragment>
        <div className={styleMenu.subheader}>
          <h4>{currentSubLevel}</h4>
          <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g data-name="Layer 2"> <g data-name="arrow-ios-forward"> <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0"></rect> <path d="M10 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"></path> </g> </g> </g></svg>
        </div>
        <hr />
        </React.Fragment>
      );
    }
    return null;
  };

  const renderFirstLevel = () => {
    return menu?.map((userFirst: Mega, index: number) => (
      <React.Fragment>
      <div key={index}
        className={`${styleMenu.flex} ${styleMenu.fir}`}>
        <h4
          onClick={() => {
            setSelectedFirst(userFirst.first);
            setSelectedSecond(null);
            setSelectedThird(null);
            setCurrentLevel(userFirst.first);
          }}>
          {userFirst.first}
        </h4>
        <svg className={`${selectedFirst === userFirst.first ? styleMenu.hide : ""}`} fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g data-name="Layer 2"> <g data-name="arrow-ios-forward"> <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0"></rect> <path d="M10 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"></path> </g> </g> </g></svg>
      </div>
      <hr />
      </React.Fragment>
    ));
  };

  const renderSecondLevel = () => {
    if (!selectedFirst) return null;
    const firstLevelItem = menu?.find((item: any) => item.first === selectedFirst);
    if (!firstLevelItem) return null;

    return firstLevelItem.firstlevel?.map((userSecond: any, index: number) => (
      <React.Fragment>
      <div key={index}
        className={`${styleMenu.flex} ${styleMenu.sec}`}>
        <h4
          onClick={() => {
            setSelectedSecond(userSecond.second);
            setSelectedThird(null);
            setCurrentSubLevel(userSecond.second);
          }}>
          <a href={`#${userSecond.second}`}>{userSecond.second}</a>
        </h4>
        <svg className={`${selectedSecond === userSecond.second ? styleMenu.hide : ""}`} fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g data-name="Layer 2"> <g data-name="arrow-ios-forward"> <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0"></rect> <path d="M10 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"></path> </g> </g> </g></svg>
      </div>
      <hr />
      </React.Fragment>
    ));
  };

  const renderThirdLevel = () => {
    if (!selectedSecond) return null;
    const firstLevelItem = menu?.find((item: any) => item.first === selectedFirst);
    if (!firstLevelItem) return null;
    const secondLevelItem = firstLevelItem.firstlevel?.find((item: any) => item.second === selectedSecond);
    if (!secondLevelItem) return null;

    return secondLevelItem.secondLevel?.map((userThird: any, index: number) => (
      <React.Fragment>
      <div key={index} className={styleMenu.thr}>
        <a href={userThird.href}>{userThird.third}</a>
      </div>
      <hr />
      </React.Fragment>
    ));
  };

  return (
    <div className={styleMenu.mob}>
      <div className={styleMenu.menubtn} onClick={toggleBar}>
        &#9776;
      </div>

      {/* mobile layout */}
      <div className={styleMenu.sidebar} ref={mySidebar}>
        <div className={styleMenu.back} onClick={goBack}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c-12.5-12.5-12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
          <p>Go Back</p>
        </div>

        <br />

        <div className={styleMenu.closebtn} onClick={toggleBar}>
          &times;
        </div>

        {renderHeader()}
        {renderSubHeader()}
        {selectedFirst === null && renderFirstLevel()}
        {selectedFirst !== null && selectedSecond === null && renderSecondLevel()}
        {selectedSecond !== null && renderThirdLevel()}
      </div>
    </div>
  );
};

MegaMenuMob.schema = {
  title: "MegaMenu mobile",
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
                  title: "second Menu link",
                  type: "string",
                  default: "#",
                },

                secondLevel: {
                  type: "array",
                  items: {
                    properties: {
                      third: {
                        title: "third Menu Display Name",
                        type: "string",
                      },
                      href: {
                        title: "third Menu link",
                        type: "string",
                        default: "#",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default MegaMenuMob;
