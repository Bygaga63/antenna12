import React from "react";
import Spinner from "../components/Spinner";
import {getUsers} from "../actions/userActions";
import {getBreakdownTypes} from "../actions/breakdownTypeActions";
import {getAreas} from "../actions/areaActions";
import {connect} from "react-redux";

import PropTypes from "prop-types";
import DataList from "../components/DataList";

const listWithData = (Component, type) => {
  class WithData extends React.Component {
    componentDidMount() {
      const {getData} = this.update();
      getData();
    }

    update() {
      const {getAreas, getBreakdownTypes, getUsers, area, breakdownType, users} = this.props;
      let getData = null;
      let data = null;

      switch (type) {
        case "fullName":
          getData = getUsers;
          data = users;
          break;
        case "caption":
          getData = getAreas;
          data = area;
          break;
        case "type":
          getData = getBreakdownTypes;
          data = breakdownType;
          break;
        default:
          return null;
      }
      return {data, getData}
    }

    render() {
      const {data} = this.update();
      if (data.length) {
        return <Component {...this.props} data={data} type={type}/>

      }
      return <Spinner/>
    }
  }

  WithData.propTypes = {
    getUsers: PropTypes.func.isRequired,
    getAreas: PropTypes.func.isRequired,
    getBreakdownTypes: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    breakdownType: PropTypes.array.isRequired,
    area: PropTypes.array.isRequired
  };

  const mapStateToProps = ({users, breakdownType, area}) => ({
    users, breakdownType, area
  });

  return connect(
    mapStateToProps,
    {getUsers, getAreas, getBreakdownTypes}
  )(WithData);
};


export const UserList = listWithData(DataList, "fullName")
export const AreaList = listWithData(DataList, "caption")
export const BreakdownTypeList = listWithData(DataList, "type")


