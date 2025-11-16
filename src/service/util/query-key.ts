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
  devices: {
    all: () => ["devices", "list"],
    byId: (id?: number) => ["devices", "detail", id ?? "new"],
  },
  holidays: {
    all: (pageIndex?: number , pageLimit?: number) => ["holidays", pageIndex , pageLimit],
    byId: (id?: number) => ["holidays", "detail", id ?? "new"],
  },
};
