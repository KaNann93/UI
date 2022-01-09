/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StorageIcon from "@material-ui/icons/Storage";
import AssessmentIcon from "@material-ui/icons/Assessment";
import CreateIcon from "@material-ui/icons/Create";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import Order from "views/Order/Order";
import Purchase from "views/Purchase/Purchase";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
import NewPurchase from "views/Purchase/NewPurchase.js";
import Stock from "views/Stock/stock.js";
import Kitchen from "views/Kitchen/Kitchen";
import { FastfoodOutlined } from "@material-ui/icons";
import Recipe from "views/Recipe/Recipe";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/Order",
    name: "Order",
    icon: CreateIcon,
    component: Order,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Sale",
    icon: MonetizationOnIcon,
    component: NotificationsPage,
    layout: "/admin",
  },
  {
    path: "/kitchen",
    name: "Kitchen",
    icon: FastfoodOutlined,
    component: Kitchen,
    layout: "/admin",
  },
  {
    path: "/purchase",
    name: "Purchase",
    icon: ShoppingCartIcon,
    component: Purchase,
    layout: "/admin",
  },
  {
    path: "/stock",
    name: "Stock",
    icon: StorageIcon,
    component: Stock,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: StorageIcon,
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Report",
    icon: AssessmentIcon,
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/recipe",
    name: "Recipe",
    icon: Person,
    component: Recipe,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
];

export const purchaseRoutes = [
  {
    path: "/create",
    name: "CreatePurchase",
    icon: ShoppingCartIcon,
    component: NewPurchase,
    layout: "/admin/purchase",
  },
];

export default dashboardRoutes;
