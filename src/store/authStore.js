import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = create(
  persist(
    (set) => ({
      user: null,
      access: null,
      isAuth: false,
      likedBooks: [],
      login: (user, access) =>
        set({
          user,
          access,
          isAuth: true,
        }),

      logout: () =>
        set({
          user: null,
          access: null,
          isAuth: false,
          likedBooks: [],
        }),

      toggleLiked: (book) =>
        set((state) => {
          const isExist = state.likedBooks.some((item) => item.id === book.id);

          return {
            likedBooks: isExist
              ? state.likedBooks.filter((item) => item.id !== book.id) // O'chirish
              : [...state.likedBooks, book], // Qo'shish
          };
        }),
    }),
    {
      name: "auth-store",
    }
  )
);

export default authStore;
