import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type NotificationType = "success" | "error";

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextValue {
  notifications: Notification[];
  showNotification: (message: string, type?: NotificationType) => void;
  dismissNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id),
    );
  }, []);

  const showNotification = useCallback(
    (message: string, type: NotificationType = "success") => {
      const id = crypto.randomUUID();
      setNotifications((current) => [...current, { id, message, type }]);

      setTimeout(() => {
        dismissNotification(id);
      }, 3500);
    },
    [dismissNotification],
  );

  const value = useMemo(
    () => ({ notifications, showNotification, dismissNotification }),
    [notifications, showNotification, dismissNotification],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification(): NotificationContextValue {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
}
