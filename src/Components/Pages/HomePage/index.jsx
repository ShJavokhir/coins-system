import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AdminProvider from "../../../Data/AdminProvider";
import DashboardLayout from "../../Layout";
import { HomePageWrapper } from "./HomePage.style";

const HomePage = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const data = token && (jwtDecode(token) || null);
    if (data && data.roles) {
      switch (data.roles) {
        case "ROLE_ADMIN": {
          router.replace("/dashboard/admin/groups");
          break;
        }
        case "ROLE_TEACHER": {
          router.replace("/dashboard/teacher/statistika");
          break;
        }
        case "ROLE_DIRECTOR": {
          router.replace("/dashboard/director/reytingDirector");
          break;
        }
        case "ROLE_SEO": {
          router.replace("/dashboard/ceo/seoStatistika");
          break;
        }
        case "ROLE_EDUCATION_DEPARTMENT": {
          router.replace("/dashboard/eduStatistika");
          break;
        }
        case "ROLE_SUNDAY_EVENT": {
          router.replace("/dashboard/sunday");
          break;
        }
        case "ROLE_STUDENT": {
          router.replace("/dashboard/reyting");
          break;
        }
        case "ROLE_ADDITION_LESSON": {
          router.replace("/dashboard/addition");
          break;
        }
      }
    }if(!data){
      router.replace("/login");
    }
    
  }, []);
  return (
    <DashboardLayout>
      <HomePageWrapper>
        <h1>Loading...</h1>
      </HomePageWrapper>
    </DashboardLayout>
  );
};

export default HomePage;
