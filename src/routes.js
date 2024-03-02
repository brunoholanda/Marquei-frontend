import NotFound from "pages/NotFound";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageBody from "components/PageBody";
import Home from "pages/Home";
import Schedule from "pages/Schedule";
import Appointments from "pages/Appointments";
import AllAppointments from "pages/History";
import Authentication from "pages/Auth";
import PageBodySystem from "components/PageBodySystem";
import CalendarPage from "pages/Calendar";
import ClientDetails from "pages/ClientDetails";
import Configs from "pages/Professional";
import DoctorDetails from "pages/Professional/ProfessionalDetails";
import RegisterScreen from "pages/RegisterScreen";
import ResetPassword from "pages/ResetPassword";
import DashboardPanel from "pages/DashboardPanel";
import StockControlPage from "pages/Estoque";
import Contabilidade from "pages/Contabilidade";
import Pacientes from "pages/Pacientes";
import AtestadoInfoPage from "pages/ConfirmCertificate";
import CheckoutPage from "pages/CheckoutPage";
import MyPlan from "pages/Professional/MyPlan";
import HelpCenter from "pages/HelpCenter";
import ResourcesGrid from "pages/Resources";
import PlansPage from "pages/PlansPage";
import CompaniesTable from "pages/Admin";
import PageBodyClient from "components/PageBodyClient/PageBody";
import DeclationInfoPage from "pages/ConfirmDeclaration";
import { AuthProvider, useAuth } from "context/AuthContext";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

const storedSpecialties = JSON.parse(localStorage.getItem('userSpecialties') || '[]');

function AppRoutes() {

    function ProtectedRoute({ element, allowedCompanyIds }) {
        const { authData } = useAuth();
        const isAuthenticated = !!authData.authToken;
        const userCompanyId = authData.companyID;
    
        if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }
    
        if (allowedCompanyIds && !allowedCompanyIds.includes(userCompanyId)) {
            return <Navigate to="/painel" />;
        }
    
        return element;
    }

    return (
        <AuthProvider>

            <HashRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<PageBody />}>
                        <Route index element={<Home />} />
                        <Route path="/cadastro" element={<RegisterScreen />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/resources" element={<ResourcesGrid />} />
                        <Route path="/planos" element={<PlansPage />} />
                        <Route path="/ajuda" element={<HelpCenter />} />
                        <Route path="/confirm-certificate/:id" element={<AtestadoInfoPage />} />
                        <Route path="/confirm-declaration/:id" element={<DeclationInfoPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route element={<PageBodyClient />}>
                        <Route path="/agendar/:company_id" element={<Schedule />} />
                    </Route>

                    <Route element={<PageBodySystem />}>
                        <Route path="/login" element={<Authentication />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/agendamentos" element={<ProtectedRoute element={<Appointments />} />} />
                        <Route path="/allagendamentos" element={<ProtectedRoute element={<AllAppointments />} />} />
                        <Route path="/calendario" element={<ProtectedRoute element={<CalendarPage />} />} />
                        <Route path="/client-details/:id" element={<ProtectedRoute element={<ClientDetails userSpecialties={storedSpecialties} />} />} />
                        <Route path="/configs" element={<ProtectedRoute element={<Configs />} />} />
                        <Route path="/professionals/:id" element={<ProtectedRoute element={<DoctorDetails />} />} />
                        <Route path="/painel" element={<ProtectedRoute element={<DashboardPanel />} />} />
                        <Route path="/clientes" element={<ProtectedRoute element={<Pacientes />} />} />
                        <Route path="/estoque" element={<ProtectedRoute element={<StockControlPage />} />} />
                        <Route path="/contabilidade" element={<ProtectedRoute element={<Contabilidade />} />} />
                        <Route path="/planos" element={<ProtectedRoute element={<MyPlan />} />} />
                        <Route path="/adminpanel" element={<ProtectedRoute element={<CompaniesTable />} allowedCompanyIds={[1]} />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </HashRouter>
        </AuthProvider>

    )
}

export default AppRoutes;