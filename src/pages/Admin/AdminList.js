import React, { useState } from "react";
import { Badge, Spinner } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";   
import { useEffect } from "react";
import { useApiHook } from "utils/api";
import {
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
  ReactDataTable,
} from "components/Component";
import deleteModal from "utils/deleteModal";
import Head from "layout/head/Head";
import Content from "layout/content/Content";
import EditBranchModal from "./EditUserModal";
// import EditBranchModal from "./EditUserModal";

const AdminList = () => {
  const { useApi, isLoading } = useApiHook();
  const [branchModalData, setBranchModalData] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate()
  const role = localStorage.getItem("role");
  const openModal = (branch) => {
    setBranchModalData(branch);
    setModalOpen(true); // Function to open the modal
  };

  useEffect(() => {
    useApi.get("api/admin/auth/getalladmin").then((response) => {
      setApiData(response);
      console.log( "response:", response)
    });
  }, []);

  const updateBranch = () => {
    // Refresh the branch data
    setApiData(null);
    useApi.get("api/admin/auth/getalladmin").then((response) => {
      setApiData(response);
    });
    // setReload(!reload)
  };

  const dataTableColumns = [
    {
      name: "#",
      selector: (row) => row.id,
      width: "55px",
      sortable: true,
      cell: (row, index) => index + 1,
    },
    {
      name: "User Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
      compact: true,
      //   hide: 370,
    },

    {
      name: "Email",
      selector: (row) => row.email,
      wrap: true,
      sortable: true,
      //   hide: "sm",
    },
     
    {
      name: "Role",
      selector: (row) => row.role,
      wrap: true,
      sortable: true,

    },
    {
      name: "Action",
      width: "100px",
      cell: (row) => (
        <div className="tb-odr-btns">
          <Button color="primary" size="sm" className="btn-icon btn-dim text-stone-500" onClick={() => openModal(row)}>
            <Icon name="edit"></Icon>
          </Button>

        </div>
      ),

    },

  ];

  return (
    <><div>
      
    </div>
      <Head title="User List" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Admins</BlockTitle>
              <BlockDes className="text-soft">Manage your Admins</BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

{apiData && role === 'Super Admin' ? (
  <ReactDataTable
    data={apiData}
    columns={dataTableColumns}
    expandableRows
    progressPending={isLoading}
    pagination
    actions
    searchBy={['name']}
  />
) : (
  <div className="d-flex justify-content-center">
    {isLoading ? (
      <Spinner color="primary" />
    ) : (
      <h6>{role !== 'Super Admin' ? 'You are not Super Admin' : 'Please Check Error'}</h6>
    )}
  </div>
)}
      </Content>
      <EditBranchModal
        isOpen={isModalOpen}
        toggle={() => setModalOpen(!isModalOpen)}
        branchData={branchModalData}
        updateBranch={updateBranch}
      />
    </>
  );
};
export default AdminList;
