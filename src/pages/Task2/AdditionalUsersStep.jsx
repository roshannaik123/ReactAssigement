import { useState, useEffect } from "react";
import { Plus, Trash2, User } from "lucide-react";

export default function AdditionalUsersStep({
  formData,
  updateFormData,
  registerValidator,
}) {
  const [users, setUsers] = useState(formData.additionalUsers || []);

  const addUser = () => {
    setUsers([
      ...users,
      { id: Date.now(), name: "", email: "", role: "Member" },
    ]);
  };

  const removeUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const updateUser = (id, field, value) => {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, [field]: value } : u))
    );
  };

  useEffect(() => {
    updateFormData({ additionalUsers: users });
  }, [users]);

  const validate = () => {
    return true; // Additional users can be optional
  };

  useEffect(() => {
    registerValidator?.(validate);
  }, [formData]);

  return (
    <div>
      <p className="text-sm text-sky-400 font-medium text-center">Step 3</p>
      <h2 className="text-3xl font-normal text-center text-slate-700 mt-1">
        Additional Users
      </h2>
      <p className="text-center text-gray-400 mt-2 max-w-md mx-auto text-sm">
        Add team members who should have access to this account.
      </p>

      <div className="mt-8 space-y-4">
        {users.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
            <User className="mx-auto text-gray-300 mb-2" size={40} />
            <p className="text-sm text-gray-500 font-medium">No additional users added yet.</p>
            <p className="text-xs text-gray-400 mt-1">Click the button below to add team members.</p>
          </div>
        ) : (
          users.map((user, idx) => (
            <div
              key={user.id}
              className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center border border-gray-200 rounded-lg p-4 bg-white"
            >
              <div className="sm:col-span-5">
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={user.name}
                  onChange={(e) => updateUser(user.id, "name", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <div className="sm:col-span-5">
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="user@company.com"
                  value={user.email}
                  onChange={(e) => updateUser(user.id, "email", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <div className="sm:col-span-2 flex items-center justify-end pt-5">
                <button
                  type="button"
                  onClick={() => removeUser(user.id)}
                  className="text-red-400 hover:text-red-600 p-2 rounded-md hover:bg-red-50 transition-colors"
                  title="Remove user"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}

        <button
          type="button"
          onClick={addUser}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-blue-200 text-blue-500 hover:bg-blue-50/50 py-3 rounded-lg font-medium text-sm transition-colors"
        >
          <Plus size={18} /> Add User
        </button>
      </div>
    </div>
  );
}
