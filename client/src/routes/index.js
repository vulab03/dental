import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "./../pages/Register/Register";
import HeaderOnly from "../layouts/HeaderOnly/HeaderOnly";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageImage from "../pages/Dashboard/components/ManageImage/ManageImage";
import ManagePost from "../pages/Dashboard/components/ManagePost/ManagePost";
import Company from "../pages/Dashboard/components/Company/Company";
import AdminAccount from "../pages/Dashboard/components/AdminAccount/AdminAccount";
import Table from "../pages/Dashboard/components/ManageCustomer/Table/Table";
import Edit from "../pages/Dashboard/components/ManageCustomer/Edit/Edit";
import New from "../pages/Dashboard/components/ManageCustomer/New/New";

const publicRoutes = [
    { path: "/login", component: Login , layout : HeaderOnly },
    { path: "/register", component: Register },
    { path: "/", component: Home },
    {path:"/dashboard",component:Dashboard,layout: DashboardLayout},
    {path:"/manage-image",component: ManageImage, layout: DashboardLayout },
    {path:"/manage-post",component: ManagePost, layout: DashboardLayout },
    {path: "/manage-customer",component: Table, layout: DashboardLayout},
    {path: "/manage-customer/new-customer",component: New,layout:  DashboardLayout},
    {path: "/manage-customer/edit/:id",component: Edit, layout: DashboardLayout},
    {path:"/company-information",component: Company, layout: DashboardLayout},
    {path:"/admin-account",component: AdminAccount,layout: DashboardLayout},

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
