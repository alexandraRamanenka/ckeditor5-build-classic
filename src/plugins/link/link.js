import Link from "@ckeditor/ckeditor5-link/src/link";
import LinkEditing from "@ckeditor/ckeditor5-link/src/linkediting";
import CustomLinkUI from './linkui';

export default class CustomLink extends Link {
	static get requires() {
		return [LinkEditing, CustomLinkUI];
	}
}
