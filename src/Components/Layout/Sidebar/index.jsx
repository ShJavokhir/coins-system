import { useRouter } from "next/router";
import React from "react";
import { useContextSelector } from "use-context-selector";
import UserContext from "../../../Context/UserContext";
import MyLink from "../../Common/MyLink";
import UsersSvg from "../../Common/Svgs/UserSvg";
import { SidebarWrapper } from "./Sidebar.style";

const NavListMenu = [
  //admin role
  {
    title: "Guruhlar",
    path: "/dashboard/groups",
    src: "/icons/users.png",
    role: ["ROLE_ADMIN"],
  },
  {
    title: "Talabalar",
    path: "/dashboard/students",
    src: "/icons/student.png",
    role: ["ROLE_ADMIN"],
  },
  {
    title: "Guruhga o'tkazish",
    path: "/dashboard/transfer",
    src: "/icons/transfer.png",
    role: ["ROLE_ADMIN"],
  },
 
  //teacher role
  {
    title: "Guruhlar",
    path: "/dashboard/teacher/groups",
    src: "/icons/lesson.png",
    role: ["ROLE_TEACHER"],
  },
  {
    title: "Darslar",
    path: "/dashboard/lessons",
    src: "/icons/lesson.png",
    role: ["ROLE_TEACHER"],
  },
  {
    title: "Imtihonlar",
    path: "/dashboard/exams",
    src: "/icons/test.png",
    role: ["ROLE_TEACHER"],
  },
  //director role
  {
    title: "Statistika",
    path: "/dashboard/reytingDirector",
    src: "/icons/trend.png",
    role: ["ROLE_DIRECTOR"],
  },
  {
    title: "Xodimlar",
    path: "/dashboard/teachers",
    src: "/icons/teacher.png",
    role: ["ROLE_DIRECTOR"],
  },
  {
    title: "Kurslar",
    path: "/dashboard/courses",
    src: "/icons/lesson.png",
    role: ["ROLE_DIRECTOR"],
  },
  {
    title: "Shop",
    path: "/dashboard/products",
    src: "/icons/shopping.png",
    role: ["ROLE_DIRECTOR"],
  },
  //seo role
  {
    title: "Statistika",
    path: "/dashboard/seoStatistika",
    src: "/icons/trend.png",
    role: ["ROLE_SEO"],
  },
  {
    title: "Direktor yaratish",
    path: "/dashboard/directors",
    src: "/icons/director.png",
    role: ["ROLE_SEO"],
  },
  {
    title: "Shop",
    path: "/dashboard/product",
    src: "/icons/shopping.png",
    role: ["ROLE_SEO"],
  },
  {
    title: "Ball berish",
    path: "/dashboard/addBall",
    src: "/icons/ball.png",
    role: ["ROLE_SEO"],
  },
  //education role
  {
    title: "Statistika",
    path: "/dashboard/eduStatistika",
    src: "/icons/test.png",
    role: ["ROLE_EDUCATION_DEPARTMENT"],
  },
  {
    title: "Imtihon yaratish",
    path: "/dashboard/education/groups",
    src: "/icons/test.png",
    role: ["ROLE_EDUCATION_DEPARTMENT"],
  },
  {
    title: "Imtihon jadvali",
    path: "/dashboard/education/exams",
    src: "/icons/test.png",
    role: ["ROLE_EDUCATION_DEPARTMENT"],
  },
  //student role
  {
    title: "Reyting",
    path: "/dashboard/reyting",
    src: "/icons/trend.png",
    role: ["ROLE_STUDENT"],
  },
  {
    title: "Shop",
    path: "/dashboard/shopping",
    src: "/icons/shopping.png",
    role: ["ROLE_STUDENT"],
  },
  {
    title: "Buyurtmalar",
    path: "/dashboard/orders",
    src: "/icons/gift.png",
    role: ["ROLE_STUDENT"],
  },
  {
    title: "Ball almashtirish",
    path: "/dashboard/transaction",
    src: "/icons/transaction.png",
    role: ["ROLE_STUDENT"],
  },

  //addition

  {
    title: "Dars yaratish",
    path: "/dashboard/addition",
    src: "/icons/lesson.png",
    role: ["ROLE_ADDITION_LESSON"],
  },
  {
    title: "Dars haqida",
    path: "/dashboard/additionLessons",
    src: "/icons/lesson.png",
    role: ["ROLE_ADDITION_LESSON"],
  },

  //sunday
  {
    title: "Dars yaratish",
    path: "/dashboard/sunday",
    src: "/icons/lesson.png",
    role: ["ROLE_SUNDAY_EVENT"],
  },
  {
    title: "Dars haqida",
    path: "/dashboard/sundayLessons",
    src: "/icons/lesson.png",
    role: ["ROLE_SUNDAY_EVENT"],
  }
 
  
];

const Sidebar = () => {
  const router = useRouter();
  const pathname=router.pathname


  const userRole = useContextSelector(UserContext, ctx => ctx.state.user.roles);
  console.log(userRole);

  const UmumiyListMenu = NavListMenu.filter(({role}) => role.includes(userRole));

  return (
    <SidebarWrapper>
      <MyLink to={`${pathname}`} className="logo">
        <img src="/images/logo1.png" alt="" />
      </MyLink>
      <div className="sidebar-menu">
        {UmumiyListMenu.map(({ title, src, path }, idx) => {
          return (
            <MyLink
              className={router.pathname === path ? "activelink" : "link"}
              to={path}
              key={idx}
            >
              <img src={src} alt="" />
              {title}
            </MyLink>
          );
        })}
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
