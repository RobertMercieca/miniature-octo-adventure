export type AlertType = 'success' | 'warning' | 'danger';

export type Alert = {
  id: string;
  type: AlertType;
  message: string;
};

export type AddAlert = {
  type: AlertType;
  message: string;
  duration?: number;
};

export type AlertStore = {
  // state
  alerts: Alert[];

  // actions
  add: (alert: AddAlert) => void;

  // getters
  mostRecentAlert: () => Alert;
};
