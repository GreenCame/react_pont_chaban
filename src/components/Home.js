import _ from 'lodash'
import React, { Component } from 'react'
import {
  Container, Header, Input, Image, Menu, Visibility,
} from 'semantic-ui-react'

import DatePicker from './helper/DatePicker';
import ListChaban from './Chaban/List'


/**
 * Copy of Semantic
 * If this is not exercice (and it is) you have to move this ;)
 * start
 */
const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '2em',
  marginTop: '2em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}
/**
 * End
 */

export default class Home extends Component {
  state = {
    //if the user scroll
    menuFixed: false,
    //date
    from : null,
    to : null
  }

  _handleChange = (value, e) => {
    if(~e.id.indexOf('from'))
      this.setState({ from : value })
    else
      this.setState({ to : value })
  }

  //allow to fix or unfix the menu
  stickTopMenu = () => this.setState({ menuFixed: true });
  unStickTopMenu = () => this.setState({ menuFixed: false });

  render() {
    const { menuFixed, overlayFixed, overlayRect } = this.state

    return (
      <div>
        
        {/* Attaching the top menu is a simple operation, we only switch `fixed` prop add add another styles if it has
            gone beyond the scope of visibility
          */}
        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <Menu
            borderless
            fixed={menuFixed && 'top'}
            style={menuFixed ? fixedMenuStyle : menuStyle}
          >
            <Container text>
              <Menu.Item header>
                <Image size='mini' src='/assets/img/logo.png' style={{marginRight : '10px'}}/>
                Pont Chaban
              </Menu.Item>

              <Menu.Item position='right'>
                <DatePicker
                  size='small'
                  id='date_from'
                  label={{ basic: true, content: 'From' }}
                  onChange={this._handleChange}
                  placeholder='From'
                />
                <DatePicker
                  size='small'
                  id='date_to'
                  label={{ basic: true, content: 'To' }}
                  onChange={this._handleChange}
                  placeholder='To'
                />
              </Menu.Item>
            </Container>
          </Menu>
        </Visibility>

        <Container text style={{ marginBottom: '2em'}}>
          <Header as='h1'>Pont Chaban</Header>
          <p>La circulation sur le pont est interrompue environ 2 heures à chaque mouvement du tablier.

Les bateaux au gabarit fluvial peuvent passer le pont Jacques Chaban Delmas à tout moment, sauf lors des mouvements du tablier ou lors du passage d'un grand navire.
Les bateaux au gabarit maritime (voiliers non démattés, grands yachts ...) ne peuvent passer que lorsque le tablier central est levé.</p>
        </Container>

        <Container text>
          <ListChaban from={this.state.from} to={this.state.to}/>
        </Container>
      </div>
    )
  }
}
