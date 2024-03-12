import React, { useState } from "react";
import {  Spinner } from "reactstrap";
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
// import EditBranchModal from "./EditUserModal";

const ContactList = () => {
  const { useApi, isLoading } = useApiHook();
  const [branchModalData, setBranchModalData] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (branch) => {
    setBranchModalData(branch);
    setModalOpen(true); // Function to open the modal
  };

  useEffect(() => {
    useApi.get("api/contact/get-all").then((response) => {
      setApiData(response);
    });
  }, []);

  const updateBranch = () => {
    // Refresh the branch data
    setApiData(null);
    useApi.get("api/contact/get-all").then((response) => {
      setApiData(response);
    });
    // setReload(!reload)
  };

  const dataTableColumns = [
    {
      name: "Title",
      selector: (row) => <span className=" m-2 ">{row.title}</span>,
      sortable: true,
      wrap: true,
      compact: true,
      //   hide: 370,
    },

    {
      name: "content",
      selector: (row) => row.content,
      wrap: true,
      sortable: true,
      //   hide: "sm",
    },
    {
      name: "user Name",
      selector: (row) => row.user.username,
      wrap: true,
      sortable: true,
      //   hide: "sm",
    },
    {
      name: "User Email",
      selector: (row) => row.user.email,
      wrap: true,
      sortable: true,
      //   hide: "sm",
    },
    
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      wrap: true,
      width: "130px",
      sortable: true,
      cell: (row) => {
        const date = new Date(row.createdAt);
        
        // Month abbreviation mapping
        const monthAbbreviations = [
          "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
          "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" 
        ];
        const formattedDate = `${date.getDate()}-${monthAbbreviations[date.getMonth()]}-${date.getFullYear()}`;
        return <span>{formattedDate}</span>;
      }
    },

    {
      name: "Action",
      width: "100px",
      cell: (row) => (
        <div className="tb-odr-btns">
          {/* <Button color="primary" size="sm" className="btn-icon btn-dim " onClick={() => openModal(row)}>
            <Icon name="edit"></Icon>
          </Button> */}

          <Button
            color="danger"
            size="sm"
            className="btn-icon btn-dim"
            onClick={() => deleteModal("api/contact/delete/", row._id, updateBranch)}
          >
            <Icon name="trash-fill"></Icon>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Head title="ContactList" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Contacts</BlockTitle>
              <BlockDes className="text-soft">Manage your Contacts</BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              {/* <Link to={"/add-branch"}>
                <Button color="primary">
                  <span>Add Branch</span>
                </Button>
              </Link> */}
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <PreviewCard>
          {apiData ? (
            <ReactDataTable
              data={apiData}
              columns={dataTableColumns}
              expandableRows
              progressPending={isLoading}
              pagination
              actions
              searchBy={"title"}
            />
          ) : (
            <div className="d-flex justify-content center">
              {isLoading ? <Spinner color="primary" /> : <h6>Please Check Error</h6>}
            </div>
          )}
        </PreviewCard>

        {/* <Card className="card-stretch border">
          <ReactDataTableAlt data={DataTableData} columns={dataTableColumns} expandableRows pagination actions />
        </Card> */}
      </Content>
   
    </>
  );
};
export default ContactList;
