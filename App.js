import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";


window.id = 0;
class BookReader extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      actPageno: 1
    }
    // mock API created
    this.apiUrl = 'https://5c1b6b75e193d000132a7432.mockapi.io/api/v1/bookList/books'
  }
  // Lifecycle method
  componentDidMount(){
    // Make HTTP reques with Axios
    axios.get(this.apiUrl+'?page=1&limit=10')
      .then((res) => {
        // Set state with result
        this.setState({data:res.data});
      });
  } 

  // Page change with pagination Control
  handlePageChange(pageNumber) {
    axios.get(this.apiUrl+'?page='+pageNumber+'&limit=10')
      .then((res) => {
        this.setState({data: remainder});
      })
  }

  //handletoSerachBook
  handleSearchBook(id){
    axios.get(this.apiUrl+'/'+id)
      .then((res) => {
        this.setState({data: remainder});
      })
  }

  render(){
    // Render JSX
    let input;
    return (
      <div>
      <div className="row">
      <div className="col-md-11">
        <input className="form-control" placeholder="Search" name="srch-term" id="srch-term" type="text" ref={node => {
        input = node;
      }} />
        </div>
        <div className="col-md-1">
        <button className="btn btn-default" type="submit" onClick={(e) => {
        e.preventDefault();
        this.handleSearchBook(input.value);
      }}><i class="glyphicon glyphicon-search"></i></button>
          </div>
      </div>
      <div className="bookList">
        { this.state.data.map((item, key) => (
          <div className="bookList">
          <tr key={[item.id, '_', key]}>
          <td>
            <img src={item.bookImg} height="150px" width="150px" />
          </td>
          <td className="bookDesc">
            {item.bookTitle}
            <br />
            {item.bookDescription}
            <br />
            Author: {item.Author}
          </td>
          </tr>
          </div>
        ))}
        </div>
        <div>
        <Pagination
          activePage={this.state.actPageno}
          itemsCountPerPage={1}
          totalItemsCount={6}
          pageRangeDisplayed={6}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
      </div>
    );
  }
}
render(<BookReader />, document.getElementById('container'));