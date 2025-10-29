import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
interface UsersType {
  name: string;
}
function AdminDashboard() {
  const [taboption, setTaboption] = useState("user");
  const [users, setUsers] = useState<UsersType[]>([]);
  const token=useSelector((state:any)=>state.token)

  useEffect(() => {
    const fetchUser = async () => {
        let url;
        if(taboption=="user") url="http://localhost:8080/getAllUsers" 
        else url="http://localhost:8080/getAllOwners" 
      try {
        const response = await axios.get(url,{ headers:{Authorization:`Bearer ${token}`}});
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [taboption]);
  return (
    <div>
      <button onClick={() => setTaboption("user")}>Users</button>
      <button onClick={() => setTaboption("owner")}>Restaurant Owners</button>
      <ul>
        {users.map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
