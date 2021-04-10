export default class ButtonInfo {
  constructor(pathname, referenceObject, buttonText, onClick) {
    this.pathname = pathname;
    this.referenceObject = referenceObject;
    this.buttonText = buttonText;
    this.onClick = onClick;
  }
}
