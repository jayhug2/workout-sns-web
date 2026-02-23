import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/shared/components/layout/Header/Header";
import { BottomTabBar } from "@/shared/components/layout/BottomTabBar/BottomTabBar";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/reduxHooks";
import { useGetMeQuery } from "@/features/auth/authApi";
import { setUser } from "@/features/auth/authSlice";

function App() {
    const { accessToken } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const { data: user } = useGetMeQuery(undefined, {
        skip: !accessToken,
    });

    useEffect(() => {
        if (user) {
            dispatch(setUser(user));
        }
    }, [user, dispatch]);

    return (
        <div className={"app"}>
            <Header />
            <main style={{ paddingBottom: '70px' }}>
                <Outlet />
            </main>
            <BottomTabBar />
        </div>
    );
}

export default App;