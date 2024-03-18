import React, { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "../layout/Index";
import Sales from "../pages/Sales";
import Analytics from "../pages/Analytics";
import SongTrack from "../pages/SongsTrack/SongTrack";
import Audition from "../pages/audition/Auditoin";
import Login from "../pages/auth/Login";
import Karaoke from "pages/SongsTrack/Karoke";
import ContactList from "pages/contact/ContactList";
import NewsList from "pages/news/NewsList";
import AddNews from "pages/news/addNews";
import AuditionByUser from "pages/audition/AuditionByUser";
import UserProfileRegularPage from "pages/pre-built/user-manage/UserProfileRegular";
import WelcomDashboard from "pages/WelcomDashboard";
import MassEmailList from "pages/MassEmail/news/MassEmailList";
import SendMassEmail from "pages/MassEmail/news/AddMassEmail";
import CreateUser from "layout/header/dropdown/user/CreateUser";
import AdminList from "pages/Admin/AdminList";
import SendSingleEmail from "pages/MassEmail/news/SingleEmal";
import SingleEmailList from "pages/MassEmail/news/SingleEmailList";
import AddUser from "pages/User/addUser";
import UserListNew from "pages/User/UserListNew";
import ListGarage from "pages/components/Garage/ListGarage";
import Booking_garage_list from "pages/components/BookingGarage/Booking_garage_list";
import FormLayoutsPage from "pages/components/forms/FormLayouts";
import UserList from "pages/User/UserList";
import CarList from "pages/User/CarList";
import AddCars from "pages/User/AddNewsData";
import AddNewsData from "pages/User/AddNewsData";
const Router = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
       <Route path="/" element={<Login />}></Route>
      <Route  element={<Layout />}>
        <Route path={`dashboard`} element={<WelcomDashboard />}></Route>
        <Route path="sales" element={<Sales />}></Route>
        <Route path="analytics" element={<Analytics />}></Route>
        <Route path="user-list" element={<UserListNew />}></Route>
        <Route path="car-list" element={<CarList />}></Route>
        <Route path="add-user" element={<AddUser />}></Route>
        <Route path="add-news" element={<AddNewsData />}></Route>
        <Route path="admin-list" element={<AdminList />}></Route>
        <Route path="user-profile" element={<UserProfileRegularPage />}></Route> 
        <Route path="garage" element={<ListGarage />}></Route>
        <Route path="carListingDetails" element={<FormLayoutsPage />}></Route>
        <Route path="booking_garge_list" element={<Booking_garage_list />}></Route>
        <Route path="songslist" element={<SongTrack />}></Route>
        <Route path="add-karaoke" element={<Karaoke />}></Route>
        <Route path="audition" element={<Audition />}></Route>
        <Route path="audition-list/:userId" element={<AuditionByUser />}></Route>
        <Route path="news-list" element={<NewsList />}></Route>
        <Route path="add-news" element={<AddNews />}></Route>
        <Route path="mass-email" element={<MassEmailList />}></Route>
        <Route path="send-email" element={<SendMassEmail />}></Route>
        <Route path="single-email" element={<SendSingleEmail />}></Route>
        <Route path="single-email-list" element={<SingleEmailList />}></Route>
        <Route path="contact" element={<ContactList />}></Route>
        <Route path="create-user" element={<CreateUser />}></Route>
      </Route>

     
    </Routes>
  );
};
export default Router;
