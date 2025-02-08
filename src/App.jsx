import { Route, Routes, BrowserRouter } from "react-router";
import { lazy, Suspense, useEffect } from "react";
import { useViewport } from "react-viewport-hooks";
import { useDispatch } from "react-redux";

import DesktopHeaderSkeleton from "./components/Skeletons/DesktopHeaderSkeleton";
import MobileHeaderSkeleton from "./components/Skeletons/MobileHeaderSkeleton";
import Loading from "./components/Skeletons/Loading";
import TasksPage from "./pages/TasksPage";
import TaskEditForm from "./components/Tasks/TaskEditForm";
import PendingTaskPage from "./pages/PendingTaskPage";
import ElapsedTaskPage from "./pages/ElapsedTaskPage";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));

const DesktopHeader = lazy(() => import("./components/header/DesktopHeader"));
const MobileHeader = lazy(() => import("./components/header/MobileHeader"));

function App() {
  const { vw } = useViewport();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "getLocalStorage", payload: {} });
  }, []);

  return (
    <>
      <BrowserRouter>
        {vw < 992 ? (
          <Suspense fallback={<MobileHeaderSkeleton />}>
            <MobileHeader />
          </Suspense>
        ) : (
          <Suspense fallback={<DesktopHeaderSkeleton />}>
            <DesktopHeader />
          </Suspense>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <DashboardPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="/tasks"
            element={
              <Suspense fallback={<Loading />}>
                <TasksPage />
              </Suspense>
            }
          />
          <Route
            exact
            path="/tasks/pending"
            element={
              <Suspense fallback={<Loading />}>
                <PendingTaskPage />
              </Suspense>
            }
          />
          <Route
            exact
            path="/tasks/elapsed"
            element={
              <Suspense fallback={<Loading />}>
                <ElapsedTaskPage />
              </Suspense>
            }
          />
          <Route
            path="/tasks/:taskID"
            element={
              <Suspense fallback={<Loading />}>
                <TaskEditForm />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
