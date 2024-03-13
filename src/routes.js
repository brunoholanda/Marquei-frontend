import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Loading from "components/Loading";
import { AuthProvider, useAuth } from "context/AuthContext";

const NotFound = lazy(() => import('pages/NotFound'));
const PageBody = lazy(() => import('components/PageBody'));
const Home = lazy(() => import('pages/Home'));
const RegisterScreen = lazy(() => import('pages/RegisterScreen'));
const CheckoutPage = lazy(() => import('pages/CheckoutPage'));
const ResourcesGrid = lazy(() => import('pages/Resources'));

const Schedule = lazy(() => import('pages/Schedule'));
const Appointments = lazy(() => import('pages/Appointments'));
const AllAppointments = lazy(() => import('pages/History'));
const Authentication = lazy(() => import('pages/Auth'));
const PageBodySystem = lazy(() => import('components/PageBodySystem'));
const CalendarPage = lazy(() => import('pages/Calendar'));
const ClientDetails = lazy(() => import('pages/ClientDetails'));
const Configs = lazy(() => import('pages/Professional'));
const DoctorDetails = lazy(() => import('pages/Professional/ProfessionalDetails'));
const ResetPassword = lazy(() => import('pages/ResetPassword'));
const DashboardPanel = lazy(() => import('pages/DashboardPanel'));
const StockControlPage = lazy(() => import('pages/Estoque'));
const Contabilidade = lazy(() => import('pages/Contabilidade'));
const Pacientes = lazy(() => import('pages/Pacientes'));
const AtestadoInfoPage = lazy(() => import('pages/ConfirmCertificate'));
const MyPlan = lazy(() => import('pages/Professional/MyPlan'));
const HelpCenter = lazy(() => import('pages/HelpCenter'));
const PlansPage = lazy(() => import('pages/PlansPage'));
const PageBodyClient = lazy(() => import('components/PageBodyClient/PageBody'));
const DeclationInfoPage = lazy(() => import('pages/ConfirmDeclaration'));
const AdminMaster = lazy(() => import('pages/Admin'));
const TermsOfUse = lazy(() => import('pages/Docs/TermsOfUse'));
const PrivacyPolicy = lazy(() => import('pages/Docs/PryvacyPolicy'));
const ContactPage = lazy(() => import('pages/ContactPage'));
const NpsSystem = lazy(() => import('pages/NpsSystem'));
const ClientResearch = lazy(() => import('pages/NpsSystem/ClientResearch'));
const SearchProfessionals = lazy(() => import('pages/EncontreProfissionais'));

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

const storedSpecialties = JSON.parse(sessionStorage.getItem('userSpecialties') || '[]');

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
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<PageBody />}>
                            <Route index element={<Home />} />
                            <Route path="/cadastro" element={<RegisterScreen />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/resources" element={<ResourcesGrid />} />
                            <Route path="/planos" element={<PlansPage />} />
                            <Route path="/ajuda" element={<HelpCenter />} />
                            <Route path="/terms-of-use" element={<TermsOfUse />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/contato" element={<ContactPage />} />
                            <Route path="/loading" element={<Loading />} />
                            <Route path="/confirm-certificate/:id" element={<AtestadoInfoPage />} />
                            <Route path="/confirm-declaration/:id" element={<DeclationInfoPage />} />
                            <Route path="/reset-password/:token" element={<ResetPassword />} />
                            <Route path="/search-professionals" element={<SearchProfessionals />} />                            
                            <Route path="*" element={<NotFound />} />
                        </Route>
                        <Route element={<PageBodyClient />}>
                            <Route path="/agendar/:company_id" element={<Schedule />} />
                            <Route path="/pesquisa-satisfacao/:company_id" element={<ClientResearch />} />
                        </Route>
                        <Route path="/login" element={<Authentication />} />
                        <Route element={<PageBodySystem />}>
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
                            <Route path="/nps-system" element={<ProtectedRoute element={<NpsSystem />} />} />
                            <Route path="/adminpanel" element={<ProtectedRoute element={<AdminMaster />} allowedCompanyIds={[1]} />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </Suspense>
            </HashRouter>
        </AuthProvider>
    )
}

export default AppRoutes;