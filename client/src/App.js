import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import { FooterLayout } from "./layouts";
import PrivateRoute from "./routes/privateRoute";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        window.addEventListener('beforeunload', handleUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleUnload);
        };
      }, []);
    
    const handleUnload = (event) => {
        if (event.persisted) {
            // Trang web được tải lại
            console.log("aaa")
          } else {
            // Trình duyệt bị tắt
            localStorage.clear();
          }
        
    };
    
    return (
        <Router>
            <div className="App" style={{height:"100vh"}}>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        const Layout = route.layout || FooterLayout;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    <Route element={<PrivateRoute/>}>
                            {privateRoutes.map((route, index) => {
                                const Page = route.component;
                                const Layout = route.layout;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
