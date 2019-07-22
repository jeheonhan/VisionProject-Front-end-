import React from 'react';
import CKEditor from 'react-ckeditor-component';


class CK extends React.Component {
    constructor(props) {
      super(props);
      this.updateContent = this.updateContent.bind(this);
      this.state = {
        content: '',
      }
    }
  
    updateContent(newContent) {
      this.setState({
        content: newContent
      })
    }
  
    onChange(evt) {
      const newContent = evt.editor.getData();
      this.setState({
        content: newContent
      })
    }
  
    onBlur(evt) {
      console.log('onBlur event called with event info: ', evt);
    }
  
    afterPaste(evt) {
      console.log('afterPaste event called with event info: ', evt);
    }
  
    render() {
      return (
        <div>
          <div className="jr-card">
            <CKEditor
            config={{
              height: 500,
          }}
              activeClass="p10"
              content={this.props.content}
              events={{
                'blur': this.onBlur.bind(this),
                'afterPaste': this.afterPaste.bind(this),
                'change': this.props.handleForm
              }}
            />
          </div>
        </div>
      )
    }
  }
  
  export default CK;
  