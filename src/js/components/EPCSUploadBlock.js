import Component from "./Component";

// import Vue component

class EPCSUploadBlock extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSUploadBlock";
    this.props = {};
    this.validateProps = ["label", "labelRequired", "uploadBtn","correctTypes","uploadedFiles","error","event","openEvent","deleteEvent","dataPopup"];
    this._setPropsBeforeCreate(dataComponent);
  }

  getComponentName() {
    return this.nameTemplate;
  }

  getProps() {
    return this.props;
  }

  setDisabled(disabled) {
    this.props = { disabled, ...this.props };
    this.props.uploadBtn.type = disabled ? "disabled" : 'main'
  }

  setError(error) {
    this.props = { error : error, ...this.props }
    this.props.error = error
  }
  addFiles(file) {
    this.props.error = ""
    this.props.uploadedFiles.push(file)
  }
  getFiles() {
    return this.props.uploadedFiles
  }

  deleteFile(idx) {
    this.props.error = ""
    this.props.uploadedFiles.splice(idx,1)
  }

  setUploadDisabled() {
    let type = this.props.uploadBtn.type
    this.props.uploadBtn.type = type === "disabled" ? "main" : "disabled" 
  }

  clearFiles() {
    this.props.uploadedFiles = []
  }


}

export default EPCSUploadBlock;
