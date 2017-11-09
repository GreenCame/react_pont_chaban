import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import ApiChaban from '../helper/APIChaban';
import Detail from './Detail';
import ParagraphLoader from './ParagraphLoader';
import {
    Grid, Segment, Button, Image, List, Message
  } from 'semantic-ui-react'
import moment from 'moment';
import 'moment/locale/fr';

class ListChaban extends Component {
    constructor(props) {
        super(props);

        this.state = {
            api : {},
            loading : true,
            from : null,
            to : null
        }

        this.getData(this.props.from, this.props.to);
    }

    //if the date change
    componentWillReceiveProps(props) {
        //if nothing change
        if(this.state.from === props.from && this.state.to === props.to) return;

        //data
        this.getData(props.from, props.to);
    }
        

    getData(from, to, repeated = 0) {
         //loading
         this.setState({loading : true});
         
        //call
        ApiChaban.getList(from, to).then((res) => {
            if(!res.success && repeated < 10 && from === this.state.from && to === this.state.to)
                setTimeout(this.getData(from, to, repeated++), 1000);
            if(res.success)
                this.setState({from: from, to : to})
            
            this.setState({api : res, loading : false})
        });
    }

    findPicture(name){
        return '/assets/img/' + (name === "MAINTENANCE" ? 'maintenance' : 'sailing-ship') + '.svg'
    }

    render() {
        return (
            <div>
                <Segment piled> 
                    <ParagraphLoader active={ this.state.loading } >
                        {   this.state.api && this.state.api.success ?
                                this.state.api.data.length > 0 ?
                                    <List divided verticalAlign='middle'>
                                        { this.state.api.data.map( (d, i) => 
                                            <List.Item key= { i } style={{padding: "1em"}}>
                                                <List.Content floated='right' style={{margin: "0.5em"}}>
                                                    <Button as={Link} to={ '/chaban/' + d.id } >Voir</Button>
                                                    {/*<Grid divided='vertically'>
                                                        <Grid.Row columns={2}>
                                                            <Grid.Column>
                                                                <Image size="mini" style={{width:'25px'}} src="/assets/img/car.svg"/>                                                                                                                                
                                                            </Grid.Column>
                                                            <Grid.Column style={{padding:'0px'}} >
                                                                <Image size="mini" style={{width:'13px', paddingTop: '5px'}} src={"/assets/img/"+ ( d.totale ? 'close' : 'tick' ) +".svg"}/>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>*/}
                                                </List.Content>
                                                <Image avatar src={ this.findPicture( d.reason ) } />
                                                <List.Content>
                                                    { d.reason.toLowerCase() }
                                                </List.Content>
                                                <List.Content style={{color:'grey', margin: "1em"}}>
                                                    { moment(d.date, "DD-MM-YYYY", 'fr').format('dddd DD MMMM') } - de {d.start} à {d.end}
                                                    <Image size="mini" style={{width:'25px', marginLeft: '2em', display:'inline-block'}} src="/assets/img/car.svg"/>
                                                    <Image size="mini" style={{width:'13px', paddingTop: '2px', display:'inline-block'}} src={"/assets/img/"+ ( d.totale ? 'close' : 'tick' ) +".svg"}/>
                                                </List.Content>
                                            </List.Item>
                                        )}
                                    </List>
                                :                                
                                <p>Aucune date pour la durée selectionnée !</p>
                            :
                            <Message negative>
                                <Message.Header>We're sorry there is a problem with Pont-chaban API</Message.Header>
                                <p>{ this.state.api && this.state.api.error ? this.state.api.error : 'Error unknown' }</p>
                            </Message>
                        }
                    </ParagraphLoader>
                </Segment>

                { !this.state.loading && this.state.api && this.state.api.data ?
                    <Route path='/chaban/:id' render={(props) => ( <Detail {...props} data={this.state.api.data} /> )}/>
                    : null}
            </div>
        );
    }
}

export default ListChaban ;
