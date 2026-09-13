import { CheckCircle2, X, XCircle } from "lucide-react";
import { useNotification } from "./NotificationContext";
import "./NotificationToast.css";

export function NotificationToast() {
  const { notifications, dismissNotification } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="notification-container" aria-live="polite">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification--${notification.type}`}
          role="status"
        >
          {notification.type === "success" ? (
            <CheckCircle2 size={18} aria-hidden="true" />
          ) : (
            <XCircle size={18} aria-hidden="true" />
          )}
          <span>{notification.message}</span>
          <button
            type="button"
            className="notification__close"
            onClick={() => dismissNotification(notification.id)}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
