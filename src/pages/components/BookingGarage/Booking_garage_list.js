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
import Head from "layout/head/Head";
import Content from "layout/content/Content";
import axios from "axios";
import { useEffect, useState } from "react";

const Booking_garage_list = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [branchModalData, setBranchModalData] = useState(null);

  const [garage, setGarage] = useState([]);
  var base_origin = window.location.origin;

  useEffect(() => {
    // Fetching garage data
    axios.get("http://34.216.84.212/api/users/garages/get-pending-booking")
      .then(res => {

        console.log(res.data);
        setGarage(res.data.garage);
      })
      .catch(error => {
        console.log(error);
      });

  
  }, []);

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
              <BlockTitle page>Garage Booking</BlockTitle>
              <BlockDes className="text-soft">Manage your Garage Booking</BlockDes>
            </BlockHeadContent>
            {/* <Link to={`http://localhost:3000/garage-dashboard/GarageDetails-upload`}>
              <Button color="primary">
                <span>Add Garage</span>
              </Button>
            </Link> */}
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
                {garage.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <Badge color={user.status ? "success" : "danger"}>{user.status ? "Active" : "Inactive"}</Badge>
                    </td>
                    <td>
                      <Badge color={user.isEmailVerified ? "success" : "danger"}>
                        {user.isEmailVerified ? "Verified" : "Not Verified"}
                      </Badge>
                    </td>
                    <td>
                      <Button color="primary" size="sm" onClick={() => openModal(user)}>
                        <Icon name="edit" className={" text-black"} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PreviewCard>
      </Content>
    </>
  );
};

export default Booking_garage_list;