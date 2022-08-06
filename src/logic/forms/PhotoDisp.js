// Тут пишем бизнес-логику, в зависимости от того что нам нужно
// соблюдая паттерны проектирования.

class PhotoDisp {
  constructor(form, Vue, popups) {
    this.form = form;
    this.$Vue = Vue;
    this.formName = this.form.name;
  }

}

export default PhotoDisp;
