import React from "react";
import DashboardLayout from "../../Layout";
import { TableStyle } from "./Table.style";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <TableStyle>
        <h1>Tablee</h1>
        <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <th style={{ width: "40%" }} className="col">
                Toliq ismi
              </th>
              <th style={{ width: "30%" }} className="col">
                Login
              </th>
              <th style={{ width: "30%" }} className="col">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: "40%" }} className="col">
                Fullname
              </td>
              <td style={{ width: "30%" }} className="col">
                Username
              </td>
              <td style={{ width: "30%" }} className="col">
                <div className="btns">
                  {/* <IconButton
                        style={{ background: "rgb(253, 181, 40, 0.12)" }}
                        onClick={() => handleEdit(obj)}
                      >
                        <EditIcon />
                      </IconButton> */}
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ width: "40%" }} className="col">
                Fullname
              </td>
              <td style={{ width: "30%" }} className="col">
                Username
              </td>
              <td style={{ width: "30%" }} className="col">
                <div className="btns">
                  {/* <IconButton
                        style={{ background: "rgb(253, 181, 40, 0.12)" }}
                        onClick={() => handleEdit(obj)}
                      >
                        <EditIcon />
                      </IconButton> */}
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ width: "40%" }} className="col">
                Fullname
              </td>
              <td style={{ width: "30%" }} className="col">
                Username
              </td>
              <td style={{ width: "30%" }} className="col">
                <div className="btns">
                  {/* <IconButton
                        style={{ background: "rgb(253, 181, 40, 0.12)" }}
                        onClick={() => handleEdit(obj)}
                      >
                        <EditIcon />
                      </IconButton> */}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </TableStyle>
    </DashboardLayout>
  );
};

export default Dashboard;
