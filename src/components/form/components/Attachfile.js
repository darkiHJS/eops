import react, { Component } from 'react'
import { Toast, ImagePicker, List, WhiteSpace } from 'antd-mobile';

export default class Attachfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: []
    }
    this.handleImageLoad.bind(this)
    window.handleImageLoad = this.handleImageLoad
  }
  addImageClick(e) {
    if( window.Toast) {
      e.preventDefault();
      window.Toast.postMessage("JS调用了Flutter");
    }
  }
  handleImageLoad = (img) => {
    this.setState({
      files: this.state.files.concat({
        url: 'data:image/png;base64,' + img,
        id: '3',
      }),
    });
    this.props.cb(this.state.files)
  }
  filesChange= (img, type, index) => {
    this.setState({
      files: img,
    });
    this.props.cb(img)
  }
  render() {
    if (this.props.showModel) {
      return (<div>图片展示</div>)
    }
    return (
      <>
        <List renderHeader={() => '上传图片'}>
          <List.Item>
            <ImagePicker
              files={this.state.files}
              selectable={this.state.files.length < 7}
              multiple={true}
              onChange={this.filesChange}
              onAddImageClick={this.addImageClick}
            />
          </List.Item>
        </List>
        <WhiteSpace size='md' />
      </>
    )
  }
}