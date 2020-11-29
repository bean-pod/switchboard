export default class HeadCell {
  constructor(id, label, isNum, padding) {
    this.id = id;
    this.label = label;
    this.isNumeric = isNum;
    this.searchID = `${id}Search`;
    this.padding = padding;
  }
}
