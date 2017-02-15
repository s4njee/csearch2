require('normalize.css/normalize.css');
require('styles/App.css');
var axios = require('axios');
import React from 'react';


class AppComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {searchresults:null, page:0};
          axios.get('http://csearch2.csearch.us:8010/latestbills')
          .then(function(response){
              this.setState({searchresults:response.data});
        console.log(response.data);
          }.bind(this));
        this.handlePage = this.handlePage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
        this.handleHome = this.handleHome.bind(this);
    }
    handleHome(){
        this.setState({page:0})
        this.setState({page:this.state.page});
          axios.get('http://csearch2.csearch.us:8010/latestbills')
          .then(function(response){
              this.setState({searchresults:response.data});
          }.bind(this));
    }
    handlePage(){
        this.state.page = this.state.page+1;
        this.setState({page:this.state.page});
          axios.get('http://csearch2.csearch.us:8010/latestbills?page='+this.state.page)
          .then(function(response){
              this.setState({searchresults:response.data});
          }.bind(this));
    }
    handlePreviousPage(){
        this.state.page = this.state.page>0? this.state.page-1:0;
        this.setState({page:this.state.page});
          axios.get('http://csearch2.csearch.us:8010/latestbills?page='+this.state.page)
          .then(function(response){
              this.setState({searchresults:response.data});
          }.bind(this));
    }
  render() {
      let sr,actions;
      if(this.state.searchresults){
      sr = this.state.searchresults.map(item =>{

          actions = item.actions?item.actions.map(action=>{
              return(
                  <div>
                  <p className="actiondate">{action.acted_at}</p>
                  <p className="actiontext">{action.text}</p>
              </div>
                  )
          }):null
         if(item.bill_type.substring(0,2)=='sr')
          {
              item.bill_id = 'S.Res. ' +item.bill_type.substring(5)+ ' '+item.number;
          }
          else if(item.bill_type.substring(0,3)=='sjr')
          {
              item.bill_id = 'S.J.Res. ' +item.bill_type.substring(6)+ ' '+item.number;
          }
          else if(item.bill_type.substring(0,5)=='sconr')
          {
              item.bill_id = 'S.Con.Res. ' +item.bill_type.substring(8)+ ' '+item.number;
          }
          else if(item.bill_type.substring(0,1)=='s')
          {
              item.bill_id = 'S. ' +item.bill_type.substring(4)+ ' '+item.number;
          }
          else if(item.bill_type.substring(0,2)=='hr')
          {
              item.bill_id = 'H.R. ' +item.bill_type.substring(5)+ ' '+item.number;
          }
          else if(item.bill_type.substring(0,2)=='hj')
          {
              item.bill_id = 'H.J.Res ' +item.bill_type.substring(5)+ ' '+item.number;
          }
          else if(item.bill_type.substring(0,2)=='hc')
          {
              item.bill_id = 'H.Con.Res ' +item.bill_type.substring(8)+ ' '+item.number;
          }
          var baseurl = 'http://api.fdsys.gov/link?collection=bills&billtype='+item.bill_type+'&billnum='+item.number+'&congress='+item.congress
          return(
              <div className="container">

            <a href={baseurl} target="_blank">
                <h4>{item.official_title}</h4></a>
              <p className="text">{actions}</p>
              <p className="text">{item.summary? item.summary.text:null}</p>
              <p className="billid">{item.bill_id}<span className="htmllink"><a href={baseurl+'&link-type=html'}>HTML Link</a></span></p>
          </div>
              );
          },this)}

    return (
      <div className="container">
          <a href='#' onClick={this.handleHome} className="header">      <h1 className="header">Csearch II</h1></a>
          <a href='#' onClick={this.handlePreviousPage} className="previouspage">Previous Page</a>
          <a href='#' onClick={this.handlePage} className="nextpage">Next Page</a>
          {sr}
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
