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

const ListGarage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [branchModalData, setBranchModalData] = useState(null);

  const [garage, setGarage] = useState([]);
  var base_origin = window.location.origin;

  useEffect(() => {
    // Fetching garage data
    axios.get("http://34.216.84.212/api/users/get-all-garage")
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
              <BlockTitle page>Garage</BlockTitle>
              <BlockDes className="text-soft">Manage your Garage</BlockDes>
            </BlockHeadContent>
            <Link to={`http://localhost:3000/garage-dashboard/GarageDetails-upload`}>
              <Button color="primary">
                <span>Add Garage</span>
              </Button>
            </Link>
          </BlockBetween>
        </BlockHead>

        <PreviewCard>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Garage name</th>
                  <th>Email</th>
                  <th>Mobile</th>
               
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {garage.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.garageName}</td>
                    <td>{user.email}</td>
                    <td>{user.mobileGarage}</td>
                    
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

export default ListGarage;