<template>
  <div class="main-form__inputs epcs-components">
    <div
      v-for="tplComponent in formVue"
      :key="tplComponent.id"
      :class="`CUSTOM-${tplComponent.component.getComponentName()}`"
    >
      <component
        :is="tplComponent.component.getComponentName()"
        :data="tplComponent.component.getProps()"
        :components="tplComponent.components"
        :class="'epcs-components'"
        @update:data="tplComponent.component.setValue($event)"
        @hook:mounted="initComponent(tplComponent.component)"
      />
    </div>
  </div>
</template>

<script>
import logicHub from "../logic/logicHub";

import {
  EPCSButton,
  EPCSButtonGroup,
  EPCSButtonTittleBar,
  EPCSColumn,
  EPCSDataGrid,
  EPCSFooter,
  EPCSFormHeader,
  EPCSFormInput,
  EPCSIconButton,
  EPCSMenuButton,
  EPCSMenuButtonList,
  EPCSMenuCard,
  EPCSPdfPopup,
  EPCSPopup,
  EPCSPopupMenu,
  EPCSRadioButtonGroup,
  EPCSRow,
  EPCSUploadButton,
  EPCSDirection,
  EPCSMap,
  EPCSAccordion,
  EPCSCheckbox,
  EPCSTabs,
  EPCSJoystick
} from "epcs-storybook";

export default {
  name: "FormTemplate",
  components: {
    EPCSButton,
    EPCSButtonGroup,
    EPCSButtonTittleBar,
    EPCSColumn,
    EPCSDataGrid,
    EPCSFooter,
    EPCSFormHeader,
    EPCSFormInput,
    EPCSIconButton,
    EPCSMenuButton,
    EPCSMenuButtonList,
    EPCSMenuCard,
    EPCSPdfPopup,
    EPCSPopup,
    EPCSPopupMenu,
    EPCSRadioButtonGroup,
    EPCSRow,
    EPCSUploadButton,
    EPCSDirection,
    EPCSAccordion,
    EPCSMap,
    EPCSCheckbox,
    EPCSTabs,
    EPCSJoystick
  },
  props: {
    formVue: {
      required: true,
    },
    form: {
      required: true,
    },
    formPopups: {
      required: false,
    },
    disabled: {
      required: false,
    },
  },
  computed: {},
  data() {
    return {
      testTemplate: null,
      logicForTpl: null,
    };
  },
  beforeMount() {
    // This method of import bussines logic
    this.initLogic();
  },
  watch: {
    formVue: {
      handler(val, old) {
        // this.$bus.$off("openDisp")
        this.initLogic();
        // do stuff
      },
      //  deep: true
    },
  },
  created() {},
  mounted() {
    console.log("TEMPLATE: ", this.formVue);
    console.log("TEMPLATE: ", this.form);
    console.log("Popups: ", this.formPopups);
  },
  // beforeUpdate() {
  //   // this.initLogic();
  // },
  methods: {
    initComponent(component) {
      component.init();
    },
    initLogic() {
      Window.ctx = this;
      let formName = this.form.getFormName(),
        logics = logicHub[formName];
      if (logics) {
        Object.entries(logics).forEach((logic) => {
          let name = `logicFor${logic[0]}`;
          this._data[name] = new logic[1](this.form, this, this.formPopups);
        });
      }
      this.offDoublesEvents();
    },
    offDoublesEvents() {
      let events = this.$bus._events;
      Object.keys(events).forEach((eventItem) => {
        let event = events[eventItem];
        if (event && event.length > 1) {
          for (let i = 0; i < event.length - 1; i++) {
            if (i !== event.length - 1) {
              event.shift();
            }
          }
        }
      });
    },
  },
};
</script>

<style scoped>
</style>