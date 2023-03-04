import React, { useEffect, useState } from "react";
import { DashboardHeaderWrapper } from "./DashboardHeader.style";
import Container from "../../Common/Container";
import { useContextSelector } from "use-context-selector";
import UserContext from "../../../Context/UserContext";
import { useRouter } from "next/router";
import AdminProvider from "../../../Data/AdminProvider";
import LogOutSvg from "../../Common/Svgs/LogOutSvg";

export const LINKS = [
  {
    name: "Menu",
    path: "/dashboard/homeDashboard",
    id: 1,
  },
  {
    name: "Menu",
    path: "/dashboard/dash",
    id: 2,
  },
  {
    name: "Menu",
    path: "/",
    id: 3,
  },
  {
    name: "Menu",
    path: "/",
    id: 4,
  },
  {
    name: "Menus",
    path: "/",
    dropMenu: [
      {
        title: "Item 1",
        path: "/",
        id: 2.1,
      },
      {
        title: "Item 2",
        path: "/",
        id: 2.2,
      },
      {
        title: "Item 3",
        path: "/",
        id: 2.3,
      },
    ],
    id: 2,
  },
];

const DashboardHeader = ({ RefObj, setIsOpen }) => {
  const logoutContext = useContextSelector(
    UserContext,
    (ctx) => ctx.actions.logout
  );
  const router = useRouter();

  const [name, setName] = useState([]);

  useEffect(() => {
    AdminProvider.getMe()
      .then((res) => {
        setName(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    RefObj.current.textContent = `Haqiqatan ham tizimdan chiqmoqchimisiz?`;
    setIsOpen(true);
    new Promise((res, rej) => {
      RefObj.current.resolve = res;
      RefObj.current.reject = rej;
    })
      .then(() => {
        logoutContext();
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <DashboardHeaderWrapper>
      <div className="top">
          <div className="wrap">
            <div className="left">English House</div>
            <div className="right">
              <h3>{name.firstName} {name.lastName}</h3>
              <button onClick={handleLogout}>Chiqish <LogOutSvg/></button>
            </div>
          </div>
      </div>
      {/* <div className="content">
            <ul className="links_cont">
            {LINKS.map(({ name, path, id, dropMenu }) => (
              <li key={id}>
                <MyLink to={path}>
                  <div className="navs">
                   
                    <p>{name}</p>
                  </div>
                </MyLink>
                {dropMenu && (
                  <div className="dropdown">
                    <ul className="dropdown__list">
                      {dropMenu.map((drop, idx) => (
                        <li key={idx} className="dropdown__item">
                          <MyLink to={drop.path} className="dropdown__link">
                            <span>{drop.title}</span>
                          </MyLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
            </div> */}
    </DashboardHeaderWrapper>
  );
};

export default DashboardHeader;
