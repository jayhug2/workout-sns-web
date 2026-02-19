import { Outlet } from "react-router-dom";
import { Header } from "@/shared/components/layout/Header/Header";
import { BottomTabBar } from "@/shared/components/layout/BottomTabBar/BottomTabBar";

function App() {
    return (
        <div className={"app"}>
            <Header />
            <main style={{ paddingBottom: '70px' }}> {/* 하단 탭바 공간 확보 */}
                <Outlet />
            </main>
            <BottomTabBar />
        </div>
    );
}

export default App;