import React, { useState } from "react";
import { Badge, Button } from "reactstrap";
import {
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  PreviewCard,
} from "components/Component";
import EditBranchModal from "./EditUserModal";
import Head from "layout/head/Head";
import Content from "layout/content/Content";

const UserList = () => {
  const [branchModalData, setBranchModalData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const usersData = [
    { id: 1, username: "JohnDoe", email: "john@example.com", status: true, isEmailVerified: true },
    { id: 2, username: "JaneDoe", email: "jane@example.com", status: false, isEmailVerified: false },
    // Add more users as needed
  ];

  const openModal = (user) => {
    setBranchModalData(user);
    setModalOpen(true);
  };

  const handleSearch = (value) => {
    setSearchInput(value);
    const filtered = usersData.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered.length > 0 ? filtered : []);
  };

  return (
    <>
      <Head title="User List" />
      <Content>
        <BlockHead size="sm">
          <BlockTitle>User</BlockTitle>
          <BlockDes>Manage your Users</BlockDes>
        </BlockHead>

        <PreviewCard>
          <div className="text-start">
            <label>
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Search by username"
                value={searchInput}
                onChange={(ev) => handleSearch(ev.target.value)}
              />
            </label>
          </div>

          {usersData.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Email Verification</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(filteredData.length > 0 ? filteredData : usersData).map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <Badge color={user.status ? "success" : "danger"}>
                          {user.status ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td>
                        <Badge color={user.isEmailVerified ? "success" : "danger"}>
                          {user.isEmailVerified ? "Verified" : "Not Verified"}
                        </Badge>
                      </td>
                      <td>
                        <Button color="primary" size="sm" onClick={() => openModal(user)}>
                          <Icon name="edit" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <h6>No data available</h6>
            </div>
          )}
        </PreviewCard>
        <EditBranchModal
          isOpen={isModalOpen}
          toggle={() => setModalOpen(!isModalOpen)}
          branchData={branchModalData}
        />
      </Content>
    </>
  );
};

export default UserList;