import LinkUI from "@ckeditor/ckeditor5-link/src/linkui";

export default class CustomLinkUI extends LinkUI {
	_addFormView() {
		const eventResult = this.editor.fire("linkToolbarClicked");
		if (!eventResult || !eventResult.isPrevented) {
			super._addFormView();
		}
	}
}
