import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Header from "./components/Header";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CartContextProvider } from "./components/data/CartContext";
test("проверка открытия модального окна при нажатии на бургер-меню", () => {
  // Рендерим компонент Header
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
    },
  ]);

  const { container } = render(
    <CartContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </CartContextProvider>
  );

  const burgerMenu = container.querySelector(".js-burger");
  const burgerMenuClose = container.querySelector(".js-burger-close");
  const burgerMenuOpen = container.querySelector(".js-burger-open");

  expect(burgerMenu).not.toHaveClass("active");

  fireEvent.click(burgerMenuOpen);
  expect(burgerMenu).toHaveClass("active");

  fireEvent.click(burgerMenuClose);
  expect(burgerMenu).not.toHaveClass("active");
});
