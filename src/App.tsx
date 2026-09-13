import { NotificationProvider } from "./components/Notification/NotificationContext";
import { NotificationToast } from "./components/Notification/NotificationToast";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <NotificationProvider>
      <NotificationToast />
      <HomePage />
    </NotificationProvider>
  );
}

export default App;
