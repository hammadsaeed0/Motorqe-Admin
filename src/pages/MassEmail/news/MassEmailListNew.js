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
import MassEmailModal from "./MassEmailModal";
import Content from "layout/content/Content";
// import EditBranchModal from "./EditNewsModal";

const MassEmailList = () => {
  const { useApi, isLoading } = useApiHook();
  const [branchModalData, setBranchModalData] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const navigate = useNavigate()
  const openViewModal = (row) => {
    setSelectedNews(row);
    setViewModalOpen(true);
  };

  const openModal = (branch) => {
    setBranchModalData(branch);
    setModalOpen(true); // Function to open the modal
  };

  useEffect(() => {
    useApi.get("api/admin/email/all-sent-email").then((response) => {
      setApiData(response);
      console.log("apiData:",apiData)
    });
  }, []);

  const updateBranch = () => {
    // Refresh the branch data
    setApiData(null);
    useApi.get("api/admin/email/all-sent-email").then((response) => {
      setApiData(response);
    });
    // setReload(!reload)
  };

  const dataTableColumns = [
    {
      name: "Subject",
      selector: (row) => row.subject,
      wrap: true,
        width: "130px",
        sortable: true,
        cell: (row) => (
          <div style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            {row.subject}
          </div>
        ),
    },

    {
      name: "content",
      selector: (row) => row.html,
      wrap: true,
      width: "130px",
      sortable: true,
      cell: (row) => (
        <div style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
          {row.html}
        </div>
      ),
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
      name: "Actions",
      width: "100px",
      cell: (row) => (
        <div className="tb-odr-btns">
          {/* <Button
            color="primary"
            size="sm"
            className="btn-icon btn-dim text-stone-500"
            onClick={() => openEditModal(row)}
          >
            <Icon name="edit" />
          </Button> */}
          <Button
            color="info"
            size="sm"
            className="btn-icon btn-dim text-stone-500"
            onClick={() => openViewModal(row)}
          >
            <Icon name="eye" />
          </Button>
          {/* <Button
            color="danger"
            size="sm"
            className="btn-icon btn-dim text-stone-500"
            onClick={() => deleteModal("api/news/delete/", row._id, updateBranch)}
          >
            <Icon name="trash-fill" />
          </Button> */}
        </div>
      ),
    },
  ];

  return (
    <>
      <Head title="Mass Email List" />
      <Content>

        <PreviewCard>
        {/* <Button color={"primary"} className="mb-4"><Link to={"/send-email"}>Send Mass Email</Link></Button> */}
          {apiData ? (
            <ReactDataTable
              data={apiData}
              columns={dataTableColumns}
              expandableRows
              progressPending={isLoading}
              pagination
              // actions
              searchBy={"username"}
            />
          ) : (
            <div className="d-flex justify-content center">
              {isLoading ? <Spinner color="primary" /> : <h6>Please Check Error</h6>}
            </div>
          )}
        </PreviewCard>
        <MassEmailModal
          isOpen={isViewModalOpen}
          toggle={() => setViewModalOpen(!isViewModalOpen)}
          newsData={selectedNews} />
      
      </Content>
   
    </>
  );
};
export default MassEmailList;
