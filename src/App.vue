<template>
  <div id="app-epcs-dispatching" class="epcs-dispatching">
    <FormTemplate
      :formVue="formsForTpl"
      :form="formByName"
      :formPopups="formPopups"
      :key="updateKey"
    ></FormTemplate>
    <!-- <button @click='test'>test</button> -->
  </div>
</template>

<script>
import Application from "./js/application/Application";
import allStructures from "./js/structureTemplates/allStructures";
import allPopupStructures from "./js/structureTemplates/popup/allPopupStructures";
import FormTemplate from "./components/FormTemplate";
import axios from "axios";
export default {
  name: "App",
  props: {
    store: {
      required: true,
    },
    eventBus: {
      required: true,
    },
  },
  components: {
    FormTemplate,
  },
  data() {
    return {
      application: null,
      formController: null,
      structureController: null,
      allStructures,
      formsForTpl: null,
      forTpl: null,
      formByName: null,
      updateKey: 0,
      allPopupStructures,
    };
  },
  beforeMount() {
    //Создаем новое приложение и передаем туда все структуры
    const structures = {
      allStructures: this.allStructures,
      allPopupStructures: this.allPopupStructures,
    };
    this.application = new Application(structures);
    // this.getComponent({ nameForm : "EnterSeePort" });

    // this.getComponent({nameForm :"EnterDispAqua"});
    // this.getComponent({nameForm :"ExitDispAqua"});
    // this.getComponent({nameForm :"CreateDispAqua"});
    // this.getComponent({nameForm :"ExitSeePort"});
    // this.getComponent({nameForm :"EnterSeePort"});
    // this.getComponent({ nameForm : "SwimDispAqua" });
     this.getComponent({ nameForm: "MainForm" });
    // this.getComponent({ nameForm: "ShipsForm" });
    // this.getComponent({ nameForm: "PhotoDisp" });
    // this.getComponent({ nameForm: "ShipsDetailForm" });

    //Шина событий для DISPS
    this.$bus.$on("goToMainPage", () => this.getComponent({ nameForm: "MainForm" }));
    //Шина событий для SHIPS
    this.$bus.$on("addNewShip", () => this.getComponent({ nameForm: "ShipsDetailForm" }));
    this.$bus.$on("goToMainShipPage", () =>this.getComponent({ nameForm: "ShipsForm" }));
    // бас который открывает форму.
    this.$bus.$on("getComponent", (e) => this.getComponent(e));
  },
  methods: {
    getComponent(data) {
      // запрашивает структуру необходимой нам формы
      this.formByName = this.application.getFormByName(data.nameForm, data);
      // запрашивает структуры всех попапов
      this.formPopups = this.application.getAppAllPopupForms();
      //Генерируем компоненты нужной формы
      this.formsForTpl = this.formByName.getFormForVue();
    },
  },
  beforeDestroy() {
    this.$bus.$off("addNewShip");
    this.$bus.$off("backPage");
    this.$bus.$off("goToMainShipPage");
    this.$bus.$off("goToMainPage");
  },
};
</script>
<style lang="scss" >
@import "./scss";
</style>
