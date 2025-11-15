export const queryKeys = {
  categories: {
    list: () => ["categories", "list"],
    byId: (id?: number) => ["categories", "detail", id ?? "new"],
  },

  customers: {
    all: () => ["customer", "list"],
  },

  products: {
    all: () => ["products", "list"],
    byId: (id?: number) => ["products", "detail", id ?? "new"],
  },
};
