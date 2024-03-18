import React, { useState } from "react";
import { Badge, Button } from "reactstrap";
import { Link } from "react-router-dom";
import {
  BlockBetween,
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
  const [isModalOpen, setModalOpen] = useState(false);
  const [branchModalData, setBranchModalData] = useState(null);

  const usersData = [
    { id: 1, username: "JohnDoe", email: "john@example.com", status: true, isEmailVerified: true },
    { id: 2, username: "JaneDoe", email: "jane@example.com", status: false, isEmailVerified: false },
    { id: 2, username: "HammadSaeed", email: "jane@example.com", status: false, isEmailVerified: false },
    // Add more users as needed
  ];

  const openModal = (user) => {
    setBranchModalData(user);
    setModalOpen(true);
  };

  return (
    <>
      <Head title="User List" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>User</BlockTitle>
              <BlockDes className="text-soft">Manage your Users</BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <PreviewCard>
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
                {usersData.map((user, index) => (
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
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => openModal(user)}
                      >
                        <Icon name="edit" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PreviewCard>
      </Content>
      <EditBranchModal
        isOpen={isModalOpen}
        toggle={() => setModalOpen(!isModalOpen)}
        branchData={branchModalData}
      />
    </>
  );
};

export default UserList;