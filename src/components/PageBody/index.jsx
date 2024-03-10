import { Outlet } from "react-router-dom";
import Header from "./Header";
import FloatingWhatsAppButton from "components/FloatingButton";
import { Suspense, lazy } from "react";
import Loading from "components/Loading";

const Footer = lazy(() => import('./Footer'));
const FooterDev = lazy(() => import('./FooterDev'));
export default function PageBody() {
    return (
        <>
            <Header />
            <Suspense fallback={<Loading />}>
                <Outlet />
                <Footer />
                <FooterDev />
                <FloatingWhatsAppButton />
            </Suspense>
        </>
    );
}
