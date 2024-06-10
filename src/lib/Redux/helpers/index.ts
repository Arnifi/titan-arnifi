"use client";

export const setToken = (token: string) => {
  if (window) {
    document.cookie = `token=${token}; path=/`;
  }
};

export const getAuthToken = (): string => {
  if (window) {
    const cookies = document.cookie
      .split("; ")
      .reduce<Record<string, string>>((acc, cookie) => {
        const [name, value] = cookie.split("=");
        acc[name] = value;
        return acc;
      }, {});
    const token = cookies["token"];
    return token;
  }

  return "";
};
