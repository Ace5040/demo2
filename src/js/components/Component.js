class Component {
  constructor(dataComponent) {
    this.name = dataComponent.componentName;
    this.parentId = dataComponent.parentId;
    this.props = dataComponent.props;
  }

  _setPropsBeforeCreate(dataComponent) {
    //перезаписываем props из структуры
    const strProps = dataComponent.props;
    this.validateProps.forEach((prop) => {
      // Не учитывает False
      if (strProps[prop]) this.props[prop] = strProps[prop];
    });
  }

  init() {
    return;
  }

  getParentId() {
    return this.parentId;
  }

  getName() {
    return this.name;
  }

  getProps() {
    return this.props;
  }

  setDisabled(disabled) {
    this.props.disabled = !!disabled;
  }

  getValue() {
    return this.props.value;
  }
  setValue(value) {
    this.props.value = value
  }
}

export default Component;
