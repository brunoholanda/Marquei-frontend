import NotFound from "pages/NotFound";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageBody from "components/PageBody";
import Home from "pages/Home";
import Schedule from "pages/Schedule";
import Appointments from "pages/Appointments";
import AllAppointments from "pages/History";
import Authentication from "pages/Auth";
import PageBodySystem from "components/PageBodySystem";
import CalendarPage from "pages/Calendar";
import AdminSc from "pages/Agenda";
import ClientDetails from "pages/ClientDetails";
import Configs from "pages/Professional";
import DoctorDetails from "pages/Professional/ProfessionalDetails";
import RegisterScreen from "pages/RegisterScreen";
import ResetPassword from "pages/ResetPassword";
import DashboardPanel from "pages/DashboardPanel";
import Clients from "pages/Clients";
import StockControlPage from "pages/Estoque";
import Contabilidade from "pages/Contabilidade";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
function AppRoutes() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    }, []);

    function ProtectedRoute({ element }) {
        const token = localStorage.getItem('authToken');
        if (!token) {
            return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
        }
        return element;
    }


    return (
        <HashRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<PageBody />}>
                    <Route index element={<Home />} />
                    <Route path="/cadastro" element={<RegisterScreen />} />
                    <Route path="/agendar/:company_id" element={<Schedule />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route element={<PageBodySystem />}>
                    <Route path="/login" element={<Authentication />} />
                    <Route path="/reset-password" element={<ResetPassword />} />

                    <Route path="/agendamentos" element={<ProtectedRoute element={<Appointments />} />} />
                    <Route path="/allagendamentos" element={<ProtectedRoute element={<AllAppointments />} />} />
                    <Route path="/calendario" element={<ProtectedRoute element={<CalendarPage />} />} />
                    <Route path="/admagenda" element={<ProtectedRoute element={<AdminSc />} />} />
                    <Route path="/client-details/:id" element={<ProtectedRoute element={<ClientDetails />} />} />
                    <Route path="/configs" element={<ProtectedRoute element={<Configs />} />} />
                    <Route path="/professionals/:id" element={<ProtectedRoute element={<DoctorDetails />} />} />
                    <Route path="/painel" element={<ProtectedRoute element={<DashboardPanel/>} />} />
                    <Route path="/clientes" element={<ProtectedRoute element={<Clients/>} />} />
                    <Route path="/estoque" element={<ProtectedRoute element={<StockControlPage/>} />} />
                    <Route path="/contabilidade" element={<ProtectedRoute element={<Contabilidade/>} />} />


                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default AppRoutes;