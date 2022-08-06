import moment from "moment";
import notify from "devextreme/ui/notify";

/**
 * @class ShipDetailForm - класс логики детальной карточки судна
 */
class ShipDetailForm {
  constructor(form, Vue) {
    this.form = form;
    this.$Vue = Vue;
    this.metaData = form.metaData;
    this.isNewForm = this.metaData.id === undefined;
    this.redux = this.$Vue.$redux.storeRedux;
    this.formData = {};
    //обьек для сохранения активной информации об удалении файла (до появления попап окна)
    this.activeUploadBlock = {};
    Vue.$bus.$on("saveShip", () => this.saveShip());
    Vue.$bus.$on("fillShip", (data) => this._getShip(data.value));
    Vue.$bus.$on("uploadFiles", (data) => this.addFiles(data));
    Vue.$bus.$on("deleteFile", (data) => this.deleteFile(data));
    Vue.$bus.$on("checkFilePopup", (data) => this.checkDeleteFile(data));
    Vue.$bus.$on("checkShipSave", () => this.checkShipSave());
    Vue.$bus.$on(["getAsyncShip", "getAsyncIceClasses", "getAsyncFlags", "getAsyncShipTypes","getAsyncImo"], (data) =>
      this._getSelectData(data)
    );

    this.setDisabled(this.metaData.disabled);
    this._getShip();
    if (this.isNewForm) this._clearUploadFiles();
  }

  _getSelectData(data) {
    let asyncName = this.getStoreName(`async${data.asyncSetting.asyncName}`);
    //формируем строку с названием action (пример iceClass -> getIceClass)
    this.$Vue.store.dispatch(asyncName).then(() => {
      //получаем данные из геттера
      let asyncData = this.$Vue.store.getters[asyncName];
      this.$Vue.$bus.$emit(`putAsync${data.asyncSetting.asyncName}`, asyncData);
    });
  }

  _getShip(lastId) {
    const id = lastId ? lastId : this.metaData.id;
    if (id) {
      this.redux.dispatch(this.$Vue.$redux.functions.epcsGeneralOperations.asyncGetShipById(id)).then(()=> {
        const ship = this.$Vue.$redux.storeRedux.getState().nlcEpcsPortal.ship;
        if (ship) {
          this.fillForm(ship);
        }
      })
    }
  }

  _clearUploadFiles() {
    this.form.components.forEach((component) => {
      const componentName = component.component,
        element = this.form.getComponentByName(component.componentName).component;
      if (componentName === "EPCSUploadBlock") element.clearFiles();
    });
  }

  fillForm(ship) {
    if (ship) {
      this.form.components.forEach((component) => {
        const name = component.componentName,
          componentName = component.component,
          element = this.form.getComponentByName(name).component;
        if (name.substr(0, 4) === "EPCS") return;
        element.setValue(null);     
        if (name === "flagId" && ship.flag) return element.setValue(ship.flag.isoCountryCode)
        if (name === "shipTypesId") return  element.setValue(ship.shipType.name);
        if (componentName === "EPCSUploadBlock") return element.clearFiles();
        element.setValue(ship[name]);
      });
    }
  }

  setDisabled(idDisabled) {
    this.form.components.forEach((component) => {
      const name = component.componentName;
      this.form.getComponentByName(name).component.setDisabled(idDisabled);
    });
  }
  //добавляем файлы в блок загрузки
  addFiles(data) {
    const file = data.file.value[0],
      formName = data.formName,
      uploadBlock = this.form.getComponentByName(formName).component,
      correctType = this.checkFormat(file.name, uploadBlock.props.correctTypes),
      isCertificate = formName.includes("Certificate");
    uploadBlock.setError(correctType ? "" : "Неверный формат файла");
    if (correctType) uploadBlock.addFiles(file.name);
    if (isCertificate) this.checkCertificate(formName);
  }

  //удаляем файлы из блока загрузки
  deleteFile() {
    if (this.activeUploadBlock) {
      let { idx, formName } = this.activeUploadBlock,
        isCertificate = formName.includes("Certificate"),
        uploadBlock = this.form.getComponentByName(formName).component;
      uploadBlock.deleteFile(idx);
      if (isCertificate) this.checkCertificate(formName);
    }
  }

  checkCertificate(formName) {
    //эта конструкция позволяет нам работать со связанными блоками. В структуре они названы certificate и certificate1
    let boundForm = this.form.getComponentByName(
      formName === "uploadCertificate" ? `${formName}1` : "uploadCertificate"
    ).component;
    boundForm.setUploadDisabled(true);
  }

  checkFormat(name, correctTypes) {
    let typeArr = name.split("."),
      type = typeArr[typeArr.length - 1];
    return correctTypes.includes(type);
  }

  checkDeleteFile(data) {
    this.activeUploadBlock = data;
    this.$Vue.$bus.$emit("deleteFilePopup");
  }

  saveShip() {
    //Забираем заполненную форму которая пришла с бэка (мы ее сохранили в стор)
    // Забираем все value и с  помощью id клонируем обьект и отправляем его на сохранение
    const { id, nameForm, nameEvent } = this.metaData;
    const formForSave = { ...this.$Vue.store.getters[this.getStoreName("shipForm")] };
    this.formData = formForSave;
    this.formData.createDate = moment().toJSON();
    let checkForms = {
      form: this._checkForm(),
      docs: this._checkDocs(),
    };
    //удаляем возможно незаполненные строки( без которых не пройдет сохранение)
    for(let key in this.formData) {
      if(this.formData[key] === null) delete this.formData[key]
    }

    switch (true) {
      case !checkForms.docs && !checkForms.form:
        notify(
          {
            message: `Заполните все необходимые поля и загрузите необходимые 
        документы`,
            width: 400,
            shading: true,
          },
          "error",
          2500
        );
        break;
        break;
      case !checkForms.docs: {
        notify(
          {
            message: `Обязательные документы не загружены. Вы можете сохранить черновик
         и вернуться к его заполнению позже`,
            width: 400,
            shading: true,
          },
          "error",
          2500
        );
        break;
      }
      case !checkForms.form: {
        notify(
          {
            message: `Обязательные поля не заполнены. Вы можете сохранить черновик и 
        вернуться к его заполнению позже`,
            width: 400,
            shading: true,
          },
          "error",
          2500
        );
        break;
      }
      default:
        let payload = {
          nameEvent,
          nameForm,
          id,
          formData: this.formData,
        };
        this.$Vue.store.dispatch(this.getStoreName("saveShip"), payload).then((res) => {
          this.$Vue.$bus.$emit("clearShipFilter")
          this._clearSorting();
          this.$Vue.$bus.$emit("goToMainShipPage");
        });
        break;
    }
  }

  _clearSorting() {
    const sort = JSON.parse(localStorage.getItem("ShipsDataGrid"));
    if (sort) localStorage.removeItem("ShipsDataGrid");
  }

  _checkForm() {
    let checkForm = true;
    this.form.components.forEach((component) => {
      let name = component.componentName,
        componentName = component.component,
        value;
      if (name.substr(0, 4) === "EPCS") return;
      if (componentName === "EPCSUploadBlock") return;
      try {
        value = this.form.getComponentByName(name).component.getValue();
      } catch (e) {
        throw new Error("not value");
      }

      if (value || value === 0 || value == false) {
        switch (name) {
          case "name":
            this.formData.name = typeof value === "object" ? value.name : value;
            break;
          case "imo":
            this.formData.imo = typeof value === "object" ? value.imo : value;
            break;
          case name.toLowerCase().includes("date"):
            this.formData[name] = moment(value).toJSON();
            break;
          default:
            this.formData[name] = value;
            break;
        }
      } else {
        if (component.props.labelRequired) checkForm = false;
      }
    });
    return checkForm;
  }

  _checkDocs() {
    let checkDocs = true;
    this.form.components.forEach((component) => {
      let componentName = component.component;
      if (componentName === "EPCSUploadBlock" && component.props.labelRequired) {
        let files = this.form   .getComponentByName(component.componentName).component.getFiles(),
          isUploadedFiles = !!files.length;
        if (!isUploadedFiles) checkDocs = false;
      }
    });
    return checkDocs;
  }

  checkShipSave() {
    //Если форма заблокирована, нам не надо вызывать модальное окно т.к. изменений нет
    let isDisabled = this.metaData.disabled;
    this.$Vue.$bus.$emit(isDisabled ? "goToMainShipPage" : "changeShipDataPopup");
  }
  _getIceClasses() {
    this.$Vue.store.dispatch(this.getStoreName("getIceClasses")).then(() => {
      let iceClasses = this.$Vue.store.getters[this.getStoreName("iceClasses")];
    });
  }

  getStoreName(name) {
    return `shipsStore/${name}`;
  }
}

export default ShipDetailForm;
