function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>User Dashboard 👤</h1>

      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}

export default UserDashboard;