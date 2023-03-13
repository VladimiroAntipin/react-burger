import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ForgotPasswordPage } from "../../pages/ForgotPassword/forgot-password";
import { HomePage } from "../../pages/Homepage/Homepage";
import { IngredientsDetailsPage } from "../../pages/IngredientById/ingredients-by-id";
import { LoginPage } from "../../pages/Login/login";
import { NotFound404 } from "../../pages/NotFound404/not-found-404";
import { ProfilePage } from "../../pages/Profile/profile";
import { RegistrationPage } from "../../pages/Register/register";
import { ResetPasswordPage } from "../../pages/ResetPassword/reset-password";
import { checkUserAuth } from "../../services/actions/currentSessionActions/checkUserAuth";
import { getIngredients } from "../../services/reducers/ingredients";
import { IngredientDetailsWithParams } from "../IngredientsDetails/IngredientsDetails";

import { Modal } from "../Modal/Modal";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

export type LocationState = {
  backgroundUrl: string;
};

function AppContent() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const locationState = location.state as null | LocationState;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);
  const navigate = useNavigate();

  return (
    <>
      <Routes location={locationState?.backgroundUrl ?? location}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <ProtectedRoute authorized={false}>
              <RegistrationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute authorized={false}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute authorized={false}>
              <ForgotPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute authorized={false}>
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<NotFound404 />} />
        <Route path="/ingredients/:id" element={<IngredientsDetailsPage />} />
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute authorized={true}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      {locationState?.backgroundUrl && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={() => navigate(-1)}>
                <IngredientDetailsWithParams />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;