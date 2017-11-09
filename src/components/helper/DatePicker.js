import React, { Component } from 'react';
import { Input } from 'semantic-ui-react'
import $ from 'jquery';
//import 'jquery-ui';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/datepicker.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/datepicker';


export default class DatePicker extends React.Component {
  componentDidMount() {
    $('#'+this.props.id).datepicker({ dateFormat: 'dd-mm-yy', onSelect : this.props.onChange });
  }

  componentWillUnmount() {
    $('#'+this.props.id).datepicker('destroy');
  }

  render() {
    const props = this.props;
    return (
      <div className="ui left icon input">
        <input type="text" {...props} />
        <i className="calendar icon"></i>
      </div>
    );
  }
}