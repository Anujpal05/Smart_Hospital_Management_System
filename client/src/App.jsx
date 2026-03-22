import React from 'react';
import Home from './Pages/Home'
import Navbar from './Components/Home/Navbar';
import About from './Pages/About';
import Footer from './Components/Home/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './Components/Auth/AuthPage';
import Dashboard from './Dashboard/Doctors/Doctors';
import Videocall from './Components/DashBoard/Doctors/Videocall';
import Services from "./Pages/Services";
import SingleService from "./Pages/SingleService";
import Doctors from "./Pages/Doctors";
import Contact from "./Pages/Contact";
import News from "./Pages/News";
import NewsDetails from "./Pages/NewsDetails";
import Appointment from "./Pages/Appointment";
import AppointmentPage from './Components/DashBoard/Doctors/AppointmentPage';
import AppointmentSection from './Components/DashBoard/Doctors/AppointmentSection';
import DashBoardMain from './Components/DashBoard/Doctors/DashBoardMain';
import LabReports from './Components/DashBoard/Doctors/LabReports';
import Payment from './Components/DashBoard/Doctors/Payment';
import Profile from './Components/DashBoard/Common/Profile';
import DoctorDashboardLayout from './Dashboard/Doctors/DashboardLayout';
import LabReportView from './Components/DashBoard/Doctors/LabResults/LabReportFull';
import PatientDashboardLayout from './Dashboard/patient/PatientDashboardLayout';
import PatientDashboardMain from './Components/DashBoard/Patient/PatientDashboardMain';
import DashboardNavbar from './Components/Home/NewNavbar';
import GenerateLabReports from './Components/DashBoard/Doctors/LabResults/GenerateLabReports';
import ScrollToTop from './utils/common/ScrollToTop';
import AddNewPatient from './Components/DashBoard/Patient/AddNewPatient';
import ScheduleAppointment from './Components/Forms/ScheduleAppointment';
import AiAssistnate from './Dashboard/patient/AiAssistnate';
import Madications from './Components/DashBoard/Patient/Madications';
import AppointmentPatient from './Components/DashBoard/Patient/AppointmentPatient';
import MedicalRecords from './Components/DashBoard/Patient/MedicalRecords';

const App = () => {
    return (
        <BrowserRouter>
        <ScrollToTop/>
            <Navbar />  
            {/* <DashboardNavbar />  */}
            { /*  this navbar appears after logged in*/}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<AuthPage />} />
                {/* <Route path="/doctor" element={<Dashboard />} /> */}
                <Route path="/doctor" element={<DoctorDashboardLayout />}>
                        <Route path="dashboard" element={<DashBoardMain />} />
                        <Route path="appointments" element={<AppointmentSection />} />
                        <Route path="appointments-page" element={<AppointmentPage />} />
                        <Route path="generate-reports" element={<GenerateLabReports />} />
                        <Route path="add-new-patient" element={<AddNewPatient />} />
                        <Route path="schedule-appointment" element={<ScheduleAppointment />} />
                        <Route path="lab-reports" element={<LabReports />} />
                        <Route path="lab-reports/:id" element={<LabReportView />} />
                        <Route path="payment" element={<Payment />} />
                        <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="/patient" element={<PatientDashboardLayout />}>
                        <Route path="dashboard" element={<PatientDashboardMain />} />
                        <Route path="appointments" element={<AppointmentPatient />} />
                        <Route path="ai-assistant" element={<AiAssistnate />} />
                        <Route path="medical-records" element={<MedicalRecords />} />
                        <Route path="madications" element={<Madications />} />
                        <Route path="lab-reports" element={<LabReports />} />
                        <Route path="lab-reports/:id" element={<LabReportView />} />
                        <Route path="payment" element={<Payment />} />
                        <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="/about" element={<About />} />
                <Route path="/video-call/:id" element={<Videocall />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/free-checkup" element={<SingleService />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/news" element={<News />} />
                <Route path="/news-details" element={<NewsDetails />} />
                <Route path="/appointment" element={<Appointment/>}/>

            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
