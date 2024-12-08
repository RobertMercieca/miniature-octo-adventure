import { create } from 'zustand';

import { type AddAlert, type AlertStore } from './alertStoreTypes';

const DEFAULT_ALERT_DURATION = 3000;

export const useAlertStore = create<AlertStore>((set, get) => ({
  // state
  alerts: [],

  // actions
  add: (alert: AddAlert) => {
    const alertId = crypto.randomUUID();
    const duration = alert.duration ?? DEFAULT_ALERT_DURATION;

    set((state) => ({ alerts: [{ ...alert, id: alertId }, ...state.alerts] }));

    setTimeout(() => {
      set((state) => ({
        alerts: state.alerts.filter((alert) => alert.id !== alertId),
      }));
    }, alert.duration ?? duration);
  },

  // getters
  mostRecentAlert: () => get().alerts[0],
}));
