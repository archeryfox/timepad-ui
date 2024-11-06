import { create } from 'zustand';
import { api, routes } from "./axios.js";

const useSubscriptionStore = create((set) => ({
    subscriptions: [],

    // Добавление подписки
    addSubscription: async (userId, eventId) => {
        try {
            const response = await api.post(routes.subscriptions, { userId, eventId });
            set((state) => ({
                subscriptions: [...state.subscriptions, response.data]
            }));
        } catch (error) {
            console.error("Error adding subscription:", error);
        }
    },

    // Получение списка подписок
    fetchSubscriptions: async () => {
        try {
            const response = await api.get(routes.subscriptions);
            set({ subscriptions: response.data });
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
        }
    },

    // Удаление подписки по ID
    deleteSubscription: async (id) => {
        try {
            await api.delete(`${routes.subscriptions}/${id}`);
            set((state) => ({
                subscriptions: state.subscriptions.filter(subscription => subscription.id !== id)
            }));
        } catch (error) {
            console.error("Error deleting subscription:", error);
        }
    }
}));

export default useSubscriptionStore;
