import CreateUserForm from "./components/CreateUserForm";
import UsersList from "./components/UsersList";

const App = () => {
  return (
    <div className="container mx-auto">
      <CreateUserForm />
      <UsersList />
    </div>
  );
};

export default App;
