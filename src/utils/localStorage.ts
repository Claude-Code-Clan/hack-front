export const storage = {
  //TODO зарефачить это говно или скачать библиотеку
  get: (key: string, defaultValue?: string): string | null => {
    try {
      const result = localStorage.getItem(key);
      if (!result) return defaultValue ?? null;
      try {
        return JSON.parse(result) as string;
      } catch {
        return result;
      }
    } catch {
      return defaultValue ?? null;
    }
  },
  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // toDo обработать ошибку
    }
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(e)
    }
  },
};
