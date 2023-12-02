const { Navigate, Route } = require("react-router-dom");

function ProtectedRoute(props) {
    const token = localStorage.getItem('authToken');
    const isAuthenticated = !!token;

    if (!isAuthenticated) {
        return <Route {...props} element={<Navigate to="/login" replace />} />;
    }

    return <Route {...props} />;
}


export default ProtectedRoute;