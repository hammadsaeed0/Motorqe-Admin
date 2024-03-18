import React, { useState, useEffect } from "react";
import { Badge, Button } from "reactstrap";
import { BlockDes, BlockHead, BlockHeadContent, BlockTitle, Icon, PreviewCard } from "components/Component";
import EditBranchModal from "./EditUserModal";
import Head from "layout/head/Head";
import Content from "layout/content/Content";
import SwitchButton from "react-js-switch";

const CarList = () => {
  const [branchModalData, setBranchModalData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

  const fetchAPI = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      const response = await fetch("http://34.216.84.212/api/admin/car-status/all-cars", requestOptions);
      const result = await response.text();
      let data = JSON.parse(result);
      // fruits.reverse();
      setData(data?.cars?.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAPI(); // Call the fetchAPI function when the component mounts
  }, []);

  const usersData = [
    { id: 1, username: "JohnDoe", email: "john@example.com", status: true, isEmailVerified: true },
    { id: 2, username: "JaneDoe", email: "jane@example.com", status: false, isEmailVerified: false },
    // Add more users as needed
  ];
  const handleSwitchChange = async (checked) => {
    try {
      // console.log("Checked", checked);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        approved: !checked?.approved,
      });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`http://34.216.84.212/api/admin/car-status/approve-listings/${checked?._id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          fetchAPI();
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openModal = (user) => {
    setBranchModalData(user);
    setModalOpen(true);
  };

  const handleSearch = (value) => {
    setSearchInput(value);
    const filtered = usersData.filter((user) => user.username.toLowerCase().includes(value.toLowerCase()));
    setFilteredData(filtered.length > 0 ? filtered : []);
  };

  return (
    <>
      <Head title="Cars List" />
      <Content>
        <BlockHead size="sm">
          <BlockTitle>Cars</BlockTitle>
          <BlockDes>Manage your Cars</BlockDes>
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
                    <th>Image</th>
                    <th>Title</th>
                    <th>Model</th>
                    <th>Vehicle Condition</th>
                    <th>Approved</th>
                    <th>Sold</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.length > 0 ? data : data).map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={user.car_images[0]}
                          alt="User Image"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                        />
                      </td>
                      <td>{user.title}</td>
                      <td>{user.model}</td>
                      <td>{user.vehicle_category}</td>
                      <td>
                        <Badge color={user.approved ? "success" : "danger"}>{user.approved ? "True" : "False"}</Badge>
                      </td>
                      <td>
                        <Badge color={user.sold ? "success" : "danger"}>{user.sold ? "True" : "False"}</Badge>
                      </td>
                      <td>
                        {/* <Button color="primary" size="sm" onClick={() => openModal(user)}>
                          <Icon name="edit" />
                        </Button> */}
                        <SwitchButton
                          value={user?.approved} // Assuming you have a property 'switchState' in your user object
                          onChange={(checked) => handleSwitchChange(user)}
                        />
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
        <EditBranchModal isOpen={isModalOpen} toggle={() => setModalOpen(!isModalOpen)} branchData={branchModalData} />
      </Content>
    </>
  );
};

export default CarList;
