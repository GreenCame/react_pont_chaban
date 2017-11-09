import React, { Component } from 'react';
import {
  Dimmer, Loader, Image
} from 'semantic-ui-react'

class ParagraphLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
        active : this.props.active || true
    }
  }

  render() {
    return (
        <div>
           { this.props.active? 

            <div>
              <Dimmer active inverted>
              <Loader content='Loading' />
              </Dimmer>

              <Image src='/assets/img/short-paragraph.png' />
            </div>

            : 

            this.props.children
          }
        </div>
    );
  }
}

export default ParagraphLoader ;
