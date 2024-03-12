import React, { useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { Icon, PreviewCard } from "../../components/Component";
import { AuditonData } from "./AuditionData";
import DataTable from "react-data-table-component";

const SongTrack = ({ ...props }) => {
  const [filteredData, setFilteredData] = useState(AuditonData);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    console.log("Search Term:", searchTerm); // Log the input value to the console
    const filteredSongs = AuditonData.filter((song) =>
      song.userName.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filteredSongs);
  };

  const songColumns = [
    {
      name: "User Name",
      selector: "userName",
      sortable: true,
      cell: (row) => <span>{row.userName}</span>,
    },
    {
      name: "Email",
      selector: "userName",
      cell: (row) => (
        <div className="d-flex">
          <span className="">{row.email}</span>
        </div>
      ),
    },
    // {
    //   name: "Level",
    //   selector: "userName",
    //   cell: (row) => (
    //     <span>
    //       {row.levels}
    //     </span>
    //   ),
    //   maxWidth: "150px",
    // },
    {
      name: "Song",
      selector: "userName",
      cell: (row) => <span><a href="#"><Icon name="play" className="p-1 bg-light rounded" /></a>{row.song}</span>,
    },
    {
        name: "Audition Date",
        selector: "Date",
        cell: (row) => <span>{row.auditionDate}</span>,
    },
  ];

  return (
    <React.Fragment>
      <Head title="Audition" />
      <Content>
        <PreviewCard>
          <DataTable
            data={filteredData}
            columns={songColumns}
            style={{ height: "300px", overflowY: "scroll" }}
            highlightOnHover
            className="nk-tb-list"
            fixedHeader
            pagination
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search with user name"
                className="form-control form-control-sm w-25"
                onChange={handleSearch}
              />
            }
            subHeaderAlign="right"
          ></DataTable>
        </PreviewCard>
      </Content>
    </React.Fragment>
  );
};

export default SongTrack;
