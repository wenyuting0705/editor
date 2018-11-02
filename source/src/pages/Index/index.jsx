import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

import './index.scss';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
    this.onBoldClick = this.onBoldClick.bind(this);
  }
  onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  render() {
    return (
      <div className='editor-wrap'>
        <div style={{ fontWeight: 'bold' }} onClick={this.onBoldClick}>B</div>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
