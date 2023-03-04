import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MODAL_ID } from "../../constants/modal";
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
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { RoutesWithModal } from "../RoutesWithModal/RoutesWithModal";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <Router>
      <RoutesWithModal>
        <Route
          index
          modalId={MODAL_ID.INGREDIENTS}
          modalHandler
          element={<HomePage />}
        />

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

        <Route
          modalId={MODAL_ID.INGREDIENTS}
          path="/ingredients/:id"
          element={<IngredientsDetailsPage />} />

        <Route
          path="/profile/*"
          element={
            <ProtectedRoute authorized={true}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

      </RoutesWithModal>
    </Router>
  );
}

export default App;
