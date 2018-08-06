import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCustomerList } from './../actions/customerActions';
import TableHeader from './../components/TableHeader';
import TableItem from './../components/TableItem';
import getDate from './../utils/getDateFormatted';
import loader from './../assets/loader.svg';
import { Growl } from 'primereact/growl';

class CustomerListingPage extends Component {

  constructor() {
    super();
    this.state = {
      customerList: [],
      loading: true,
      page: 1,
      filter: {
        type: 'ALL',
        keyword: ''
      }
    };

    this.onScroll = this.onScroll.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  searchTimeout = null;

  onScroll(e) {
    let table = document.getElementById('scroll-table');

    if (table.offsetHeight + table.scrollTop === table.scrollHeight) {
      if (this.props.customer.totalPateCount > this.state.page) {

        this.setState({
          page: this.state.page + 1
        }, ()=>{
          
            this.setState({ loading: true })
            let listData = {
              page: this.state.page,
              type: this.state.filter.type,
              keyword: this.state.filter.keyword
            }
            this.props.getCustomerList(listData);
        });
      }
    }
  }

  showError(message) {
    this.growl.show({ severity: 'error', summary: 'Error Message', detail: message });
  }

  componentWillReceiveProps(nextProps) {  
    console.log("will recieve", nextProps);
      

    this.setState({ loading: false })

    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/login');
    } else if (nextProps.errors.error) {
      this.showError(nextProps.errors.error.user_message);
    } else {
      this.setState({
        customerList: nextProps.customer.customerList
      })
    }
  }


  componentDidMount() {
    console.log("did mount");
    

    if (this.props.auth.isAuthenticated) {

      let listData = {
        page: 1,
        type: 'ALL',
        keyword: ''
      }

      this.props.getCustomerList(listData);
    } else {
      this.props.history.push('/login');
    }
  }

  onFilterChange(e) {

    var filterType = e.target.name;

    this.setState({
      loading: true,
      page: 1,
      filter: {
        ...this.state.filter,
        [filterType]: e.target.value
      }
    }, () => {    
      if(filterType==="keyword"){
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
          this.filterApplied()          
        }, 500);
      }else{
        this.filterApplied()
      }
    });
  }

  filterApplied() {
    let listData = {
      page: this.state.page,
      type: this.state.filter.type,
      keyword: this.state.filter.keyword
    }

    this.props.getCustomerList(listData, true);
  }

  render() {

    let customerTypes = [{ label: "All Customers", value: "ALL" }, { label: "Loyalty Member", value: "LOYALTY" }, { label: "Non-Loyalty Member", value: "NON_LOYALTY" }];
    let options = customerTypes.map((option) => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))

    const item = this.state.customerList.map((item, i) => {

      item.loyalty_member_since = getDate(item.loyalty_member_since);      

      return <TableItem key={i} item={item}></TableItem>

    }

    );

    return (
      <div>
        <h2>Customer list</h2>
        <div className="row filter-row">
          <div className="col-md-3">
            <select name="type" className="form-control" value={this.state.filter.type} onChange={this.onFilterChange}>
              {options}
            </select>
          </div>
          <div className="col-md-3 search">
            <input type="text" placeholder="Search Customer" name="keyword" className="form-control" value={this.state.filter.keyword} onChange={this.onFilterChange} />
            <i className="fas fa-search"></i>
          </div>
          {this.state.loading? <div className="col-md-3"><img className="loader" src={loader} alt="loader"/></div>: null}
          
        </div>
        <table className="table table-fixed" onScroll={this.onScroll}>
          <thead>
            <TableHeader></TableHeader>
          </thead>
          <tbody id="scroll-table">
            {item.length<1? <tr><td>No data Found</td></tr>:item}
          </tbody>
        </table>
        <Growl ref={(el) => this.growl = el} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    customer: state.customer,
    errors: state.errors
  }
};

export default connect(mapStateToProps, { getCustomerList })(CustomerListingPage);