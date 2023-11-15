import * as React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

export default function Routes() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <div>Hello world!</div>,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}