import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useGetFeed } from "../../hooks/orders";
import { OrderFeed } from "../../pages/feed/feed";
import { ForgotPasswordPage } from "../../pages/ForgotPassword/forgot-password";
import { HomePage } from "../../pages/Homepage/Homepage";
import { IngredientsDetailsPage } from "../../pages/IngredientById/ingredients-by-id";
import { LoginPage } from "../../pages/Login/login";
import { NotFound404 } from "../../pages/NotFound404/not-found-404";
import { ProfileOrderDetails, ProfilePage } from "../../pages/Profile/profile";
import { RegistrationPage } from "../../pages/Register/register";
import { ResetPasswordPage } from "../../pages/ResetPassword/reset-password";
import { checkUserAuth } from "../../services/actions/currentSessionActions/checkUserAuth";
import { getIngredients } from "../../services/reducers/ingredients";
import AppHeader from "../AppHeader/AppHeader";
import { IngredientDetailsWithParams } from "../IngredientsDetails/IngredientsDetails";
import { Modal } from "../Modal/Modal";
import { OrderItem } from "../OrderItem/OrderItem";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

export type LocationState = {
  backgroundUrl: string;
};

const FeedDetails = () => {
  const { id } = useParams();
  const feed = useGetFeed() ?? {};
  const order = feed.orders?.find((order) => order._id === id);

  return order ? <OrderItem order={order} /> : null;
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

        <Route path="/feed" element={<OrderFeed />} />

        <Route
          path="/feed/:id"
          element={
            <FeedDetails />
          }
        />

        <Route
          path="/profile/*"
          element={
            <ProtectedRoute authorized={true}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/orders/:id"
          element={
            <ProfileOrderDetails />
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

          <Route
            path="/feed/:id"
            element={
              <Modal onClose={() => navigate(-1)}>
                <FeedDetails />
              </Modal>
            }
          />

          <Route
            path="/profile/orders/:id"
            element={
              <Modal onClose={() => navigate(-1)}>
                <ProfileOrderDetails />
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
    <AppHeader />
    <AppContent />
  </Router>
);

export default App;