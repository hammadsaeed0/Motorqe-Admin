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
import EditBranchModal from "./EditNewsModal";
import ViewNewsModal from "./ViewNewsModal"; // Import the ViewNewsModal component
import MassEmailModal from "pages/MassEmail/news/MassEmailModal";
// ... (previous imports)

const NewsListNew = () => {
    const { useApi, isLoading } = useApiHook();
    const [branchModalData, setBranchModalData] = useState([]);
    const [apiData, setApiData] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const navigate = useNavigate();
  
    const openViewModal = (row) => {
      setSelectedNews(row);
      setViewModalOpen(true);
    };
  
    useEffect(() => {
      useApi.get("api/news/get-all").then((response) => {
        setApiData(response);
      });
    }, []);
  
    const updateBranch = () => {
      setApiData(null);
      useApi.get("api/news/get-all").then((response) => {
        setApiData(response);
      });
    };
  
    const dataTableColumns = [  
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
        },
      },
      {
        name: "Title",
        selector: (row) => row.title,
        wrap: true,
        width: "120px",
        sortable: true,
        cell: (row) => (
          <div style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            {row.content}
          </div>
        ),
      },
      {
        name: "Content",
        selector: (row) => row.content,
        wrap: true,
        width: "120px",
        sortable: true,
        cell: (row) => (
          <div style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            {row.content}
          </div>
        ),
      },
      {
        name: "Actions",
        width: "120px",
        cell: (row) => (
          <div className="tb-odr-btns">
            <Button
              color="info"
              size="sm"
              className="btn-icon btn-dim text-stone-500"
              onClick={() => openViewModal(row)}
            >
              <Icon name="eye" />
            </Button>
          </div>
        ),
      },
    ];
  
    return (
      <>
        <Head title="News List" />
        <Content>
          <PreviewCard>
            {apiData ? (
              <ReactDataTable
                data={apiData}
                columns={dataTableColumns}
                expandableRows
                progressPending={isLoading}
                pagination
                paginationRowsPerPageOptions={[10]}
              />
            ) : (
              <div className="d-flex justify-content center">
                {isLoading ? <Spinner color="primary" /> : <h6>Please Check Error</h6>}
              </div>
            )}
          </PreviewCard>
        </Content>
        <ViewNewsModal
           isOpen={isViewModalOpen}
           toggle={() => setViewModalOpen(!isViewModalOpen)}
           newsData={selectedNews}
        />
      </>
    );
  };
  
  export default NewsListNew;
  