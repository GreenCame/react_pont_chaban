import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ParagraphLoader from './ParagraphLoader';
import ApiChaban from '../helper/APIChaban';
import moment from 'moment';
import 'moment/locale/fr';

import {
  Segment, Button, Grid, Image, Menu, Header, Label, Message, Radio
} from 'semantic-ui-react'

class Detail extends Component {
  constructor(props) {
    super(props);

    //avoid duplicate
    let id = parseInt(this.props.match.params.id);
    this.datas = this.props.data;

    this.state = {
        //The data can be send as props
        //if not the request will be send to he API
        data : this.datas && this.datas[id - 1] ? this.datas[id - 1] : null,
        //save the ID
        id : id,
        //loading
        loading : true,
        //bonus
        onlyByProps : false,//if false all ID will be call via API except the firt one
        info : '?'
    }

    //If no data with have to call the api
    if(!this.state.data) {
      this.getData(this.state.id);
    } else {
      this.state.loading = false;
      this.state.info = 'Props';
    }
  }

  //if the path change
  componentWillReceiveProps(newProps) {
    let id = parseInt(newProps.match.params.id);

    if(id === this.state.id) return;//check

    this._handleGet(id);
  }
  
  _handleGet = (id) => {
    if(!this.state.onlyByProps) {
      this.getData(id);
    } else {
      this.setState({
        data : this.datas && this.datas[id - 1] ? this.datas[id - 1]: null,
        id : id,
        info : 'Props'
      })
    }
  }

  getData(id){
    this.setState({
      loading : true,//loading
      info : '?'
    });

    ApiChaban.getId(id).then((res) => {
      if(res.success)
        this.setState({id : id})

      this.setState({ api : res, data : res.data.item, loading: false, info : 'API'})
    });
  }

  isMaintenance(){//helper
    if(!this.state.data)
      return false

    return this.state.data.reason === "MAINTENANCE"
  }

  findPicture(name){
    return '/assets/img/' + (this.isMaintenance() ? 'maintenance' : 'sailing-ship') + '.svg'
  }

  _handleChange = () => {
    this.setState({ onlyByProps : !this.state.onlyByProps })
    //setTimeout(this._handleGet(this.state.id), 20);
  }

  render() {
    return (
      <div>
        <Menu attached='top'>
          <Menu.Item>
            <Button basic disabled={ this.state.id === 1 } as={ Link } to={ '/chaban/' + ( this.state.id - 1 ) } icon='chevron left' />
          </Menu.Item>

          <Menu.Item>
            <Button basic disabled={ ( !this.state.data || (this.datas.length <= this.state.id && this.state.onlyByProps)) } as={ Link } to={ '/chaban/' + (this.state.id + 1 ) } icon='chevron right' />
          </Menu.Item>

          <Menu.Item>
            API ? <Radio toggle checked={!this.state.onlyByProps} onChange={this._handleChange}/>
          </Menu.Item>
          <Menu.Item>
            Data receive from { this.state.info }
          </Menu.Item>

          <Menu.Menu position='right'>         
            <Menu.Item as={ Link } to={ '/chaban' }>
            Back
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Segment attached="bottom" color={ this.isMaintenance() ? "red" : "orange"}> 
          <ParagraphLoader active={ this.state.loading }>
            { this.state.data ?

            <Grid>
              <Grid.Column width={4} style={{padding : '3em'}}>
                <Image  src={ this.findPicture( this.state.data.reason ) } />
              </Grid.Column>
              <Grid.Column width={11}>
                <Header size='large'> { this.state.data.reason }
                  { this.state.data.id === 1 ? <Label style={{marginLeft: '20px'}} as='a' color='red' tag>Upcoming</Label> : '' }
                </Header>
                <p style={{textAlign : 'justify'}}>
                  Le pont Jacques Chaban Delmas sera fermé à la circulation le { moment(this.state.data.date, "DD-MM-YYYY", 'fr').format('dddd DD MMMM') } de { this.state.data.start } à { this.state.data.end } pour { !this.isMaintenance() ? 'le passage du ' + this.state.data.reason : this.state.data.reason }. Durant cette fermeture { this.state.data.totale ? 'totale' : 'partielle' } , nous vous conseillons d'emprunter les autres itinéraires de franchissement de la Garonne.
                </p>
                <Button as='a' floated="right" href={ this.state.data.link } >Information</Button>
              </Grid.Column>
            </Grid>

            : 
            <Message negative>
                <Message.Header>We're sorry there is a problem with Pont-chaban API</Message.Header>
                <p>{ this.state.api ? this.state.api.error : 'Unknow error' }</p>
            </Message>
            }
          </ParagraphLoader>
        </Segment>
      </div>
    );
  }
}

export default Detail ;
