export default class BoardPresenter {
	sortComponent = new SortView();
	eventListComponent = new EventListView();
 
	constructor({container}) {
	  this.container = container;
	}
 
	init() {
	  render(this.sortComponent, this.container);
	  render(this.eventListComponent, this.container);
	  render(new PointEditView(), this.eventListComponent.getElement());
 
	  for (let i = 0; i < 3; i++) {
		 render(new PointView(), this.eventListComponent.getElement());
	  }
	}
 }