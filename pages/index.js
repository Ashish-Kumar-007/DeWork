import Card from "./cards";
import Dashboard from "./dashboard";
import LoginForm from "./login";
import AttendancePage from "./AttendancePage";
import LoginPage from "./adminlogin";
import DashboardPage from "./admindashboard";


export default function Home() {
  return (
    <div>
    <div>
      <title>DWork</title>
      <link rel="icon" href="/favicon.ico" />
    </div>  
    {/* <LoginForm />
    <Card /> */}
    {/* <Dashboard /> */}
    {/* <AttendancePage /> */}
    <LoginPage />
    <DashboardPage />
    
  </div>
  );
}
