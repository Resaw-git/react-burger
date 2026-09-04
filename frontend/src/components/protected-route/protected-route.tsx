import { useSelectorHook } from "../../hooks/redux";
import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
    const { loginSuccess } = useSelectorHook((store) => store.login);
    const location = useLocation();

    if (!loginSuccess) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};